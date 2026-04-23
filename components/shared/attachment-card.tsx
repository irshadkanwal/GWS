import React from "react";
import { Button } from "../ui/button";
import { ImageUp, Video, X } from "lucide-react";
import { Grid, GridItem } from "../ui/Grid";
import { cn } from "@/lib/utils";
import ImageLoader from "./image-loader";
import IconCircle from "../ui/IconCircles";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import GWSLoader from "./gws-loader";

type AttachmentsTypes = "file" | "boardNode" | "memory" | "workspace";
export type AttachmentCardType = {
  id: string;
  title: string;
  cardType: AttachmentsTypes;
  thumbnail: string;
  actionKey: string;
  fileTypeTag: string;
  file: File | null;
  details: string;
  isUploading: boolean;
  enableDeletion?: boolean;
  iconComponent?: React.ReactNode;
  url?: string;
};

type Props = {
  title: string;
  disabled?: boolean;
  details: string;
  fileTypeTag: string;
  thumbnail: any;
  file: File | null;
  isUploading: boolean;
  cardType: AttachmentsTypes;
  onClose: () => void;
  onClick?: () => void;
  isRemovable?: boolean;
  maxWidth?: string;
  minWidth?: string;
  color?: string;
  width?: number;
  height?: number;
  iconComponent?: React.ReactNode;
  isChatAttachment?: boolean;
  previewUrl?: string;
};

// Helper component for loading indicator
export const UploadingOverlay = () => (
  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white/50 rounded-md">
    <GWSLoader spinnerWidth={24} spinnerHeight={24} />
  </div>
);

// Component for image preview
const ImagePreview = ({
  displayUrl,
  title,
  width,
  height,
  isUploading,
  fileTypeTag,
}: {
  displayUrl?: string;
  title: string;
  width: number;
  height: number;
  color?: string;
  file: File | null;
  fileTypeTag: string;
  isUploading: boolean;
}) => {
  const isVideo =
    fileTypeTag === "mp4" || fileTypeTag === "webm" || fileTypeTag === "mov";
  return (
    <div className="relative flex items-center justify-center w-20 h-16 p-2">
      {isVideo ? (
        <div className="relative w-full h-full bg-[#385C80] border border-[#385C80] rounded-sm flex items-center justify-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Video className="text-white" />
            </TooltipTrigger>
            <TooltipContent>{title}</TooltipContent>
          </Tooltip>
        </div>
      ) : (
        <ImageLoader
          src={displayUrl}
          height={height}
          width={width}
          className="rounded-sm object-cover w-full h-full"
          alt={title}
          fallback={
            <IconCircle
              className={"w-full h-full bg-transparent text-[#385C80] !m-0"}
            >
              <ImageUp />
            </IconCircle>
          }
        />
      )}

      {isUploading && <UploadingOverlay />}
    </div>
  );
};

function AttachmentCard({
  title,
  onClose,
  disabled = false,
  onClick,
  fileTypeTag,
  file,
  isUploading,
  isRemovable = true,
  maxWidth = "fit-content",
  color,
  width = 50,
  height = 50,
  previewUrl,
}: Props) {
  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose();
  };

  const isDisabled = isUploading || disabled;

  return (
    <div className="relative w-auto">
      <Grid
        className={cn(
          "border border-gray-400 rounded-sm w-20 h-16 flex-nowrap items-center cursor-pointer gap-2 container relative p-0",
          maxWidth
        )}
        onClick={() => {
          onClick?.();
        }}
      >
        {/* Display area - either custom icon, image preview, or file type icon */}
        <GridItem className="p-0 w-full h-full">
          <ImagePreview
            displayUrl={previewUrl}
            title={title}
            width={width}
            height={height}
            color={color}
            file={file}
            fileTypeTag={fileTypeTag}
            isUploading={isUploading}
          />
        </GridItem>

        {/* Close button */}
        {isRemovable && (
          <Button
            variant="outline"
            disabled={isDisabled}
            className="absolute -top-2 -right-2 bg-white hover:bg-[#385C80] hover:text-white border border-[#385C80] rounded-full text-[#385C80] min-w-0 flex justify-center items-center p-0.5 w-4 h-4 z-20"
            onClick={handleClose}
            type="button"
          >
            <X fontSize="inherit" />
          </Button>
        )}
      </Grid>
    </div>
  );
}

export default AttachmentCard;
