import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { BlogCategoryType } from "@/utilities/types/blog-category";
import { useQuery } from "@tanstack/react-query";

const getAllBlogCategories = async () => {
  return fetchWrapper<BlogCategoryType[]>({
    url: "blog-category",
  });
};

export default function useGetAllBlogCategories() {
  return useQuery({
    queryKey: ["blogCategories"],
    queryFn: getAllBlogCategories,
  });
}
