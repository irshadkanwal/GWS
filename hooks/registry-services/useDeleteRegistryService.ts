import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useDeleteRegistryService() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (registryServiceID: number) => {
      return await fetchWrapper({
        url: `registry-service/${registryServiceID}`,
        method: "DELETE",
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registryServices"] });
      toast.success("Registry service deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete registry service");
    },
  });

  return mutation;
}
