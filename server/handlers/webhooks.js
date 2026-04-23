import { stripe } from "@/lib/stripe";
import db from "@/models";
import { sendEmail } from "@/utilities/helpers/emailService";
import GiftWellContributionEmail from "@/utilities/helpers/GiftContributionReceivedEmail";
import sequelize from "@config/sequelize";

const handleAccountUpdated = async (accountDetails) => {
  const isLinked =
    accountDetails.charges_enabled &&
    accountDetails.payouts_enabled &&
    accountDetails.capabilities?.transfers === "active";

  try {
    await db.users.update(
      { is_stripe_linked: isLinked },
      { where: { stripe_account_id: accountDetails.id } }
    );
  } catch (err) {
    console.error("DB update failed:", err);
  }
};

const handlePaymentInentCreated = async (paymentIntent, stripeAccount) => {
  await db.paymentDetail.findOrCreate({
    where: { stripe_id: paymentIntent.id },
    defaults: {
      donation_id: paymentIntent.metadata.donation_id,
      stripe_id: paymentIntent.id,
      amount: (paymentIntent.amount ?? 0) / 100,
      status: "pending",
      currency: paymentIntent.currency,
      connect_account_id: stripeAccount,
    },
  });
};

const handlePaymentIntentSucceeded = async (paymentIntent, stripeAccount) => {
  const transaction = await sequelize.transaction();
  try {
    const donationId = paymentIntent.metadata?.donation_id;
    if (!donationId)
      throw new Error("Missing donation_id in PaymentIntent metadata");

    const donation = await db.donation.findByPk(donationId, {
      transaction: transaction,
    });
    if (!donation) throw new Error(`Donation ${donationId} not found`);

    const user = await db.users.findByPk(donation.user_id, {
      transaction: transaction,
    });
    if (!user || !user.stripe_account_id) {
      throw new Error("Recipient Stripe account not found");
    }

    const userDetails = await db.userDetails.findOne({
      where: { user_id: user.id },
      transaction: transaction,
    });
    if (!userDetails) throw new Error("User details not found");

    const fullPI = await stripe.paymentIntents.retrieve(
      paymentIntent.id,
      {
        expand: [
          "latest_charge.payment_method_details",
          "latest_charge.billing_details",
          "latest_charge.application_fee",
          "latest_charge.balance_transaction",
        ],
      },
      { stripeAccount }
    );

    const charge = fullPI.latest_charge;

    const internalStatus =
      paymentIntent.status === "succeeded" ? "succeeded" : "processing";

    await db.paymentDetail.update(
      {
        donation_id: donationId,
        stripe_id: paymentIntent.id,
        amount: paymentIntent.amount_received / 100,
        currency: paymentIntent.currency,
        payment_method: charge?.payment_method_details?.type || null,
        cardholder_name: charge?.billing_details?.name || null,
        last_four_digits: charge?.payment_method_details?.card?.last4 || null,
        status: internalStatus,
        platform_fee: charge.application_fee_amount / 100,
        recipient_amount:
          (paymentIntent.amount_received -
            (charge.application_fee_amount || 0)) /
          100,
        updated_at: new Date(),
      },
      {
        where: {
          stripe_id: paymentIntent.id,
          connect_account_id: stripeAccount,
        },
        transaction: transaction,
      }
    );

    await db.donation.update(
      {
        status: "completed",
        updated_at: new Date(),
      },
      {
        where: { id: donationId },
        transaction: transaction,
      }
    );

    await transaction.commit();
    if (userDetails.privacy_settings?.includes("emailAlerts")) {
      await sendEmail(
        user.email,
        "Donation Support Received",
        GiftWellContributionEmail(
          `${user.first_name} ${user.last_name}`,
          "donation",
          donation.amount,
          null,
          `${process.env.NEXT_PUBLIC_URL}/registry/${user.public_url}`
        )
      );
    }

    console.log(`PaymentIntent ${paymentIntent.id} processed successfully.`);
  } catch (err) {
    await transaction.rollback();
    console.error("Error handling payment_intent.succeeded:", err);
    throw err;
  }
};

const handleChargeUpdated = async (charge, stripeAccount) => {
  const balanceTx = await stripe.balanceTransactions.retrieve(
    charge.balance_transaction,
    { stripeAccount }
  );
  const totalAmount = charge.amount;
  const applicationFee = charge.application_fee_amount || 0;
  const stripeFee = balanceTx.fee - applicationFee;
  const platform_fee = applicationFee;

  const recipient_received = totalAmount - stripeFee - platform_fee;

  await db.paymentDetail.update(
    {
      amount: totalAmount / 100,
      platform_fee: applicationFee / 100,
      recipient_amount: recipient_received / 100,
      updated_at: new Date(),
    },
    {
      where: {
        stripe_id: charge.payment_intent,
        connect_account_id: stripeAccount,
      },
    }
  );
};

export {
  handleAccountUpdated,
  handlePaymentInentCreated,
  handlePaymentIntentSucceeded,
  handleChargeUpdated,
};
