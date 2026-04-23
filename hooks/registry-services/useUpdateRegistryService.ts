import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { RegistryServiceType } from "@/utilities/types/registry-service";

type MutationVariables = {
  registryService: RegistryServiceType;
  id?: number;
};

async function updateRegistryService({
  registryService,
  id,
}: MutationVariables): Promise<RegistryServiceType> {
  return await fetchWrapper<RegistryServiceType>({
    method: "PUT",
    url: `registry-service/${id}`,
    body: registryService,
  });
}

export default function useUpdateRegistryServices() {
  const queryClient = useQueryClient();
  return useMutation<RegistryServiceType, Error, MutationVariables>({
    mutationFn: updateRegistryService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["registryServices"],
      });
    },
  });
}
