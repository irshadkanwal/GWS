import { useQuery } from "@tanstack/react-query";
import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { UserType } from "@/utilities/types/user";

const getUserByEmail = async (email: string): Promise<UserType> => {
  return await fetchWrapper({
    url: `user`,
    method: "POST",
    body: { email },
  });
};

export default function useGetUserByEmail(email: string) {
  return useQuery({
    queryKey: ["users", email],
    queryFn: () => getUserByEmail(email),
    enabled: !!email,
  });
}
