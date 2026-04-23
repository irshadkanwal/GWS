import { stripe } from "@/lib/stripe";
import methodHandler from "@/utils/requestHandler";

async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { payment_method_id, stripe_account_id } = req.query;

  if (!payment_method_id || !stripe_account_id) {
    return res.status(400).json({ error: "Missing required params" });
  }

  try {
    const paymentMethod = await stripe.paymentMethods.retrieve(
      payment_method_id,
      { stripeAccount: stripe_account_id }
    );

    const data = {
      id: paymentMethod.id,
      type: paymentMethod.type,
      billing_details: paymentMethod.billing_details,
      card: paymentMethod.card || null,
    };

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error retrieving payment method:", error);
    return res.status(500).json({ error: error.message });
  }
}

export default methodHandler({
  GET: handler,
});
