import React from "react";
import TagBadge from "../../components/ui/tag-badge";
import { useWindowSize } from "@/hooks/useWindowSize";
import type { BlogsType } from "@/utilities/types/blog";
import type { BlogCategoryType } from "@/utilities/types/blog-category";
import Typography from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ArrowDownIcon from "@/components/svg/ArrowDownIcon";
import ArrowUpIcon from "@/components/svg/ArrowUpIcon";
import { useRouter } from "next/router";
import DOMPurify from "dompurify";
import EllipsisTypography from "../common/EllipsisTypography";

type AllArticlesProps = {
  blogs: BlogsType[];
  categories: BlogCategoryType[];
};

function AllArticles({ blogs, categories: blogCategories }: AllArticlesProps) {
  const router = useRouter();
  // Array of articles with title, description, tag, and image URL
  const articlesData = React.useMemo(() => {
    return blogs?.map((blog) => {
      const categoryNames = blog.category?.map((id) => {
        const matched = blogCategories?.find((cat) => cat.id === id);
        return matched?.name || id;
      });
      return {
        id: blog.id,
        title: blog.title,
        description: blog.description,
        category: categoryNames,
        imageUrl: blog.featured_image,
      };
    });
  }, [blogs, blogCategories]);
  // Filter state
  const [activeFilter, setActiveFilter] = React.useState("All");
  const [showAll, setShowAll] = React.useState(false);
  const buttonRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const { width: windowSize } = useWindowSize();

  const filterCategories = React.useMemo(() => {
    const categories =
      blogCategories?.map((category) => ({
        name: category.name,
        value: category.id,
      })) || [];

    return [{ name: "All", value: "All" }, ...categories];
  }, [blogCategories]);
  // Filter articles based on active filter
  const filteredArticles =
    activeFilter === "All"
      ? articlesData
      : articlesData?.filter((article) =>
          article.category.includes(activeFilter)
        );

  // Show only 6 articles initially, or all if showAll is true
  const displayedArticles = showAll
    ? filteredArticles
    : filteredArticles?.slice(0, 6);
  const hasMoreArticles = filteredArticles?.length > 6;

  return (
    <section className="py-10">
      {/* All Articles Heading */}
      <Typography className="text-4xl font-bold text-gray-900 mb-8">
        All Articles
      </Typography>
      {/* Filter Navigation */}
      <div className="flex gap-4 mb-12 border-b border-gray-200 pb-4 overflow-auto">
        {filterCategories?.map((category, index) => (
          <Button
            key={category.value}
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            onClick={() => {
              setActiveFilter(category.name);
              setShowAll(false);

              if (windowSize < 1024 && buttonRefs.current[index]) {
                buttonRefs.current[index].scrollIntoView({
                  behavior: "smooth",
                  inline: "center",
                  block: "nearest",
                });
              }
            }}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeFilter === category.name
                ? "bg-[#FCA16F] text-[#6D3617] shadow-md"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category.name}
          </Button>
        ))}
      </div>
      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedArticles?.map((article) => (
          <article
            key={article.id}
            onClick={() => router.push(`/support-and-resources/${article.id}`)}
            className="cursor-pointer"
          >
            {/* Article Image */}
            <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4">
              <Image
                src={article.imageUrl || ""}
                alt={article.title}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Article Content - positioned below image */}
            <div className="space-y-3">
              {/* Tag Badges - below image, above title */}
              <div className="flex flex-wrap gap-2">
                {article.category?.map((tagName, index) => (
                  <TagBadge key={index}>{tagName}</TagBadge>
                ))}
              </div>

              <Typography size="xl" className="font-bold text-gray-900">
                {article.title}
              </Typography>
              <EllipsisTypography
                className="prose max-w-none prose-sm line-clamp-4 max-h-28"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(article?.description || ""),
                }}
              />
            </div>
          </article>
        ))}
      </div>
      {/* View All Text */}
      {hasMoreArticles && !showAll && (
        <div className="flex justify-center mt-12">
          <span
            onClick={() => setShowAll(true)}
            className="inline-flex items-center text-gray-700 hover:text-orange-500 font-medium cursor-pointer transition-colors duration-200"
          >
            View all
            <ArrowDownIcon />
          </span>
        </div>
      )}{" "}
      {/* Show Less Text (when all articles are shown) */}
      {showAll && hasMoreArticles && (
        <div className="flex justify-center mt-12">
          <span
            onClick={() => setShowAll(false)}
            className="inline-flex items-center text-gray-700 hover:text-orange-500 font-medium cursor-pointer transition-colors duration-200"
          >
            {" "}
            Show less
            <ArrowUpIcon />
          </span>
        </div>
      )}
      {/* No articles message */}
      {filteredArticles?.length === 0 && (
        <div className="text-center py-12">
          <Typography size="lg" className="text-gray-500">
            No articles found for the selected category.
          </Typography>
        </div>
      )}
    </section>
  );
}

export default AllArticles;
