import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { UserDetailsType } from "@/utilities/types/user-details";

type MutationVariables = {
  userDetails: Omit<UserDetailsType, "id">;
  id?: number;
};

async function updateUserDetails({
  userDetails,
  id,
}: MutationVariables): Promise<UserDetailsType> {
  return await fetchWrapper<UserDetailsType>({
    method: "PATCH",
    url: `user-details/${id}`,
    body: userDetails,
  });
}

export default function useUpdateUserDetails() {
  const queryClient = useQueryClient();
  return useMutation<UserDetailsType, Error, MutationVariables>({
    mutationFn: updateUserDetails,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["userDetails", variables.userDetails.user_id],
      });
    },
  });
}
