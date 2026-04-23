import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useDeleteDonation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (donationID: number) => {
      return await fetchWrapper({
        url: `donation/${donationID}`,
        method: "DELETE",
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donations"] });
      toast.success("Donation deleted successfully.");
    },
    onError: () => {
      toast.error("Failed to delete donation.");
    },
  });

  return mutation;
}
