"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store";
import { BookOpen, PlusIcon } from "lucide-react";
import useGetBlogsByUserID from "@/hooks/blog/useGetBlogsByUserID";
import BlogCard from "./BlogCard";
import type { BlogsType } from "@/utilities/types/blog";
import { Grid, GridItem } from "@/components/ui/Grid";
import { useDialog } from "@/hooks/useDialog";
import useGetAllBlogCategories from "@/hooks/blog-category/useGetAllBlogCategories";
import Typography from "@/components/ui/typography";
import GWSLoader from "@/components/shared/gws-loader";
import { SummaryCard } from "@/pageComponents/Users/SummaryCards";
import { SearchInput } from "@/pageComponents/Users/SearchInput";
import { BlogFilterControls } from "./BlogFilterControls";
import useUpdateBlog from "@/hooks/blog/useUpdateBlog";
import useDeleteBlog from "@/hooks/blog/useDeleteBlog";
import GenericPostFormModal from "@/pageComponents/Articles/GenericPostFormModal";
import useCreateBlog from "@/hooks/blog/useCreateBlog";
import SummaryCardsSkeleton from "@/pageComponents/Users/SummaryCardsSkeleton";
import { BLOG_STATUS } from "@/constants/constants";

export default function BlogsPage() {
  const user = useUserStore(React.useCallback((state) => state, []));
  const { data: allBlogs, isLoading } = useGetBlogsByUserID(user.id || 0);
  const { data: allCategories, isLoading: isLoadingCategories } =
    useGetAllBlogCategories();
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const { mutateAsync: updateBlog } = useUpdateBlog();
  const { mutateAsync: deleteBlog } = useDeleteBlog();
  const { mutateAsync: addNewBlog } = useCreateBlog();

  const {
    open: isBlogModalOpen,
    openDialog: openBlogModal,
    closeDialog: closeBlogModal,
  } = useDialog(false);

  const publishedBlogs = React.useMemo(
    () => allBlogs?.filter((blog) => blog.status === BLOG_STATUS.PUBLISHED),
    [allBlogs]
  );

  const draftBlogs = React.useMemo(
    () => allBlogs?.filter((blog) => blog.status === BLOG_STATUS.DRAFT),
    [allBlogs]
  );

  const selectedCategoryID = React.useMemo(() => {
    if (categoryFilter === "all") return null;
    return (
      allCategories?.find((cat) => cat.name === categoryFilter)?.id || null
    );
  }, [categoryFilter, allCategories]);

  const filteredBlogs = React.useMemo(() => {
    if (!allBlogs) return [];

    return allBlogs.filter((blog) => {
      const matchesStatus =
        statusFilter === "all" || blog.status === statusFilter;

      const matchesCategory =
        !selectedCategoryID || blog.category.includes(selectedCategoryID);

      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [allBlogs, statusFilter, selectedCategoryID, searchQuery]);
  const handleUpdate = async (id: number, postData: BlogsType) => {
    await updateBlog({ id, blogData: postData });
  };

  const handleDelete = async (id: number) => {
    await deleteBlog(id);
  };

  const handleCreate = async (blogData: Omit<BlogsType, "id">) => {
    await addNewBlog({ blogData });
  };

  return (
    <Grid className="bg-white md:mx-6 mx-2 md:p-6 p-3 rounded-sm w-[calc(100vw-6)] overflow-hidden relative">
      {/* Header */}
      <GridItem className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <Typography size="xl" className="font-bold text-[#050708]">
          My Blogs
        </Typography>
        <Button
          variant="outline"
          onClick={openBlogModal}
          type="button"
          className="bg-[#385c80] text-white rounded-sm hover:bg-transparent hover:text-[#385c80] hover:border-[#385c80]"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Create Blog Post
        </Button>
      </GridItem>

      {isLoading || isLoadingCategories ? (
        <SummaryCardsSkeleton />
      ) : (
        <>
          <SummaryCard label="Total Posts" count={allBlogs?.length || 0} />
          <SummaryCard
            label="Published Blogs"
            count={publishedBlogs?.length || 0}
            colorClass="text-green-600"
          />
          <SummaryCard
            label="Draft Blogs"
            count={draftBlogs?.length || 0}
            colorClass="text-yellow-600"
          />

          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search Blogs"
          />

          <BlogFilterControls
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            categories={allCategories || []}
          />
        </>
      )}

      {/* Blog Grid */}
      {isLoading || isLoadingCategories ? (
        <GridItem className="w-full h-full flex items-center justify-center">
          <GWSLoader loadingText="Loading blogs" />
        </GridItem>
      ) : filteredBlogs?.length === 0 ? (
        <GridItem className="text-center py-12">
          <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <Typography size="xl" className="font-semibold mb-2">
            No blogs ?
          </Typography>
          <Typography className="text-muted-foreground mb-6">
            Get started by creating your blog post
          </Typography>
          <Button
            variant="outline"
            onClick={openBlogModal}
            type="button"
            className="bg-[#385c80] text-white rounded-sm hover:bg-transparent hover:text-[#385c80] hover:border-[#385c80]"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Create Your Blog
          </Button>
        </GridItem>
      ) : (
        <GridItem className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-0">
          {filteredBlogs?.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              categories={allCategories || []}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              postType="Blog"
              userID={user.id || 0}
            />
          ))}
        </GridItem>
      )}

      <GenericPostFormModal
        open={isBlogModalOpen}
        closeDialog={closeBlogModal}
        postType="Blog"
        categories={allCategories || []}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        userId={user.id || 0}
      />
    </Grid>
  );
}
