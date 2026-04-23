import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface MutationVariables {
  accountId: string;
}

interface StripeAccountLinkResponse {
  url?: string;
}

async function getStripeDashboardLink({
  accountId,
}: MutationVariables): Promise<StripeAccountLinkResponse> {
  return await fetchWrapper({
    url: `stripe/stripe-dashboard-link`,
    method: "POST",
    body: { accountId },
  });
}

export default function useGetStripeDashboardLink() {
  return useMutation<StripeAccountLinkResponse, Error, MutationVariables>({
    mutationFn: (variables) => getStripeDashboardLink(variables),
    onError: (error) => {
      toast.error(`Error getting Stripe dashboard link: ${error.message}`);
    },
  });
}
