import { stripe } from "@/lib/stripe";
import db from "@/models";
import methodHandler from "@/utils/requestHandler";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { donation } = req.body;

  const user = await db.users.findOne({
    where: { id: donation.user_id },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: donation.amount * 100,
            product_data: {
              name: donation.title,
              description: donation.message,
            },
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        application_fee_amount: Math.round(donation.amount * 100 * 0.05), // 5% fee
        transfer_data: {
          destination: user.stripe_account_id,
        },
      },
      success_url: `${process.env.NEXT_PUBLIC_URL}/registry/${user.public_url}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/registry/${user.public_url}`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default methodHandler({
  POST: handler,
});
