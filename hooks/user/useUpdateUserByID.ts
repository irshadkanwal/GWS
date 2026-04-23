import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { UserType } from "@/utilities/types/user";

type MutationVariables = {
  userData: UserType;
  userID?: number;
};

async function updateUserByID({
  userData,
  userID,
}: MutationVariables): Promise<UserType> {
  return await fetchWrapper<UserType>({
    method: "PATCH",
    url: `user/${userID}`,
    body: userData,
  });
}

export default function useUpdateUserByID() {
  const queryClient = useQueryClient();
  return useMutation<UserType, Error, MutationVariables>({
    mutationFn: updateUserByID,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}
