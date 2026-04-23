import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { AdminPaymentDetailType } from "@/utilities/types/payment-detail";
import { useQuery } from "@tanstack/react-query";

const getAllPayments = async () => {
  return fetchWrapper<AdminPaymentDetailType[]>({
    url: "payment-detail",
  });
};

export default function useGetAllPayments() {
  return useQuery({
    queryKey: ["paymentDetails"],
    queryFn: getAllPayments,
  });
}
