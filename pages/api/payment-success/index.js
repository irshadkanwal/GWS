import { stripe } from "@/lib/stripe";
import {
  createPaymentDetail,
  getPaymentDetailByDonationId,
} from "@/server/controllers/paymentDetailController";
import { updateDonation } from "@/server/controllers/donationController";
import methodHandler from "@/utils/requestHandler";
import GiftWellContributionEmail from "@/utilities/helpers/GiftContributionReceivedEmail";
import { sendEmail } from "@/utilities/helpers/emailService";
import db from "@/models";

const postHandler = async (req, res) => {
  try {
    const { session_id, donation_id, payment_intent_id } = req.body;

    if (!donation_id) {
      return res.status(400).json({ error: "donation_id is required" });
    }

    // Verify donation exists and is not already completed
    const donation = await db.donation.findByPk(donation_id);
    if (!donation) {
      return res.status(404).json({ error: "Donation not found", donation_id });
    }
    if (donation.status === "completed") {
      return res.status(409).json({
        error: "Donation already completed",
        donation_id,
      });
    }

    // If Payment Intent flow (Payment Element)
    if (payment_intent_id) {
      // Resolve connected account for retrieval
      const user = await db.users.findByPk(donation.user_id);
      if (!user || !user.stripe_account_id) {
        return res
          .status(400)
          .json({ error: "Recipient Stripe account not found" });
      }

      // Retrieve PI on the connected account, expand payment_method and latest_charge for details
      const paymentIntent = await stripe.paymentIntents.retrieve(
        payment_intent_id,
        {
          stripeAccount: user.stripe_account_id,
          expand: ["payment_method", "latest_charge"],
        }
      );

      if (!paymentIntent) {
        return res.status(404).json({ error: "Payment intent not found" });
      }
      if (paymentIntent.status !== "succeeded") {
        return res.status(400).json({
          error: `Payment intent not succeeded (status: ${paymentIntent.status})`,
        });
      }

      // Check if payment detail already exists for this donation
      const existingPayment = await getPaymentDetailByDonationId(donation_id);
      if (existingPayment) {
        return res.status(409).json({
          error: "Payment already exists for this donation",
          existingPayment,
        });
      }

      const charge = paymentIntent.latest_charge;

      const cardholder_name =
        charge?.billing_details?.name ??
        (typeof paymentIntent.payment_method === "object"
          ? paymentIntent.payment_method?.billing_details?.name || null
          : null);

      const last_four_digits =
        charge?.payment_method_details?.card?.last4 ??
        (typeof paymentIntent.payment_method === "object"
          ? paymentIntent.payment_method?.card?.last4 || null
          : null);

      const paymentDetails = {
        donation_id: Number(donation_id),
        stripe_id: paymentIntent.id,
        payment_method:
          typeof paymentIntent.payment_method === "string"
            ? paymentIntent.payment_method
            : paymentIntent.payment_method?.id || null,
        amount: paymentIntent.amount / 100,
        status: paymentIntent.status,
        currency: paymentIntent.currency,
        cardholder_name,
        last_four_digits,
      };

      const newPaymentDetail = await createPaymentDetail(paymentDetails);

      await updateDonation(donation_id, {
        status: "completed",
        amount: paymentIntent.amount / 100,
        updated_at: new Date().toISOString(),
      });

      // Send email if privacy settings allow
      const userDetails = await db.userDetails.findOne({
        where: { user_id: user.id },
      });
      if (userDetails?.privacy_settings.includes("emailAlerts")) {
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

      const redirect_url = `${process.env.NEXT_PUBLIC_URL}/registry/${user.public_url}?paymentStatus=success&donation_id=${donation_id}`;

      return res.status(200).json({
        success: true,
        paymentDetail: newPaymentDetail,
        paymentDetails,
        message: "Payment processed successfully",
        redirect_url,
        public_url: user.public_url,
      });
    }

    // Legacy Checkout Session flow
    if (!session_id) {
      return res
        .status(400)
        .json({ error: "session_id or payment_intent_id is required" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: [
        "payment_intent",
        "payment_intent.payment_method",
        "payment_intent.latest_charge",
      ],
    });

    if (!session) {
      return res.status(404).json({ error: "Checkout session not found" });
    }

    const paymentIntent = session.payment_intent;
    if (!paymentIntent) {
      return res
        .status(404)
        .json({ error: "Payment intent not found in session" });
    }

    const existingPayment = await getPaymentDetailByDonationId(donation_id);
    if (existingPayment) {
      return res.status(409).json({
        error: "Payment already exists for this donation",
        existingPayment,
      });
    }

    const pi = session.payment_intent;
    const charge = pi.latest_charge;

    const cardholder_name =
      charge?.billing_details?.name ??
      pi.payment_method?.billing_details?.name ??
      null;

    const last_four_digits =
      charge?.payment_method_details?.card?.last4 ??
      pi.payment_method?.card?.last4 ??
      null;

    const paymentDetails = {
      donation_id: Number(donation_id),
      stripe_id: pi.id,
      payment_method: pi.payment_method?.id || null,
      amount: pi.amount / 100,
      status: pi.status,
      currency: pi.currency,
      cardholder_name,
      last_four_digits,
    };

    const newPaymentDetail = await createPaymentDetail(paymentDetails);

    await updateDonation(donation_id, {
      status: "completed",
      amount: paymentIntent.amount / 100,
    });

    // Send email if privacy settings allow
    const user = await db.users.findByPk(donation.user_id);
    const userDetails = await db.userDetails.findOne({
      where: { user_id: user.id },
    });
    if (userDetails?.privacy_settings.includes("emailAlerts")) {
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

    const redirect_url = `${process.env.NEXT_PUBLIC_URL}/registry/${user.public_url}?paymentStatus=success&donation_id=${donation_id}`;

    return res.status(200).json({
      success: true,
      paymentDetail: newPaymentDetail,
      paymentDetails,
      message: "Payment processed successfully",
      redirect_url,
      public_url: user.public_url,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to process payment",
      details: error.message,
    });
  }
};

export default methodHandler({
  POST: postHandler,
});
