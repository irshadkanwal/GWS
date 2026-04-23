import { useQuery } from "@tanstack/react-query";
import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { UserType } from "@/utilities/types/user";

const getUserByID = async (userID: number): Promise<UserType> => {
  return await fetchWrapper({
    url: `user/${userID}`,
  });
};

export default function useGetUserByID(userID: number) {
  return useQuery({
    queryKey: ["users", userID],
    queryFn: () => getUserByID(userID),
    enabled: !!userID,
  });
}
