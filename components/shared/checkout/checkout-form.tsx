import React from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import GWSLoader from "../gws-loader";
import type { StripeProductDetailType } from "./stripe-checkout";
import Typography from "@/components/ui/typography";
import { toast } from "sonner";
import type { StripePaymentElementOptions } from "@stripe/stripe-js";

type CheckoutFormProps = {
  clientSecret: string;
  productDetails: StripeProductDetailType;
  onSuccess?: () => void; // 👈 optional callback to close dialog
};

const CheckoutForm = ({
  clientSecret,
  productDetails,
  onSuccess,
}: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
    fields: { billingDetails: "auto" },
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    if (!stripe || !elements) {
      setIsLoading(false);
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (error) {
        const message =
          error.message ||
          (error.type === "card_error" || error.type === "validation_error"
            ? "Payment failed. Please check your card details."
            : "An unexpected error occurred.");

        setErrorMessage(message);
        toast.error(message);
      } else if (paymentIntent) {
        if (paymentIntent.status === "succeeded") {
          toast.success("Payment successful. Thank you!");
          onSuccess?.();
        } else if (paymentIntent.status === "processing") {
          toast.info(
            "Payment is processing. You’ll be notified once complete."
          );
        } else {
          toast.warning(`Payment status: ${paymentIntent.status}`);
        }
      }
    } catch (err: any) {
      const message = err?.message || "An unexpected error occurred.";
      setErrorMessage(message);
      toast.error(message);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="px-1 py-2">
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3">
          <Typography size="sm">You are Paying for:</Typography>
          <Typography size="sm" className="font-semibold">
            {productDetails.productName}
          </Typography>
        </div>
        <div className="flex items-center gap-3">
          <Typography size="sm">Amount to be paid:</Typography>
          <Typography size="sm" className="font-semibold">
            {`$${productDetails.price}`}
          </Typography>
        </div>
      </div>

      <PaymentElement options={paymentElementOptions} />

      <button
        disabled={!stripe || isLoading}
        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? (
          <GWSLoader spinnerWidth={20} spinnerHeight={20} />
        ) : (
          "Pay now"
        )}
      </button>

      {errorMessage && (
        <div
          className={`text-sm mt-2 p-3 border rounded-md ${
            errorMessage.includes("already been paid for")
              ? "text-blue-600 bg-blue-50 border-blue-200"
              : "text-red-500 bg-red-50 border-red-200"
          }`}
        >
          {errorMessage}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
