import { stripe } from "@/lib/stripe";
import { getPaymentDetailByDonationId } from "@/server/controllers/paymentDetailController";
import methodHandler from "@/utils/requestHandler";
import db from "@/models";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { productName, amount, donation_id } = req.body;

  if (!productName || !amount) {
    return res
      .status(400)
      .json({ error: "productName and amount are required" });
  }

  // Require donation_id for connected account context
  if (!donation_id) {
    return res.status(400).json({
      error: "donation_id is required for connected account payments",
    });
  }

  const amountInCents = Math.round(amount * 100);

  try {
    // Find donation and connected account
    const donation = await db.donation.findByPk(Number(donation_id));
    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }
    const user = await db.users.findByPk(donation.user_id);
    if (!user || !user.stripe_account_id) {
      return res
        .status(400)
        .json({ error: "Recipient Stripe account not found" });
    }

    const applicationFeeAmount = Math.round(amountInCents * 0.05);

    // Direct charge: create PI on the connected account with an application fee

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: amountInCents,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
        application_fee_amount: applicationFeeAmount,
        metadata: {
          productName: productName,
          donation_id: donation_id.toString(),
          user_id: user.id.toString(),
        },
      },
      { stripeAccount: user.stripe_account_id }
    );

    return res.status(200).json({
      client_secret: paymentIntent.client_secret,
      stripe_account_id: user.stripe_account_id,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export default methodHandler({
  POST: handler,
});
