import { stripe } from "@/lib/stripe";
import db from "@/models";
import methodHandler from "@/utils/requestHandler";

async function GET(req, res) {
  try {
    const { stripe_account_id } = req.query;

    if (!stripe_account_id) {
      return res.status(400).json({ error: "stripe_account_id is required" });
    }

    const account = await stripe.accounts.retrieve(stripe_account_id);

    const isLinked = account.capabilities?.transfers === "active";

    const [updated] = await db.users.update(
      { is_stripe_linked: isLinked },
      { where: { stripe_account_id } }
    );

    return res.status(200).json({
      message: "Stripe account status checked",
      stripe_account_id,
      is_stripe_linked: isLinked,
      users_updated: updated,
    });
  } catch (err) {
    console.error("Error checking Stripe account:", err);
    return res.status(500).json({ error: err.message });
  }
}

export default methodHandler({ GET });
