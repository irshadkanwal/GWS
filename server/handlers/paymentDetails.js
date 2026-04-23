import db from "@/models";
import { stripe } from "@/lib/stripe";

const getAllPaymentDetails = async () => {
  const paymentDetails = await db.paymentDetail.findAll({
    include: [
      {
        model: db.donation,
        as: "donation",
        attributes: ["id", "title", "user_id"],
        include: [
          {
            model: db.users,
            as: "user",
            attributes: [
              "id",
              "first_name",
              "last_name",
              "email",
              "stripe_account_id",
            ],
          },
        ],
      },
    ],
    order: [["created_at", "DESC"]],
  });

  const enriched = await Promise.all(
    paymentDetails.map(async (payment) => {
      try {
        const stripeAccount = payment.donation.user.stripe_account_id;
        // Step 1: Get PaymentIntent
        const paymentIntent = await stripe.paymentIntents.retrieve(
          payment.stripe_id,
          {
            stripeAccount,
            expand: ["latest_charge"],
          }
        );

        const chargeId = paymentIntent.latest_charge;
        if (!chargeId) throw new Error("No charge found on PaymentIntent");

        // Step 2: Get Charge and balance_transaction
        const charge = await stripe.charges.retrieve(chargeId, {
          stripeAccount,
          expand: ["balance_transaction"],
        });
        const platform_fee = payment.platform_fee;

        const recipient_received = payment.recipient_amount;
        const stripeFee =
          payment.amount - payment.recipient_amount - platform_fee;

        return {
          id: payment.id,
          donation_id: payment.donation_id,
          stripe_id: payment.stripe_id,
          payment_method: payment.payment_method,
          cardholder_name: payment.cardholder_name,
          last_four_digits: payment.last_four_digits,
          amount: parseFloat(payment.amount),
          currency: payment.currency,
          status: payment.status,
          created_at: payment.created_at,

          // From Stripe
          platform_fee,
          stripe_fee: stripeFee.toFixed(2),
          recipient_account: stripeAccount || null,
          donor_email: charge.billing_details?.email || null,
          recipient_received: recipient_received,

          // Related data
          campaign: payment.donation?.title || null,
          recipient: payment.donation?.user
            ? {
                id: payment.donation.user.id,
                name: `${payment.donation.user.first_name} ${payment.donation.user.last_name}`,
                email: payment.donation.user.email,
              }
            : null,
        };
      } catch (err) {
        console.error(
          `Failed to process payment ${payment.stripe_id}:`,
          err.message
        );
        return null;
      }
    })
  );

  return enriched.filter(Boolean);
};

const getPaymentDetailById = async (id) => {
  return await db.paymentDetail.findByPk(id, {
    include: [
      {
        model: db.donation,
        as: "donation",
      },
    ],
  });
};

const getPaymentDetailsByConnectAccountId = async (connect_account_id) => {
  return db.paymentDetail.findAll({
    where: { connect_account_id },
    include: [{ model: db.donation, as: "donation" }],
  });
};

const getPaymentDetailByDonationId = async (donationId) => {
  return await db.paymentDetail.findOne({
    where: { donation_id: donationId },
    include: [
      {
        model: db.donation,
        as: "donation",
      },
    ],
  });
};

const createPaymentDetail = async (paymentDetailData) => {
  try {
    const result = await db.paymentDetail.create(paymentDetailData);
    return result;
  } catch (error) {
    // Check if it's a validation error
    if (error.name === "SequelizeValidationError") {
      console.error("Validation errors:", error.errors);
    }

    // Check if it's a foreign key constraint error
    if (error.name === "SequelizeForeignKeyConstraintError") {
      console.error("Foreign key constraint error:", error.fields);
    }

    throw error;
  }
};

const updatePaymentDetail = async (id, paymentDetailData) => {
  const paymentDetail = await db.paymentDetail.findByPk(id);
  if (!paymentDetail) {
    throw new Error("Payment detail not found");
  }
  return await paymentDetail.update(paymentDetailData);
};

const deletePaymentDetail = async (id) => {
  const paymentDetail = await db.paymentDetail.findByPk(id);
  if (!paymentDetail) {
    throw new Error("Payment detail not found");
  }
  await paymentDetail.destroy();
  return { message: "Payment detail deleted successfully" };
};

export {
  getAllPaymentDetails,
  getPaymentDetailById,
  getPaymentDetailByDonationId,
  createPaymentDetail,
  updatePaymentDetail,
  deletePaymentDetail,
  getPaymentDetailsByConnectAccountId,
};
