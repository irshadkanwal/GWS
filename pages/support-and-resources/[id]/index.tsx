"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import GwsLoaderLogo from "@/components/shared/gws-loader-logo";
import { FileImage, Video, TagIcon, Calendar } from "lucide-react";
import { useDialog } from "@/hooks/useDialog";
import { useWindowSize } from "@/hooks/useWindowSize";
import type { SliderItem } from "@/components/shared/image-slider";
import UIImageSliderDialog from "@/components/shared/image-slider";
import { useRouter } from "next/router";
import useGetAllBlogCategories from "@/hooks/blog-category/useGetAllBlogCategories";
import useGetArticlesByID from "@/hooks/article/useGetArticlesByID";
import { FILE_UPLOAD_TYPE } from "@/constants/constants";
import { isImage, isVideo } from "@/utilities/helpers/customValidations";
import Typography from "@/components/ui/typography";
import { getFormattedDate } from "@/utilities/helpers/dateTime";
import DOMPurify from "dompurify";

function BlogDetailPage() {
  const router = useRouter();
  const blogID = router.query.id;
  const { data: allCategories, isLoading } = useGetAllBlogCategories();
  const { data: articlesData, isLoading: isLoadingData } = useGetArticlesByID(
    Number(blogID)
  );

  const filteredCategories = React.useMemo(() => {
    return allCategories?.filter((category) =>
      articlesData?.category.includes(category.id)
    );
  }, [allCategories, articlesData?.category]);

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
      articlesData?.attachments.map((url) => ({
        url,
        alt: "",
        type: isImage(url) ? FILE_UPLOAD_TYPE.IMAGE : FILE_UPLOAD_TYPE.VIDEO,
      })),
    [articlesData?.attachments]
  );

  const handleAttachmentClick = (url: string) => {
    const index = sliderItems?.findIndex((item) => item.url === url);
    if (index !== undefined && index !== -1) {
      setSelectedImage({ index, items: sliderItems || [] });
      openImageDialog();
    }
  };

  if (isLoading || isLoadingData) {
    return <GwsLoaderLogo />;
  }

  return (
    <div className="min-h-screen py-8">
      {/* Hero Section */}
      <div className="relative h-64 md:h-96 overflow-hidden w-4/5 mx-auto rounded-md shadow-md">
        <Image
          src={articlesData?.featured_image || ""}
          alt={articlesData?.title || ""}
          fill
          className="object-cover w-4/5"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {filteredCategories?.map((category) => (
                <Badge
                  key={category.id}
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  {category.name}
                </Badge>
              ))}
            </div>
            <Typography className="text-2xl md:text-4xl font-bold mb-4 leading-tight text-white">
              {articlesData?.title || ""}
            </Typography>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar />
            <span className="text-lg text-gray-900">
              {getFormattedDate(articlesData?.updated_at || "")}
            </span>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
          {/* Description */}
          <div
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(articlesData?.description || ""),
            }}
          />
        </div>

        {/* Attachments Section */}
        {articlesData?.attachments && articlesData?.attachments.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <FileImage className="h-5 w-5 text-gray-600" />
              <Typography size="xl" className="font-semibold text-gray-900">
                Media Gallery
              </Typography>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {articlesData.attachments.map((url, index) => {
                const isVideoFile = isVideo(url);
                return (
                  <div
                    key={index}
                    className="group relative border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 bg-white cursor-pointer transform hover:scale-[1.02]"
                    onClick={() => handleAttachmentClick(url)}
                  >
                    <div className="relative h-48 bg-gray-100">
                      {isVideoFile ? (
                        <video
                          src={url}
                          className="w-full h-full object-cover"
                          muted
                        />
                      ) : (
                        <Image
                          src={url || "/placeholder.svg"}
                          alt={`Attachment ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      )}

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />

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
        )}

        {/* Tags Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mt-8">
          <div className="flex items-center gap-2 mb-4">
            <TagIcon className="h-5 w-5 text-gray-600" />
            <Typography size="lg" className="font-semibold text-gray-900">
              Tags
            </Typography>
          </div>
          <div className="flex flex-wrap gap-2">
            {filteredCategories?.map((category) => (
              <Badge
                key={category.id}
                variant="outline"
                className="text-sm hover:bg-gray-100 cursor-pointer"
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
      </main>

      {/* Image Slider Dialog */}
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
    </div>
  );
}

export default BlogDetailPage;
