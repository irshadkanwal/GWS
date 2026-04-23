import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { BlogsType } from "@/utilities/types/blog";
import { useQuery } from "@tanstack/react-query";

const getAllArticles = async () => {
  return fetchWrapper<BlogsType[]>({
    url: "article",
  });
};

export default function useGetAllArticles() {
  return useQuery({
    queryKey: ["articles"],
    queryFn: getAllArticles,
  });
}
