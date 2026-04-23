import React from "react";
import { UploadingOverlay } from "@/components/shared/attachment-card";
import ImageLoader from "@/components/shared/image-loader";
import { Button } from "@/components/ui/button";
import IconCircle from "@/components/ui/IconCircles";
import { isImage, isVideo } from "@/utilities/helpers/customValidations";
import { ImageUp, X } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";

type Props = {
  attachments: string[];
  isAddingMedia?: boolean;
  onClose?: (index: number) => void;
  isRemoveable?: boolean;
  onMediaClick?: (url: string) => void;
};

function MediaGallery({
  attachments,
  isAddingMedia = false,
  onClose,
  isRemoveable = false,
  onMediaClick,
}: Props) {
  const images = attachments.filter(isImage);
  const videos = attachments.filter(isVideo);

  const handleClose = (
    e: React.MouseEvent<HTMLButtonElement>,
    index?: number
  ) => {
    e.stopPropagation();
    onClose?.(index || 0);
  };

  return (
    <div className="flex flex-col gap-6 w-11/12 mx-auto">
      {images.length > 0 && (
        <div className="flex flex-wrap items-center gap-5">
          {images.map((url, index) => (
            <div
              key={`image-${index}`}
              className="w-60 h-40 rounded-md relative cursor-pointer"
              onClick={() => onMediaClick?.(url)}
            >
              <ImageLoader
                src={url}
                alt={`image - ${index + 1}`}
                width={200}
                height={200}
                fallback={
                  <IconCircle className="w-full h-full bg-transparent text-[#385C80] !m-0">
                    <ImageUp />
                  </IconCircle>
                }
                className="w-full max-h-full object-cover rounded-md shadow-md border border-gray-100"
              />
              {isRemoveable && (
                <Button
                  variant="outline"
                  disabled={isAddingMedia}
                  className="absolute -top-2 -right-2 bg-white hover:bg-[#385C80] hover:text-white border border-[#385C80] rounded-full text-[#385C80] min-w-0 flex justify-center items-center p-0.5 w-4 h-4 z-20"
                  onClick={(e) => handleClose(e, attachments.indexOf(url))}
                  type="button"
                >
                  <X fontSize="inherit" />
                </Button>
              )}
            </div>
          ))}
          {/* Uploading Overlay */}
          {isAddingMedia && (
            <div className="relative w-60 h-40 rounded-md flex items-center justify-center border border-dashed border-gray-300 animate-pulse text-sm text-gray-500">
              <UploadingOverlay />
            </div>
          )}
        </div>
      )}

      {images.length > 0 && videos.length > 0 && (
        <Separator className="my-1 w-full border-t border-slate-100" />
      )}

      {videos.length > 0 && (
        <div className="flex flex-wrap items-center gap-5">
          {videos.map((url, index) => (
            <div
              key={`video-${index}`}
              className="w-60 h-40 rounded border border-gray-100 shadow-md relative cursor-pointer"
              onClick={() => onMediaClick?.(url)}
            >
              <video
                src={url}
                controls
                autoPlay={false}
                className="w-full h-full object-cover rounded"
                onPlay={(e) => {
                  (e.target as HTMLVideoElement).pause();
                }}
              />
              {isRemoveable && (
                <Button
                  variant="outline"
                  disabled={isAddingMedia}
                  className="absolute -top-2 -right-2 bg-white hover:bg-[#385C80] hover:text-white border border-[#385C80] rounded-full text-[#385C80] min-w-0 flex justify-center items-center p-0.5 w-4 h-4 z-20"
                  onClick={(e) => handleClose(e, attachments.indexOf(url))}
                  type="button"
                >
                  <X fontSize="inherit" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MediaGallery;
