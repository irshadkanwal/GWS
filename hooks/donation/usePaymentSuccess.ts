import { useMutation } from "@tanstack/react-query";
import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { PaymentDetailType } from "@/utilities/types/payment-detail";

type PaymentSuccessVariables = {
  session_id?: string;
  payment_intent_id?: string;
  donation_id?: number;
};

type PaymentSuccessResponse = {
  success: boolean;
  paymentDetail: PaymentDetailType;
  paymentDetails: {
    donation_id: number;
    stripe_id: string;
    payment_method: string;
    amount: number;
    status: string;
    currency: string;
    cardholder_name?: string;
    last_four_digits?: string;
  };
  redirect_url?: string;
  public_url?: string;
};

async function handlePaymentSuccess({
  donation_id,
  session_id,
  payment_intent_id,
}: PaymentSuccessVariables): Promise<PaymentSuccessResponse> {
  return await fetchWrapper<PaymentSuccessResponse>({
    method: "POST",
    url: "payment-success",
    body: {
      donation_id,
      session_id,
      payment_intent_id,
    },
  });
}

export default function usePaymentSuccess() {
  return useMutation<PaymentSuccessResponse, Error, PaymentSuccessVariables>({
    mutationFn: handlePaymentSuccess,
  });
}
