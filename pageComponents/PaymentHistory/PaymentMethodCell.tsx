"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Typography from "@/components/ui/typography";
import useGetPaymentMethod from "@/hooks/stripe/useGetStripePaymentMethod";

function PaymentMethodCell({
  paymentMethodId,
  stripeAccountID,
}: {
  paymentMethodId: string;
  stripeAccountID: string;
}) {
  const { data: method, isLoading } = useGetPaymentMethod(
    paymentMethodId,
    stripeAccountID
  );
  return (
    <>
      {isLoading ? (
        <Skeleton className="h-5 rounded-sm" />
      ) : (
        <Typography size="sm" className="text-[#828383] capitalize">
          {method?.type || ""}
        </Typography>
      )}
    </>
  );
}

export default PaymentMethodCell;
