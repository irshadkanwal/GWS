"use client";

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useClientSecret } from "@/hooks/checkout-session/useCreateCheckoutSession";
import GWSLoader from "../gws-loader";
import CheckoutForm from "./checkout-form";
import Typography from "@/components/ui/typography";
import { toast } from "sonner";
import { CircleX } from "lucide-react";

export type StripeProductDetailType = {
  productName: string;
  price: number;
  donation_id: number;
};

type props = {
  productDetails: StripeProductDetailType;
  onSuccess?: () => void;
};

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_TEST_KEY!;

export default function Checkout({ productDetails, onSuccess }: props) {
  const { data, isLoading, isError, error, refetch } = useClientSecret(
    productDetails.productName,
    productDetails.price,
    productDetails.donation_id
  );

  const clientSecret = data?.client_secret;
  const stripeAccountId = data?.stripe_account_id;

  const stripePromise = React.useMemo(() => {
    if (!stripeAccountId) return null;
    return loadStripe(PUBLISHABLE_KEY, { stripeAccount: stripeAccountId });
  }, [stripeAccountId]);

  React.useEffect(() => {
    if (isError && error) {
      const errorMessage = error.message || "Unknown error";
      if (
        errorMessage.includes("already been paid for") ||
        (error as any).isDuplicatePayment
      ) {
        toast.info(
          "This donation has already been paid for. Thank you for your generosity!"
        );
      } else {
        toast.error(`Error loading checkout: ${errorMessage}`);
      }
    }
  }, [isError, error]);

  if (isLoading)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <GWSLoader loadingText="Loading" />
      </div>
    );

  if (isError) {
    const errorMessage = error?.message || "Unknown error";
    const isDuplicatePayment =
      errorMessage.includes("already been paid for") ||
      (error as any).isDuplicatePayment;

    if (isDuplicatePayment) {
      return (
        <div className="text-center p-6">
          <div className="text-blue-600 mb-4">
            <Typography size="lg" className="font-semibold mb-2">
              Donation Already Paid
            </Typography>
            <Typography size="sm">
              This donation has already been paid for. Thank you for your
              generosity!
            </Typography>
          </div>
        </div>
      );
    }

    return (
      <div className="text-red-500 p-4">
        <Typography size="lg" className="font-semibold mb-2">
          Error Loading Checkout
        </Typography>
        <Typography size="sm">{errorMessage}</Typography>
        <button
          onClick={() => refetch()}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!clientSecret || !stripePromise)
    return (
      <div className="flex flex-col items-center justify-center min-h-48 gap-4">
        <CircleX size={32} className="text-red-500" />
        <Typography>
          Cannot proceed at the moment. Please try again later.
        </Typography>
      </div>
    );

  return (
    <div id="checkout">
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm
          clientSecret={clientSecret}
          productDetails={productDetails}
          onSuccess={onSuccess}
        />
      </Elements>
    </div>
  );
}
