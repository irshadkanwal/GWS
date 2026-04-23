import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import { useQuery } from "@tanstack/react-query";

interface StripeSession {
  id: string;
  payment_status?: string;
  payment_intent?: any;
  [key: string]: any;
}

async function getStripeSession(session_id: string): Promise<StripeSession> {
  return await fetchWrapper({
    url: `stripe/stripe-retrieve-session?session_id=${session_id}`,
    method: "GET",
  });
}

export default function useRetrieveStripeSession(session_id?: string) {
  return useQuery<StripeSession, Error>({
    queryKey: ["stripe-session", session_id],
    queryFn: () => getStripeSession(session_id!),
    enabled: !!session_id,
  });
}
