import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useDeleteBlog() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (blogID: number) => {
      return await fetchWrapper({
        url: `blog/${blogID}`,
        method: "DELETE",
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog deleted successfully.");
    },
    onError: () => {
      toast.error("Failed to delete blog.");
    },
  });

  return mutation;
}
