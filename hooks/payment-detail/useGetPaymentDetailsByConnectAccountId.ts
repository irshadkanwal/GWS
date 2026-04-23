import { useQuery } from "@tanstack/react-query";
import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { PaymentDetailType } from "@/utilities/types/payment-detail";

const getPaymentDetailsByConnectAccountId = async (
  connect_account_id: string
): Promise<PaymentDetailType[]> => {
  return await fetchWrapper<PaymentDetailType[]>({
    url: `payment-detail?connect_account_id=${connect_account_id}`,
  });
};

export default function useGetPaymentDetailsByConnectAccountId(
  connect_account_id: string
) {
  return useQuery<PaymentDetailType[], Error>({
    queryKey: ["paymentDetails", connect_account_id],
    queryFn: () => getPaymentDetailsByConnectAccountId(connect_account_id),
    enabled: !!connect_account_id,
  });
}
