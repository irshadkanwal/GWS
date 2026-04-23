import { stripe } from "@/lib/stripe";
import methodHandler from "@/utils/requestHandler";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { accountId } = req.body;

    if (!accountId) {
      return res.status(400).json({ error: "Missing account ID" });
    }

    const dashboardLink = await stripe.accounts.createLoginLink(accountId);

    res.status(200).json({ url: dashboardLink.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

export default methodHandler({
  POST: handler,
});
