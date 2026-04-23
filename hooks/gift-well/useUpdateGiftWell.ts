import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { GiftWellType } from "@/utilities/types/giftWell";
import { toast } from "sonner";

type MutationVariables = {
  giftwell: GiftWellType;
  id?: number;
};

async function updateGiftWell({
  giftwell,
  id,
}: MutationVariables): Promise<GiftWellType> {
  return await fetchWrapper<GiftWellType>({
    method: "PUT",
    url: `gift-well/${id}`,
    body: giftwell,
  });
}

export default function useUpdateGiftWell() {
  const queryClient = useQueryClient();
  return useMutation<GiftWellType, Error, MutationVariables>({
    mutationFn: updateGiftWell,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["giftWells"],
      });
      queryClient.invalidateQueries({
        queryKey: ["users", variables.giftwell.user_id],
      });

      toast.success("Registry Published Successfully");
    },
  });
}
