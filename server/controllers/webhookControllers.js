import * as webhooks from "../handlers/webhooks.js";

const handleAccountUpdated = async (account) => {
  await webhooks.handleAccountUpdated(account);
};

const handlePaymentIntentSucceeded = async (paymentIntent, stripeAccount) => {
  await webhooks.handlePaymentIntentSucceeded(paymentIntent, stripeAccount);
};

const handlePaymentInentCreated = async (paymentIntent, stripeAccount) => {
  await webhooks.handlePaymentInentCreated(paymentIntent, stripeAccount);
};

const handleChargeUpdated = async (charge, stripeAccount) => {
  await webhooks.handleChargeUpdated(charge, stripeAccount);
};

export {
  handleAccountUpdated,
  handlePaymentIntentSucceeded,
  handlePaymentInentCreated,
  handleChargeUpdated,
};
