import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { ExtendedGiftWellType } from "@/utilities/types/giftWell";
import { useQuery } from "@tanstack/react-query";

const getAllGiftWells = async () => {
  return fetchWrapper<ExtendedGiftWellType[]>({
    url: "gift-well",
  });
};

export default function useGetAllGiftWells(enabled?: boolean) {
  return useQuery({
    queryKey: ["giftWells"],
    queryFn: getAllGiftWells,
    enabled: !!enabled,
  });
}
