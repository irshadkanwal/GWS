import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ExtendedUserType } from "@/utilities/types/user";

interface MutationVariables {
  newUser: Omit<ExtendedUserType, "id">;
}

async function addNewUser({
  newUser,
}: MutationVariables): Promise<ExtendedUserType> {
  return await fetchWrapper({
    url: `user`,
    method: "POST",
    body: newUser,
  });
}

export default function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation<ExtendedUserType, Error, MutationVariables>({
    mutationFn: (newUser) => addNewUser(newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
