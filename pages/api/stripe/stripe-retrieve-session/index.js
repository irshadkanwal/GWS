import { stripe } from "@/lib/stripe";
import methodHandler from "@/utils/requestHandler";

async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { session_id } = req.query;
  if (!session_id) return res.status(400).json({ error: "Missing session_id" });

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent", "payment_intent.payment_method"],
    });
    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default methodHandler({
  GET: handler,
});
