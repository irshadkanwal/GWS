import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { BlogsType } from "@/utilities/types/blog";

type MutationVariables = {
  blogData: BlogsType;
  id?: number;
};

async function updateBlog({
  blogData,
  id,
}: MutationVariables): Promise<BlogsType> {
  return await fetchWrapper<BlogsType>({
    method: "PUT",
    url: `blog/${id}`,
    body: blogData,
  });
}

export default function useUpdateBlog() {
  const queryClient = useQueryClient();
  return useMutation<BlogsType, Error, MutationVariables>({
    mutationFn: updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
  });
}
