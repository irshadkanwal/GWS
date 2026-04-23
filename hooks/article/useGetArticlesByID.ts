import { useQuery } from "@tanstack/react-query";
import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { BlogsType } from "@/utilities/types/blog";

const getArticlesByID = async (id: number): Promise<BlogsType> => {
  return await fetchWrapper({
    url: `article/${id}`,
  });
};

export default function useGetArticlesByID(id: number) {
  return useQuery({
    queryKey: ["articles", id],
    queryFn: () => getArticlesByID(id),
    enabled: !!id,
  });
}
