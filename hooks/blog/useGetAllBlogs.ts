import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { BlogsType } from "@/utilities/types/blog";
import { useQuery } from "@tanstack/react-query";

const getAllBlogs = async () => {
  return fetchWrapper<BlogsType[]>({
    url: "blog",
  });
};

export default function useGetAllBlogs() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
  });
}
