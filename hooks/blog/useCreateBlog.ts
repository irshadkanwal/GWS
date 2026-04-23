import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { BlogsType } from "@/utilities/types/blog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface MutationVariables {
  blogData: Omit<BlogsType, "id">;
}

async function addNewBlog({ blogData }: MutationVariables): Promise<BlogsType> {
  return await fetchWrapper({
    url: `blog`,
    method: "POST",
    body: blogData,
  });
}

export default function useCreateBlog() {
  const queryClient = useQueryClient();

  return useMutation<BlogsType, Error, MutationVariables>({
    mutationFn: (blogData) => addNewBlog(blogData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog created successfully.");
    },
    onError: () => {
      toast.error("Failed to create blog");
    },
  });
}
