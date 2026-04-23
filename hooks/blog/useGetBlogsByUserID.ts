import { useQuery } from "@tanstack/react-query";
import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { BlogsType } from "@/utilities/types/blog";

const getBlogsByUserID = async (userID: number): Promise<BlogsType[]> => {
  return await fetchWrapper({
    url: `blog/${userID}`,
  });
};

export default function useGetBlogsByUserID(userID: number) {
  return useQuery({
    queryKey: ["blogs", userID],
    queryFn: () => getBlogsByUserID(userID),
    enabled: !!userID,
  });
}
