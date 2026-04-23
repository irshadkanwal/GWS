import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useDeleteUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (userID: number) => {
      return await fetchWrapper({
        url: `user/${userID}`,
        method: "DELETE",
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully.");
    },
    onError: () => {
      toast.error("Failed to delete user.");
    },
  });

  return mutation;
}
