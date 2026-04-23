import methodHandler from "@/utils/requestHandler";
import { buffer } from "micro";
import { stripe } from "@/lib/stripe";
import {
  handleAccountUpdated,
  handleChargeUpdated,
  handlePaymentInentCreated,
  handlePaymentIntentSucceeded,
} from "@/server/controllers/webhookControllers";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function POST(req, res) {
  console.log("Received Stripe webhook");
  try {
    const buf = await buffer(req);
    const body = buf.toString("utf8");

    const signature = req.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      switch (event.type) {
        case "account.updated": {
          const account = event.data.object;
          await handleAccountUpdated(account);
          break;
        }

        case "payment_intent.created": {
          const paymentIntent = event.data.object;
          const stripeAccount = event.account;
          await handlePaymentInentCreated(paymentIntent, stripeAccount);
          break;
        }

        case "payment_intent.succeeded": {
          const paymentIntent = event.data.object;
          const stripeAccount = event.account;
          await handlePaymentIntentSucceeded(paymentIntent, stripeAccount);
          break;
        }

        case "charge.updated": {
          const charge = event.data.object;
          const stripeAccount = event.account;
          await handleChargeUpdated(charge, stripeAccount);
          break;
        }

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }
    } catch (err) {
      console.error("Error handling event:", err);
    }

    return res.status(200).send("OK");
  } catch (err) {
    console.error("Unexpected error in webhook:", err);
    return res.status(500).send(`Webhook Error: ${err.message}`);
  }
}

export default methodHandler({
  POST,
});
