import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { DonationType } from "@/utilities/types/donation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface MutationVariables {
  newDonation: Omit<DonationType, "id">;
}

async function createNewDonation({
  newDonation,
}: MutationVariables): Promise<DonationType> {
  return await fetchWrapper({
    url: `donation`,
    method: "POST",
    body: newDonation,
  });
}

export default function useCreateDonation() {
  const queryClient = useQueryClient();

  return useMutation<DonationType, Error, MutationVariables>({
    mutationFn: (newDonation) => createNewDonation(newDonation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donations"] });
    },
  });
}
