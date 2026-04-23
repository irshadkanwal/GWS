import { useQuery } from "@tanstack/react-query";
import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { GiftWellType } from "@/utilities/types/giftWell";

const getGiftWellByUserID = async (userID: number): Promise<GiftWellType> => {
  return await fetchWrapper({
    url: `gift-well/${userID}`,
  });
};

export default function useGetGiftWellByUserID(userID: number) {
  return useQuery({
    queryKey: ["giftWells", userID],
    queryFn: () => getGiftWellByUserID(userID),
    enabled: !!userID,
  });
}
