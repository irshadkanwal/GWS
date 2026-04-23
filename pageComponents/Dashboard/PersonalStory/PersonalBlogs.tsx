import React from "react";
import { Button } from "@/components/ui/button";
import { GridItem } from "@/components/ui/Grid";
import Typography from "@/components/ui/typography";
import { BookOpen, PlusIcon } from "lucide-react";
import GenericPostFormModal from "@/pageComponents/Articles/GenericPostFormModal";
import BlogCard from "../UserBlogs/BlogCard";
import useGetAllBlogCategories from "@/hooks/blog-category/useGetAllBlogCategories";
import useGetBlogsByUserID from "@/hooks/blog/useGetBlogsByUserID";
import { useUserStore } from "@/store";
import { useDialog } from "@/hooks/useDialog";
import useUpdateBlog from "@/hooks/blog/useUpdateBlog";
import useDeleteBlog from "@/hooks/blog/useDeleteBlog";
import type { BlogsType } from "@/utilities/types/blog";
import useCreateBlog from "@/hooks/blog/useCreateBlog";

type Props = {};

function PersonalBlogs({}: Props) {
  const user = useUserStore(React.useCallback((state) => state, []));
  const { data: allCategories, isLoading: isLoadingCategories } =
    useGetAllBlogCategories();
  const { data: userBlogs, isLoading: isLoadingBlogs } = useGetBlogsByUserID(
    user?.id ?? 0
  );
  const { mutateAsync: updateBlog } = useUpdateBlog();
  const { mutateAsync: deleteBlog } = useDeleteBlog();
  const { mutateAsync: addNewBlog } = useCreateBlog();

  const {
    open: isBlogModalOpen,
    openDialog: openBlogModal,
    closeDialog: closeBlogModal,
  } = useDialog(false);

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
    <>
      <GridItem size={12} className="p-0">
        <div className="flex items-center justify-between">
          <Typography size="md" className=" text-[#262626]">
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
        </div>
      </GridItem>

      {userBlogs?.length === 0 ? (
        <GridItem className="text-center py-12">
          <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No blogs ?</h3>
          <p className="text-muted-foreground mb-6">
            Get started by creating your blog post
          </p>
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
          {userBlogs?.map((blog) => (
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
    </>
  );
}

export default PersonalBlogs;
