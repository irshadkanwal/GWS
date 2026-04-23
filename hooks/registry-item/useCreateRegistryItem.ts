import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { RegistryItemType } from "@/utilities/types/registryItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface MutationVariables {
  registryItemData: Omit<RegistryItemType, "id">;
}

async function addNewRegistryItem({
  registryItemData,
}: MutationVariables): Promise<RegistryItemType> {
  return await fetchWrapper({
    url: `registry-item`,
    method: "POST",
    body: registryItemData,
  });
}

export default function useCreateRegistryItem() {
  const queryClient = useQueryClient();

  return useMutation<RegistryItemType, Error, MutationVariables>({
    mutationFn: (registryItemData) => addNewRegistryItem(registryItemData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registryItems"] });
    },
    onError: () => {
      toast.error("Failed to add registry item");
    },
  });
}
