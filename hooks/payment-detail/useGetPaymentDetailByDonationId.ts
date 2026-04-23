import { useQuery } from "@tanstack/react-query";
import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { PaymentDetailType } from "@/utilities/types/payment-detail";

const getPaymentDetailByDonationId = async (
  donationId: number
): Promise<PaymentDetailType> => {
  return await fetchWrapper<PaymentDetailType>({
    url: `payment-detail?donation_id=${donationId}`,
  });
};

export default function useGetPaymentDetailByDonationId(donationId: number) {
  return useQuery<PaymentDetailType, Error>({
    queryKey: ["paymentDetails", donationId],
    queryFn: () => getPaymentDetailByDonationId(donationId),
    enabled: !!donationId,
  });
}
