import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import { useQuery } from "@tanstack/react-query";

interface CheckStripeResponse {
  message: string;
  stripe_account_id: string;
  is_stripe_linked: boolean;
  users_updated: number;
}

async function getStripeAccount(
  stripe_account_id: string
): Promise<CheckStripeResponse> {
  return await fetchWrapper({
    url: `stripe/stripe-connection-verification?stripe_account_id=${stripe_account_id}`,
    method: "GET",
  });
}

export default function useCheckStripeAccount(
  stripe_account_id?: string,
  isStripeLinked?: boolean
) {
  return useQuery<CheckStripeResponse, Error>({
    queryKey: ["check-stripe", stripe_account_id],
    queryFn: () => getStripeAccount(stripe_account_id!),
    enabled: !!stripe_account_id && !isStripeLinked,
  });
}
