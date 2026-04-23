import React from "react";
import { Grid, GridItem } from "@/components/ui/Grid";
import Typography from "@/components/ui/typography";
import { SummaryCard } from "../Users/SummaryCards";
import { SearchInput } from "../Users/SearchInput";
import { BlogFilterControls } from "../Dashboard/UserBlogs/BlogFilterControls";
import useGetAllBlogCategories from "@/hooks/blog-category/useGetAllBlogCategories";
import type { BlogsType } from "@/utilities/types/blog";
import GWSLoader from "@/components/shared/gws-loader";
import { BookOpen, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogCard from "../Dashboard/UserBlogs/BlogCard";
import { useDialog } from "@/hooks/useDialog";
import useGetAllArticles from "@/hooks/article/useGetAllArticles";
import GenericPostFormModal from "./GenericPostFormModal";
import useCreateArticle from "@/hooks/article/useCreateArticle";
import useUpdateArticle from "@/hooks/article/useUpdateArticles";
import { useUserStore } from "@/store";
import useDeleteArticle from "@/hooks/article/useDeleteArticle";
import SummaryCardsSkeleton from "../Users/SummaryCardsSkeleton";
import { BLOG_STATUS } from "@/constants/constants";

function ArticlesPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const { data: allCategories, isLoading: isLoadingCategories } =
    useGetAllBlogCategories();
  const { mutateAsync: createNewArticle } = useCreateArticle();
  const { mutateAsync: updateArticle } = useUpdateArticle();
  const { mutateAsync: deleteArticle } = useDeleteArticle();
  const { data: allArticles, isLoading } = useGetAllArticles();
  const user = useUserStore(React.useCallback((state) => state, []));

  const {
    open: isBlogModalOpen,
    openDialog: openBlogModal,
    closeDialog: closeBlogModal,
  } = useDialog(false);

  const publishedArticles = React.useMemo(
    () => allArticles?.filter((blog) => blog.status === BLOG_STATUS.PUBLISHED),
    [allArticles]
  );

  const draftArticles = React.useMemo(
    () => allArticles?.filter((blog) => blog.status === BLOG_STATUS.DRAFT),
    [allArticles]
  );

  const selectedCategoryID = React.useMemo(() => {
    if (categoryFilter === "all") return null;
    return (
      allCategories?.find((cat) => cat.name === categoryFilter)?.id || null
    );
  }, [categoryFilter, allCategories]);

  const filteredArticles = React.useMemo(() => {
    if (!allArticles) return [];

    return allArticles.filter((blog) => {
      const matchesStatus =
        statusFilter === "all" || blog.status === statusFilter;

      const matchesCategory =
        !selectedCategoryID || blog.category.includes(selectedCategoryID);

      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [allArticles, statusFilter, selectedCategoryID, searchQuery]);

  const handleUpdate = async (id: number, postData: BlogsType) => {
    await updateArticle({ id, articleData: postData });
  };

  const handleCreate = async (blogData: Omit<BlogsType, "id">) => {
    await createNewArticle({ articleData: blogData });
  };

  const handleDelete = async (id: number) => {
    await deleteArticle(id);
  };

  return (
    <Grid className="bg-white lg:m-6 mx-4 my-2 p-6 rounded-sm w-[calc(100vw-6)]">
      <GridItem className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Typography size="xl" className="font-bold text-[#050708]">
          All Articles
        </Typography>
        <Button
          variant="outline"
          onClick={openBlogModal}
          type="button"
          className="bg-[#385c80] text-white rounded-sm hover:bg-transparent hover:text-[#385c80] hover:border-[#385c80]"
        >
          <PlusIcon size={20} className="mr-2" />
          Add New Article
        </Button>
      </GridItem>
      {isLoading || isLoadingCategories ? (
        <SummaryCardsSkeleton />
      ) : (
        <>
          <SummaryCard
            label="Total Articles"
            count={allArticles?.length || 0}
          />
          <SummaryCard
            label="Published Articles"
            count={publishedArticles?.length || 0}
            colorClass="text-green-600"
          />
          <SummaryCard
            label="Draft Articles"
            count={draftArticles?.length || 0}
            colorClass="text-yellow-600"
          />
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search Article"
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

      {isLoading || isLoadingCategories ? (
        <GridItem className="w-full h-full flex items-center justify-center">
          <GWSLoader loadingText="Loading articles" />
        </GridItem>
      ) : filteredArticles?.length === 0 ? (
        <GridItem className="text-center py-12">
          <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <Typography size="xl" className="font-semibold mb-2">
            No articles ?
          </Typography>
          <Typography className="text-muted-foreground mb-6">
            Get started by creating Article
          </Typography>
          <Button
            variant="outline"
            onClick={openBlogModal}
            type="button"
            className="bg-[#385c80] text-white rounded-sm hover:bg-transparent hover:text-[#385c80] hover:border-[#385c80]"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Article
          </Button>
        </GridItem>
      ) : (
        <GridItem className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-0">
          {filteredArticles?.map((article) => (
            <BlogCard
              key={article.id}
              blog={article}
              categories={allCategories || []}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              userID={user.id || 0}
              postType="Article"
            />
          ))}
        </GridItem>
      )}

      <GenericPostFormModal
        open={isBlogModalOpen}
        closeDialog={closeBlogModal}
        postType="Article"
        categories={allCategories || []}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        userId={user.id || 0}
      />
    </Grid>
  );
}

export default ArticlesPage;
