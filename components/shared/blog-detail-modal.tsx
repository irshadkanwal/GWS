"use client";

import React from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { X, FileImage, Video, CalendarDays } from "lucide-react";
import { type BlogsType } from "@/utilities/types/blog";
import useGetAllBlogCategories from "@/hooks/blog-category/useGetAllBlogCategories";
import Typography from "../ui/typography";
import UIImageSliderDialog, { SliderItem } from "./image-slider";
import { isImage, isVideo } from "@/utilities/helpers/customValidations";
import { useDialog } from "@/hooks/useDialog";
import { useWindowSize } from "@/hooks/useWindowSize";
import { BLOG_STATUS } from "@/constants/constants";
import DOMPurify from "dompurify";
import { getFormattedDate } from "@/utilities/helpers/dateTime";

interface BlogModalProps {
  blog?: BlogsType | null;
  isOpen: boolean;
  onClose: () => void;
}

function BlogDetailModal({ blog, isOpen, onClose }: BlogModalProps) {
  const { data: blogCategories } = useGetAllBlogCategories();
  const [selectedImage, setSelectedImage] = React.useState<{
    index: number;
    items: SliderItem[];
  } | null>(null);
  const { width } = useWindowSize();
  const isMediumScreen = width <= 768;
  const isSmallScreen = width <= 450;

  const {
    open: isImageDialogOpen,
    openDialog: openImageDialog,
    closeDialog: closeImageDialog,
  } = useDialog(false);

  const sliderItems: SliderItem[] | undefined = React.useMemo(
    () =>
      blog?.attachments
        ?.map((attachment) => attachment)
        .filter((url): url is string => url !== undefined)
        .map((url) => ({
          url,
          alt: "",
          type: isImage(url) ? "image" : "video",
        })),
    [blog?.attachments]
  );

  const handleAttachmentClick = (url: string) => {
    const index = sliderItems?.findIndex((item) => item.url === url);
    if (index !== undefined && index !== -1) {
      setSelectedImage({ index, items: sliderItems || [] });
      openImageDialog();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        hideCloseButton={true}
        className="w-11/12 mx-auto md:max-w-[900px] max-h-[90vh] p-0 overflow-hidden border-none"
      >
        <ScrollArea className="max-h-[90vh]">
          <div className="relative">
            {/* Close Button */}
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4 z-10 rounded-full"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Featured Image */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <Image
                src={blog?.featured_image || ""}
                alt={blog?.title || ""}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Tags */}
              {blog?.status === BLOG_STATUS.PUBLISHED && (
                <div className="space-y-3 mb-3 text-[#385C80]">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={20} />
                    <Typography className="text-[#385C80]">
                      {getFormattedDate(blog.updated_at || "")}
                    </Typography>
                  </div>
                </div>
              )}

              {/* Title */}
              <Typography className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight">
                {blog?.title || ""}
              </Typography>

              {/* Description */}
              <div
                className="prose prose-gray prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(blog?.description || ""),
                }}
              />

              {/* Attachments Section */}
              <div>
                {blog?.attachments && blog?.attachments.length > 0 && (
                  <>
                    <Separator className="my-6" />
                    <Typography
                      size="lg"
                      className="font-semibold text-gray-900 mb-4 flex items-center gap-2"
                    >
                      Attachments
                    </Typography>
                  </>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {blog?.attachments.map((url, index) => {
                    const isVideoFile = isVideo(url);

                    return (
                      <div
                        key={index}
                        className="border rounded-md overflow-hidden hover:shadow-md transition-shadow bg-white cursor-pointer"
                        onClick={() => handleAttachmentClick(url)}
                      >
                        <div className="relative h-32 bg-gray-100">
                          {isVideoFile ? (
                            <video
                              src={url}
                              className="w-full h-full object-cover"
                              muted
                            />
                          ) : (
                            <Image
                              src={url || ""}
                              alt={`Attachment ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          )}

                          {/* Type Badge */}
                          <div className="absolute top-2 left-2">
                            <Badge variant={"secondary"} className="text-xs">
                              {isVideoFile ? (
                                <>
                                  <Video className="h-3 w-3 mr-1" /> Video
                                </>
                              ) : (
                                <>
                                  <FileImage className="h-3 w-3 mr-1" /> Image
                                </>
                              )}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {isImageDialogOpen && selectedImage && (
          <UIImageSliderDialog
            sliderItems={selectedImage.items}
            initialIndex={selectedImage.index}
            width={isSmallScreen ? 400 : isMediumScreen ? 600 : 900}
            height={600}
            isDialogOpen={isImageDialogOpen}
            closeDialog={closeImageDialog}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default BlogDetailModal;
