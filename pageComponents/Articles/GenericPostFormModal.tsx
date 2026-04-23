"use client";

import React from "react";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Form from "@/components/form/Form";
import FormTextField from "@/components/form/Fields/FormTextField";
import FormMultiSelectField from "@/components/form/Fields/FormMultiSelectField";
import FormFooter from "@/components/form/FormFooter";
import { useS3Upload } from "@/hooks/s3-bucket/useS3Upload";
import { toast } from "sonner";
import { GridItem } from "@/components/ui/Grid";
import Typography from "@/components/ui/typography";
import type { BlogsType } from "@/utilities/types/blog";
import { BLOG_STATUS, BUCKET_FOLDER_NAME } from "@/constants/constants";
import { CameraIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import FormRichTextField from "@/components/form/Fields/FormRichTextField";

type CategoryOption = { id: number; name: string };

type Props = {
  open: boolean;
  closeDialog: () => void;
  selectedPost?: BlogsType;
  postType: "Blog" | "Article";
  categories: CategoryOption[];
  onCreate?: (blogData: Omit<BlogsType, "id">) => Promise<void>;
  onUpdate?: (id: number, postData: BlogsType) => Promise<void>;
  userId: number;
};

function GenericPostFormModal({
  open,
  closeDialog,
  selectedPost,
  postType,
  categories,
  onCreate,
  onUpdate,
  userId,
}: Props) {
  const { uploadFile, isPending } = useS3Upload();
  const [previewUrl, setPreviewUrl] = React.useState<string>("");

  React.useEffect(() => {
    setPreviewUrl(selectedPost?.featured_image || "");
  }, [selectedPost]);

  const [attachments, setAttachments] = React.useState<string[]>([]);
  const formActionRef = React.useRef<"draft" | "publish">("publish");
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id.toString(),
  }));
  const isAdminBlogs = postType.toLowerCase() === BUCKET_FOLDER_NAME.ARTICLE;
  const initialValues = {
    title: selectedPost?.title || "",
    ...(isAdminBlogs && { category: selectedPost?.category.map(String) || [] }),
    description: selectedPost?.description || "",
    featured_image: previewUrl || "",
  };

  const schema = z.object({
    title: z.string().min(1, "Title is required"),
    ...(isAdminBlogs && {
      category: z.array(z.string()).min(1, "Select at least one category"),
    }),
    description: z.string().min(1, "Description is required"),
    featured_image: z.union([z.string(), z.instanceof(File)]),
  });

  type FormValues = z.infer<typeof schema>;

  const handleSubmit = async (values: FormValues) => {
    let imageUrl = previewUrl || "";

    try {
      const typeKey = postType.toUpperCase() as keyof typeof BUCKET_FOLDER_NAME;

      if (values.featured_image instanceof File) {
        imageUrl = await uploadFile({
          file: values.featured_image,
          userId,
          type: BUCKET_FOLDER_NAME[typeKey],
        });
      }
    } catch (err) {
      toast.error("Image upload failed");
      return;
    }

    const postData = {
      title: values.title,
      description: values.description,
      featured_image: imageUrl,
      category:
        isAdminBlogs && Array.isArray(values.category)
          ? values.category.map(Number)
          : [],
      attachments,
      status:
        formActionRef.current === BLOG_STATUS.DRAFT
          ? BLOG_STATUS.DRAFT
          : BLOG_STATUS.PUBLISHED,
      user_id: userId,
    };

    try {
      if (selectedPost) {
        const updatedPostData = { ...postData, id: selectedPost.id };
        await onUpdate?.(selectedPost.id, updatedPostData);
        toast.success(`${postType} updated successfully.`);
      } else {
        if (onCreate) {
          await onCreate(postData);
          toast.success(
            `${postType} ${
              postData.status === BLOG_STATUS.DRAFT
                ? "saved as draft"
                : BLOG_STATUS.PUBLISHED
            } successfully.`
          );
        }
      }
      closeDialog();
      setAttachments([]);
      setPreviewUrl("");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleProfileImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");

    if (!isImage) {
      toast.error("Only image files are allowed");
      return;
    }

    try {
      const typeKey = postType.toUpperCase() as keyof typeof BUCKET_FOLDER_NAME;
      const url = await uploadFile({
        file,
        userId,
        type: BUCKET_FOLDER_NAME[typeKey],
      });
      setPreviewUrl(url);
    } catch (error) {
      toast.error("Profile image upload failed.");
    }
  };

  const handleCloseDialog = () => {
    closeDialog();
    setAttachments([]);
    if (!selectedPost) {
      setPreviewUrl("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <DialogContent className="w-11/12 mx-auto md:max-w-4xl max-h-[90vh] overflow-y-auto px-5">
        <DialogHeader>
          <DialogTitle className="capitalize">
            {selectedPost ? `Edit ${postType}` : `Create New ${postType}`}
          </DialogTitle>
        </DialogHeader>

        <Form<FormValues>
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleSubmit}
          resetAfterSubmit
        >
          <GridItem className="flex justify-center p-0">
            <div className="relative group w-full h-60 rounded-sm overflow-hidden border border-gray-300 shadow-md">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="article-image"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 gap-3">
                  <Typography size="xl" className="font-semibold text-gray-700">
                    Add Featured Image
                  </Typography>
                </div>
              )}

              <div
                onClick={!isPending ? handleImageClick : undefined}
                className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity ${
                  isPending && "hidden"
                }`}
                title="Add Featured Image"
              >
                <CameraIcon className="text-white" />
              </div>
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                name="featured_image"
                ref={fileInputRef}
                onChange={handleProfileImageUpload}
                disabled={isPending}
                title="Add Featured Image"
              />
              {isPending && (
                <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-10">
                  <div className="w-6 h-6 border-2 border-t-transparent border-blue-500 rounded-full animate-spin" />
                </div>
              )}
            </div>
          </GridItem>
          <FormTextField
            name="title"
            label="Title"
            className={
              isAdminBlogs ? "col-span-12 lg:col-span-6" : "col-span-12"
            }
          />
          {isAdminBlogs && (
            <FormMultiSelectField
              className="col-span-12 lg:col-span-6"
              name="category"
              label="Category"
              placeholder={`Choose the ${postType} category`}
              options={categoryOptions}
            />
          )}
          <FormRichTextField
            name="description"
            label="Description"
            placeholder="Write Blog Details here..."
          />

          <FormFooter
            submitButtonText={
              selectedPost ? `Update ${postType}` : `Save & Publish`
            }
            IsResetButtonRequired={false}
            renderBackButton
            backButtonText={selectedPost ? "Cancel" : "Save as Draft"}
            backButtonType={selectedPost ? "button" : "submit"}
            onBackButtonClick={() => {
              if (!selectedPost) {
                formActionRef.current = "draft";
              } else {
                closeDialog();
                setAttachments([]);
                setPreviewUrl("");
              }
            }}
            onNextClick={() => {
              formActionRef.current = "publish";
            }}
            nextButtonType="submit"
            disableBackButton={isPending}
            isSubmitButtonDisabled={isPending}
          />
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default GenericPostFormModal;
