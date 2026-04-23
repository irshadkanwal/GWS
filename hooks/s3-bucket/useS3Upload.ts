import { BUCKET_FOLDER_NAME } from "@/constants/constants";
import { useMutation } from "@tanstack/react-query";

export function useS3Upload() {
  const uploadFileToS3 = async ({
    file,
    userId,
    type,
  }: {
    file: File;
    userId: number;
    type: (typeof BUCKET_FOLDER_NAME)[keyof typeof BUCKET_FOLDER_NAME];
  }): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId.toString());
    formData.append("type", type);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("File upload failed");
    }

    const data = await response.json();
    return data.url;
  };

  const mutation = useMutation({
    mutationFn: uploadFileToS3,
  });

  return {
    uploadFile: mutation.mutateAsync, // call this to upload
    ...mutation, // includes isPending, isSuccess, isError, error, data, etc.
  };
}
