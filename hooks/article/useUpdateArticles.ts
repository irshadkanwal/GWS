import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { BlogsType } from "@/utilities/types/blog";

type MutationVariables = {
  articleData: BlogsType;
  id?: number;
};

async function updateArticle({
  articleData,
  id,
}: MutationVariables): Promise<BlogsType> {
  return await fetchWrapper<BlogsType>({
    method: "PUT",
    url: `article/${id}`,
    body: articleData,
  });
}

export default function useUpdateArticle() {
  const queryClient = useQueryClient();
  return useMutation<BlogsType, Error, MutationVariables>({
    mutationFn: updateArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
    },
  });
}
