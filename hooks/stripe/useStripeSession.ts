import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { DonationType } from "@/utilities/types/donation";
import { useMutation } from "@tanstack/react-query";

interface MutationVariables {
  donation: DonationType;
}

interface CheckoutSessionResponse {
  url?: string;
}

async function createCheckoutSession({
  donation,
}: MutationVariables): Promise<CheckoutSessionResponse> {
  return await fetchWrapper({
    url: `stripe/stripe-checkout-session`,
    method: "POST",
    body: { donation },
  });
}

export default function useStripeSession() {
  return useMutation<CheckoutSessionResponse, Error, MutationVariables>({
    mutationFn: (variables) => createCheckoutSession(variables),
  });
}
