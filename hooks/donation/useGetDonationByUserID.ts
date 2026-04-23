import { useQuery } from "@tanstack/react-query";
import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { DonationType } from "@/utilities/types/donation";

const getDonationByUserID = async (userID: number): Promise<DonationType[]> => {
  return await fetchWrapper({
    url: `donation/${userID}`,
  });
};

export default function useGetDonationByUserID(userID: number) {
  return useQuery({
    queryKey: ["donations", userID],
    queryFn: () => getDonationByUserID(userID),
    enabled: !!userID,
  });
}
