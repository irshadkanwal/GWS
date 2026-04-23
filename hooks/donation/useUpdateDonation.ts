import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { DonationType } from "@/utilities/types/donation";

type MutationVariables = {
  donationItem: DonationType;
  id?: number;
};

async function updateDonationItem({
  donationItem,
  id,
}: MutationVariables): Promise<DonationType> {
  return await fetchWrapper<DonationType>({
    method: "PATCH",
    url: `donation/${id}`,
    body: donationItem,
  });
}

export default function useUpdateDonationItem() {
  const queryClient = useQueryClient();
  return useMutation<DonationType, Error, MutationVariables>({
    mutationFn: updateDonationItem,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["donations", variables.donationItem.user_id],
      });
    },
  });
}
