import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { UserDetailsType } from "@/utilities/types/user-details";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface MutationVariables {
  userID: number;
  newUserDetails: Omit<UserDetailsType, "id">;
}

async function addUserDetails({
  userID,
  newUserDetails,
}: MutationVariables): Promise<UserDetailsType> {
  return await fetchWrapper({
    url: `user-details/${userID}`,
    method: "POST",
    body: newUserDetails,
  });
}

export default function useCreateUserDetails() {
  const queryClient = useQueryClient();
  return useMutation<UserDetailsType, Error, MutationVariables>({
    mutationFn: (newUserDetails) => addUserDetails(newUserDetails),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userDetails"] });
      toast.success("User details created successfully");
    },
    onError: () => {
      toast.error("Failed to add user details");
    },
  });
}
