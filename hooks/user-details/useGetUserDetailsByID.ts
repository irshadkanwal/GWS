import { useQuery } from "@tanstack/react-query";
import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { UserDetailsType } from "@/utilities/types/user-details";

const getUserDetailsByID = async (userID: number): Promise<UserDetailsType> => {
  return await fetchWrapper({
    url: `user-details/${userID}`,
  });
};

export default function useGetUserDetailsByID(
  userID: number,
  enabled?: boolean
) {
  return useQuery({
    queryKey: ["userDetails", userID],
    queryFn: () => getUserDetailsByID(userID),
    enabled: !!userID && enabled,
  });
}
