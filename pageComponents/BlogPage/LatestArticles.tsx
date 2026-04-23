import React from "react";
import TagBadge from "../../components/ui/tag-badge";
import type { BlogsType } from "@/utilities/types/blog";
import type { BlogCategoryType } from "@/utilities/types/blog-category";
import Image from "next/image";
import Typography from "@/components/ui/typography";
import { useRouter } from "next/router";
import DOMPurify from "dompurify";
import EllipsisTypography from "../common/EllipsisTypography";

type LatestArticlesProps = {
  blogs: BlogsType[];
  categories: BlogCategoryType[];
};

function LatestArticles({ blogs, categories }: LatestArticlesProps) {
  const router = useRouter();
  const categoryMap = React.useMemo(() => {
    const map: Record<string, string> = {};
    categories?.forEach((cat) => {
      map[cat.id] = cat.name;
    });
    return map;
  }, [categories]);

  return (
    <section className="w-full py-10 sm:py-8 lg:py-10">
      <Typography className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
        Latest articles
      </Typography>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {blogs?.map((blog, index) => (
          <article
            key={blog.id}
            className={`cursor-pointer ${
              index === 0 ? "lg:col-span-2 mb-6 lg:mb-0" : "lg:col-span-1"
            }`}
            onClick={() => router.push(`/support-and-resources/${blog.id}`)}
          >
            <Image
              src={blog.featured_image || ""}
              alt={blog.title}
              width={500}
              height={500}
              className="w-full h-[180px] sm:h-[220px] md:h-[395px] object-cover rounded-lg mb-4 sm:mb-6"
            />

            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-wrap gap-2">
                {blog.category?.map((catId, idx) => (
                  <TagBadge key={idx}>
                    {categoryMap[catId] || "Uncategorized"}
                  </TagBadge>
                ))}
              </div>

              <Typography
                className={`${
                  index === 0
                    ? "text-lg sm:text-xl lg:text-2xl"
                    : "text-base sm:text-lg lg:text-xl"
                } font-bold text-gray-900 leading-tight break-words`}
              >
                {blog.title}
              </Typography>

              <EllipsisTypography
                className="prose prose-sm line-clamp-4 max-h-28"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(blog?.description || ""),
                }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default LatestArticles;
