import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { RegistryServiceType } from "@/utilities/types/registry-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface MutationVariables {
  registryServiceData: Omit<RegistryServiceType, "id">;
}

async function addNewRegistryService({
  registryServiceData,
}: MutationVariables): Promise<RegistryServiceType> {
  return await fetchWrapper({
    url: `registry-service`,
    method: "POST",
    body: registryServiceData,
  });
}

export default function useCreateRegistryService() {
  const queryClient = useQueryClient();

  return useMutation<RegistryServiceType, Error, MutationVariables>({
    mutationFn: (registryServiceData) =>
      addNewRegistryService(registryServiceData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registryServices"] });
      toast.success("Registry service added successfully");
    },
    onError: () => {
      toast.error("Failed to add registry service");
    },
  });
}
