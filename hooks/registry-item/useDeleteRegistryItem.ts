import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useDeleteRegistryItem() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (registryItemID: number) => {
      return await fetchWrapper({
        url: `registry-item/${registryItemID}`,
        method: "DELETE",
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registryItems"] });
      toast.success("Registry item deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete registry item");
    },
  });

  return mutation;
}
