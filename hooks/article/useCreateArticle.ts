import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { BlogsType } from "@/utilities/types/blog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface MutationVariables {
  articleData: Omit<BlogsType, "id">;
}

async function addNewArticle({
  articleData,
}: MutationVariables): Promise<BlogsType> {
  return await fetchWrapper({
    url: `article`,
    method: "POST",
    body: articleData,
  });
}

export default function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation<BlogsType, Error, MutationVariables>({
    mutationFn: (articleData) => addNewArticle(articleData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      toast.success("Article created successfully.");
    },
    onError: () => {
      toast.error("Failed to create article.");
    },
  });
}
