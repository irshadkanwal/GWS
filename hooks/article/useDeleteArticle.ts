import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useDeleteArticle() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (articleID: number) => {
      return await fetchWrapper({
        url: `article/${articleID}`,
        method: "DELETE",
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      toast.success("Article deleted successfully.");
    },
    onError: () => {
      toast.error("Failed to delete article.");
    },
  });

  return mutation;
}
