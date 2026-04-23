"use client";

import React from "react";
import AllArticles from "./AllArticles";
import LatestArticles from "./LatestArticles";
import MostPopularPosts from "./MostPopularPosts";
import useGetAllBlogCategories from "@/hooks/blog-category/useGetAllBlogCategories";
import GWSLoader from "@/components/shared/gws-loader";
import useGetAllArticles from "@/hooks/article/useGetAllArticles";

function Blog() {
  const { data: allBlogs, isLoading } = useGetAllArticles();
  const { data: allCategories, isLoading: isLoadingCategory } =
    useGetAllBlogCategories();

  const latestBlogs = React.useMemo(() => {
    return allBlogs
      ?.sort(
        (a, b) =>
          new Date(b.updated_at!).getTime() - new Date(a.updated_at!).getTime()
      )
      .slice(0, 2);
  }, [allBlogs]);

  const publishedBlogs = React.useMemo(() => {
    return allBlogs?.filter((blog) => blog.status === "published");
  }, [allBlogs]);

  if (isLoading || isLoadingCategory) {
    return (
      <div className="text-center py-24">
        <GWSLoader loadingText="Loading blog posts" />
      </div>
    );
  }
  return (
    <div className="w-full px-6 sm:px-12 lg:px-20">
      <LatestArticles
        blogs={latestBlogs || []}
        categories={allCategories || []}
      />
      <AllArticles
        blogs={publishedBlogs || []}
        categories={allCategories || []}
      />
      <MostPopularPosts />
    </div>
  );
}

export default Blog;
