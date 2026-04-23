import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type {
  CreatePaymentDetailType,
  PaymentDetailType,
} from "@/utilities/types/payment-detail";

type MutationVariables = {
  paymentDetail: CreatePaymentDetailType;
};

async function createPaymentDetail({
  paymentDetail,
}: MutationVariables): Promise<PaymentDetailType> {
  return await fetchWrapper<PaymentDetailType>({
    method: "POST",
    url: "payment-detail",
    body: paymentDetail,
  });
}

export default function useCreatePaymentDetail() {
  const queryClient = useQueryClient();
  return useMutation<PaymentDetailType, Error, MutationVariables>({
    mutationFn: createPaymentDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["paymentDetails"],
      });
    },
  });
}
