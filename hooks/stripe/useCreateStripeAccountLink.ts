import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface MutationVariables {
  accountId: string;
}

interface StripeAccountLinkResponse {
  url?: string;
}

async function createStripeAccountLink({
  accountId,
}: MutationVariables): Promise<StripeAccountLinkResponse> {
  return await fetchWrapper({
    url: `stripe/stripe-account-link`,
    method: "POST",
    body: { accountId },
  });
}

export default function useCreateStripeAccountLink() {
  return useMutation<StripeAccountLinkResponse, Error, MutationVariables>({
    mutationFn: (variables) => createStripeAccountLink(variables),
    onError: (error) => {
      toast.error(`Error creating Stripe account link: ${error.message}`);
    },
  });
}
