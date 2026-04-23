import { useQuery } from "@tanstack/react-query";

type ClientSecretResponse = {
  client_secret: string;
  stripe_account_id: string;
};

export async function fetchClientSecret({
  productName,
  amount,
  donation_id,
}: {
  productName: string;
  amount: number;
  donation_id?: number;
}) {
  const res = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productName,
      amount,
      donation_id,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    if (res.status === 409) {
      const error = new Error(
        errorData.error || "This donation has already been paid for"
      );
      (error as any).isDuplicatePayment = true;
      (error as any).status = 409;
      (error as any).existingPayment = errorData.existingPayment;
      throw error;
    }

    throw new Error(errorData.error || "Failed to create checkout session");
  }

  const data = (await res.json()) as ClientSecretResponse;
  return data;
}

export function useClientSecret(
  productName: string,
  amount: number,
  donation_id?: number
) {
  return useQuery({
    queryKey: ["stripeClientSecret", productName, amount, donation_id],
    queryFn: () => fetchClientSecret({ productName, amount, donation_id }),
    enabled: !!productName && !!amount,
    staleTime: 0,
    gcTime: 0,
    retry: false,
  });
}
