import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useDeleteProduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (productID: number) => {
      return await fetchWrapper({
        url: `product/${productID}`,
        method: "DELETE",
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully.");
    },

    onError: () => {
      toast.error("Failed to delete product.");
    },
  });

  return mutation;
}
