import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import { useQuery } from "@tanstack/react-query";

interface StripePaymentMethod {
  id: string;
  type: string;
  billing_details?: {
    name?: string;
    email?: string;
  };
  card?: {
    brand?: string;
    last4?: string;
    exp_month?: number;
    exp_year?: number;
  };
  [key: string]: any;
}

async function getPaymentMethod(
  payment_method_id: string,
  stripeAccountID: string
): Promise<StripePaymentMethod> {
  return await fetchWrapper({
    url: `stripe/stripe-payment-method?payment_method_id=${payment_method_id}&stripe_account_id=${stripeAccountID}`,
    method: "GET",
  });
}

export default function useGetPaymentMethod(
  payment_method_id?: string,
  stripeAccountID?: string
) {
  return useQuery<StripePaymentMethod, Error>({
    queryKey: ["paymentMethod", payment_method_id],
    queryFn: () => getPaymentMethod(payment_method_id!, stripeAccountID!),
    enabled: !!payment_method_id && !!stripeAccountID,
  });
}
