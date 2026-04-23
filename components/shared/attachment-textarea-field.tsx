import React from "react";
import FormTextareaField from "@/components/form/Fields/FormTextareaField";
import { useS3Upload } from "@/hooks/s3-bucket/useS3Upload";
import { useS3Delete } from "@/hooks/s3-bucket/useS3Deletion";
import { useUserStore } from "@/store";
import { toast } from "sonner";
import type { AttachmentCardType } from "@/components/shared/attachment-card";
import { useDialog } from "@/hooks/useDialog";
import UIImageSliderDialog from "@/components/shared/image-slider";
import type { SliderItem } from "@/components/shared/image-slider";
import { useWindowSize } from "@/hooks/useWindowSize";
import { isImage } from "@/utilities/helpers/customValidations";
import {
  BUCKET_FOLDER_NAME,
  BucketDirectoryFolderType,
  MAX_VIDEO_SIZE_BYTES,
  MAX_VIDEO_SIZE_MB,
} from "@/constants/constants";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  maxCharactersLength?: number;
  defaultUrls?: string[];
  readonly?: boolean;
  onAttachmentsChange?: (urls: string[]) => void;
  showCharacterCount?: boolean;
  showAttachmentButton?: boolean;
} & BucketDirectoryFolderType;

export default function AttachmentTextareaField({
  name,
  label,
  placeholder,
  maxCharactersLength = 5000,
  defaultUrls = [],
  readonly = false,
  showAttachmentButton = false,
  showCharacterCount = true,
  onAttachmentsChange,
  bucketFolderName = BUCKET_FOLDER_NAME.STORY,
}: Props) {
  const user = useUserStore(React.useCallback((state) => state, []));
  const { uploadFile, isPending } = useS3Upload();
  const { deleteFile, isPending: isPendingDelete } = useS3Delete();
  const bucketBaseUrl = process.env.NEXT_PUBLIC_AWS_BUCKET_URL;
  const [attachments, setAttachments] = React.useState<AttachmentCardType[]>(
    []
  );
  const [selectedImage, setSelectedImage] = React.useState<{
    index: number;
    items: SliderItem[];
  } | null>(null);
  const { open: isImageDialogOpen, openDialog, closeDialog } = useDialog(false);
  const { width } = useWindowSize();
  const isMediumScreen = width <= 768;
  const isSmallScreen = width <= 450;

  const sliderItems: SliderItem[] = attachments
    .map((attachment) => attachment.url)
    .filter((url): url is string => url !== undefined)
    .map((url) => ({
      url,
      alt: "",
      type: isImage(url) ? "image" : "video",
    }));

  React.useEffect(() => {
    if (defaultUrls?.length) {
      const initialAttachments = defaultUrls.map((url, idx) => ({
        id: `${idx}-${url}`,
        title: url.split("/").pop() || `attachment-${idx}`,
        fileTypeTag: url.endsWith(".mp4") ? "mp4" : "image",
        file: null,
        details: "",
        isUploading: false,
        cardType: "file" as const,
        thumbnail: "",
        url,
        actionKey: `${idx}-${url}`,
      }));
      setAttachments(initialAttachments);
    }
  }, [defaultUrls]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      const isValidFileSize = file.size <= MAX_VIDEO_SIZE_BYTES;

      if (!isValidFileSize) {
        toast.error(`Video size exceeds the limit of ${MAX_VIDEO_SIZE_MB} MB`);
        return false;
      }

      return isImage || (isVideo && isValidFileSize);
    });

    if (!validFiles.length) return;

    const initialAttachments: AttachmentCardType[] = validFiles.map((file) => ({
      id: file.name,
      title: file.name,
      fileTypeTag: file.type.split("/")[1],
      file,
      details: `${Math.round(file.size / 1024)} KB`,
      isUploading: true,
      cardType: "file",
      thumbnail: "",
      actionKey: file.name,
    }));

    setAttachments((prev) => [...prev, ...initialAttachments]);

    await Promise.all(
      validFiles.map(async (file) => {
        try {
          const url = await uploadFile({
            file,
            userId: user.id || 0,
            type: bucketFolderName,
          });

          setAttachments((prev) =>
            prev.map((att) =>
              att.title === file.name
                ? { ...att, isUploading: false, url }
                : att
            )
          );

          onAttachmentsChange?.([
            ...attachments.map((a) => a.url || "").filter(Boolean),
            url,
          ]);
        } catch (err) {
          console.error("Upload failed:", err);
          setAttachments((prev) =>
            prev.map((att) =>
              att.title === file.name
                ? { ...att, isUploading: false, error: true }
                : att
            )
          );
        }
      })
    );
  };

  const handleRemoveAttachment = async (index: number) => {
    const fileToDelete = attachments[index];
    const key = fileToDelete.url?.replace(`${bucketBaseUrl}/`, "");

    try {
      await deleteFile(key || "");
      const updated = [...attachments];
      updated.splice(index, 1);
      setAttachments(updated);

      onAttachmentsChange?.(
        updated.map((attachment) => attachment.url ?? "").filter(Boolean)
      );

      toast.success("File removed successfully.");
    } catch {
      toast.error("Failed to delete file.");
    }
  };

  const handleAttachmentClick = (url: string) => {
    const index = sliderItems.findIndex((item) => item.url === url);
    if (index !== -1) {
      setSelectedImage({ index, items: sliderItems });
      openDialog();
    }
  };

  return (
    <>
      <FormTextareaField
        name={name}
        label={label}
        placeholder={placeholder}
        maxCharactersLength={maxCharactersLength}
        showAttachmentButton={showAttachmentButton}
        showCharacterCount={showCharacterCount}
        handleUploads={handleFileUpload}
        onAttachmentRemove={handleRemoveAttachment}
        attachments={attachments}
        setAttachments={setAttachments}
        isUploadingFile={isPending || isPendingDelete}
        onAttachmentClick={handleAttachmentClick}
        readonly={readonly || isPending || isPendingDelete}
        disableAttchmentButton={readonly || isPending || isPendingDelete}
      />

      {isImageDialogOpen && selectedImage && (
        <UIImageSliderDialog
          sliderItems={selectedImage.items}
          initialIndex={selectedImage.index}
          width={isSmallScreen ? 400 : isMediumScreen ? 600 : 900}
          height={600}
          isDialogOpen={isImageDialogOpen}
          closeDialog={closeDialog}
        />
      )}
    </>
  );
}
