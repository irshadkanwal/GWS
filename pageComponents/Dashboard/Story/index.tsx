import React from "react";
import { GridItem } from "@/components/ui/Grid";
import Typography from "@/components/ui/typography";
import useGetUserDetailsByID from "@/hooks/user-details/useGetUserDetailsByID";
import { Separator } from "@radix-ui/react-separator";
import ProfileImage from "@/components/shared/profile-image";
import useGetUserByEmail from "@/hooks/user/useGetUserByEmail";
import GWSLoader from "@/components/shared/gws-loader";
import BlogCard from "../UserBlogs/BlogCard";
import useGetBlogsByUserID from "@/hooks/blog/useGetBlogsByUserID";
import useGetAllBlogCategories from "@/hooks/blog-category/useGetAllBlogCategories";
import { BLOG_STATUS } from "@/constants/constants";
import { useDialog } from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import type { BlogsType } from "@/utilities/types/blog";
import { FileUser } from "lucide-react";

const BlogDetailModal = dynamic(
  () => import("@/components/shared/blog-detail-modal"),
  { ssr: false }
);

function StoryPage({ userID }: { userID: string }) {
  const { data: userData, isLoading, error } = useGetUserByEmail(userID);
  const [selectedBlog, setSelectedBlog] = React.useState<BlogsType | null>(
    null
  );

  const {
    open: isBlogDetailOpen,
    openDialog: openBlogDetailDialog,
    closeDialog: closeBlogDetailDialog,
  } = useDialog(false);

  const { data: userDetails, isLoading: isLoadingDetails } =
    useGetUserDetailsByID(userData?.id ?? 0);
  const { data: userBlogs } = useGetBlogsByUserID(userData?.id ?? 0);
  const { data: allCategories } = useGetAllBlogCategories();

  const filteredBlogs = userBlogs?.filter(
    (blog) => blog.status === BLOG_STATUS.PUBLISHED
  );

  const handleBlogClick = (blog: BlogsType) => {
    setSelectedBlog(blog);
    openBlogDetailDialog();
  };

  if (error) {
    return (
      <GridItem className="gap-2 w-11/12 p-3 mx-auto my-8 rounded-md lg:max-w-[900px] min-h-[70vh] overflow-hidden bg-white lg:p-8 flex items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-2">
          <FileUser size={48} color="#A3A3A3" />
          <Typography>{error.message}</Typography>
        </div>
      </GridItem>
    );
  }

  return (
    <>
      {isLoading || isLoadingDetails ? (
        <GridItem className="p-0 flex items-center justify-center ">
          <GWSLoader loadingText="Loading User Details" />
        </GridItem>
      ) : (
        <>
          <GridItem size={12}>
            <div className=" flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden ">
                <ProfileImage
                  profileImageURL={userData?.profile_image_url || ""}
                  userFirstName={userData?.first_name}
                  userLastName={userData?.last_name}
                />
              </div>
              <span>
                <Typography size="xl" className="font-bold text-[#0A0D14]">
                  {`${userData?.first_name} ${userData?.last_name}`}
                </Typography>
                <Typography
                  variant="caption"
                  size="sm"
                  className="text-[#525866]"
                >
                  {userData?.email || ""}
                </Typography>
              </span>
            </div>
          </GridItem>
          <GridItem size={12} className="space-y-2">
            <Typography size="md" className=" text-[#262626]">
              My journey
            </Typography>
            <Typography
              size="sm"
              className="text-[#A3A3A3] whitespace-pre-line"
            >
              {userDetails?.journey || ""}
            </Typography>
          </GridItem>

          <GridItem size={12} className="space-y-2">
            <Typography size="md" className=" text-[#262626]">
              Delivery Address
            </Typography>
            <Typography size="sm" className="text-[#A3A3A3]">
              {`${userDetails?.street_address}, ${
                userDetails?.address_line &&
                `
                  ${userDetails?.address_line}
                ,`
              } ${userDetails?.city}, ${userDetails?.state}, ${
                userDetails?.zip_code
              }`}
            </Typography>
          </GridItem>

          {userBlogs && userBlogs.length > 0 && (
            <>
              <GridItem size={12}>
                <Separator className="border-t border-slate-100" />
              </GridItem>
              <GridItem size={12}>
                <Typography size="md" className=" text-[#262626]">
                  My Blog Posts
                </Typography>
              </GridItem>
            </>
          )}

          <GridItem className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs?.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                categories={allCategories || []}
                isEditable={false}
                onClick={handleBlogClick}
              />
            ))}
          </GridItem>
        </>
      )}

      <BlogDetailModal
        isOpen={isBlogDetailOpen}
        onClose={() => {
          closeBlogDetailDialog();
          setSelectedBlog(null);
        }}
        blog={selectedBlog}
      />
    </>
  );
}

export default StoryPage;
