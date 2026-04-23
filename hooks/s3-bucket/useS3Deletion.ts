import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import { useMutation } from "@tanstack/react-query";

export function useS3Delete() {
  const mutation = useMutation({
    mutationFn: async (key: string) => {
      const response = await fetchWrapper({
        url: `/upload/${encodeURIComponent(key)}`,
        method: "DELETE",
      });

      if (!response) {
        throw new Error("Failed to delete file from S3");
      }

      return true;
    },
  });

  return {
    deleteFile: mutation.mutateAsync,
    ...mutation,
  };
}
