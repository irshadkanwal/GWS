import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { RegistryItemType } from "@/utilities/types/registryItem";

type MutationVariables = {
  registryItem: RegistryItemType;
  id?: number;
};

async function updateRegistryItem({
  registryItem,
  id,
}: MutationVariables): Promise<RegistryItemType> {
  return await fetchWrapper<RegistryItemType>({
    method: "PUT",
    url: `registry-item/${id}`,
    body: registryItem,
  });
}

export default function useUpdateRegistryItems() {
  const queryClient = useQueryClient();
  return useMutation<RegistryItemType, Error, MutationVariables>({
    mutationFn: updateRegistryItem,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["registryItems", variables.registryItem.giftwell_id],
      });
    },
  });
}
