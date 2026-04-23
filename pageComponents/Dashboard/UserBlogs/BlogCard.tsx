import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash2, EyeOff, Eye, Pencil } from "lucide-react";
import { type BlogsType } from "@/utilities/types/blog";
import { Badge } from "@/components/ui/badge";
import { BlogCategoryType } from "@/utilities/types/blog-category";
import { useDialog } from "@/hooks/useDialog";
import ConfirmationDialog from "@/components/shared/confirmation-dialog";
import { BLOG_STATUS } from "@/constants/constants";
import { toast } from "sonner";
import EllipsisTypography from "@/pageComponents/common/EllipsisTypography";
import Image from "next/image";
import GenericPostFormModal from "@/pageComponents/Articles/GenericPostFormModal";
import Typography from "@/components/ui/typography";
import { useRouter } from "next/router";
import { getFormattedDate } from "@/utilities/helpers/dateTime";
import { NON_PROTECTED_ROUTES } from "@/constants/nonProtectedRoutes";
import DOMPurify from "dompurify";

interface BlogCardProps {
  blog: BlogsType;
  categories: BlogCategoryType[];
  isEditable?: boolean;
  onClick?: (blog: BlogsType) => void;
  onDelete?: (blogID: number) => void;
  onUpdate?: (id: number, postData: BlogsType) => Promise<void>;
  userID?: number;
  postType?: "Blog" | "Article";
}

export default function BlogCard({
  blog,
  categories,
  isEditable = true,
  onClick,
  onDelete,
  onUpdate,
  userID,
  postType,
}: BlogCardProps) {
  const {
    open: isDeleteDialogOpen,
    openDialog: openDeleteDialog,
    closeDialog: closeDeleteDialog,
  } = useDialog(false);
  const {
    open: isAddBlogDialogOpen,
    openDialog: openAddBlogDialog,
    closeDialog: closeAddBlogDialog,
  } = useDialog(false);
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case BLOG_STATUS.PUBLISHED:
        return "bg-green-100 text-green-800 hover:bg-green-200 capitalize px-3 py-2";
      case BLOG_STATUS.DRAFT:
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 capitalize px-3 py-2";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200 capitalize px-3 py-2";
    }
  };

  const handleDeleteBlog = (blogID: number) => {
    onDelete?.(blogID);
  };

  const handlePublish = async () => {
    try {
      const status =
        blog.status === BLOG_STATUS.PUBLISHED
          ? BLOG_STATUS.DRAFT
          : BLOG_STATUS.PUBLISHED;
      const blogData = {
        ...blog,
        status,
      };
      onUpdate?.(blog.id, blogData);
      toast.success(
        `${postType} ${
          status === BLOG_STATUS.DRAFT ? "drafted" : BLOG_STATUS.PUBLISHED
        } successfully.`
      );
    } catch (error) {
      toast.error(`Failed: ${error}`);
    }
  };

  const isPublicStoryPage = NON_PROTECTED_ROUTES.includes(router.pathname);

  return (
    <>
      <Card
        className="h-full flex flex-col hover:shadow-md transition-shadow hover:cursor-pointer"
        onClick={() => onClick?.(blog)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div
              className={`flex flex-col items-start justify-start gap-4 ${
                isEditable ? "min-h-36" : "min-h-24"
              }`}
            >
              {isEditable && (
                <div className="flex items-center">
                  <Badge className={getStatusColor(blog.status)}>
                    {blog.status}
                  </Badge>
                </div>
              )}
              <div>
                <EllipsisTypography className="font-semibold text-lg leading-tight line-clamp-2 mb-2 capitalize">
                  {blog.title}
                </EllipsisTypography>
                <EllipsisTypography
                  className="prose prose-gray prose-sm max-w-none line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(blog?.description || ""),
                  }}
                />
              </div>
            </div>
            {isEditable && (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    onClick={() => openAddBlogDialog()}
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={handlePublish}>
                    {blog.status === BLOG_STATUS.PUBLISHED ? (
                      <>
                        <EyeOff className="w-4 h-4 mr-2" />
                        Unpublish
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Publish
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={openDeleteDialog}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardHeader>

        {blog.attachments && (
          <div className="px-6 w-full h-40 pb-3">
            <Image
              src={blog.featured_image || "/profile.jpg"}
              alt={blog.title}
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        )}

        {!isPublicStoryPage && (
          <CardContent className="flex-1 pt-0">
            <div className="flex items-center gap-3">
              <Typography size="sm">
                {blog.status === BLOG_STATUS.PUBLISHED
                  ? "Published At:"
                  : " Created At:"}
              </Typography>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs rounded-sm">
                  {getFormattedDate(
                    blog.status === BLOG_STATUS.PUBLISHED
                      ? blog.updated_at || ""
                      : blog.created_at || ""
                  )}
                </Badge>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        openDialog={openDeleteDialog}
        closeDialog={closeDeleteDialog}
        title={`Delete ${postType}?`}
        description={`Are you sure you want to delete "${
          blog.title
        }" ${postType?.toLowerCase()}?`}
        confirmText="Yes, Delete"
        cancelText="Don't Delete"
        onConfirm={() => handleDeleteBlog?.(blog.id)}
      />

      <GenericPostFormModal
        open={isAddBlogDialogOpen}
        closeDialog={closeAddBlogDialog}
        selectedPost={blog}
        postType={postType || "Blog"}
        categories={categories || []}
        onUpdate={onUpdate}
        userId={userID || 0}
      />
    </>
  );
}
