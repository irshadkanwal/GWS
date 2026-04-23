import { useQuery } from "@tanstack/react-query";
import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { SupportMessageType } from "@/utilities/types/support-message";

const getMessagesByUserID = async (
  userID: number
): Promise<SupportMessageType[]> => {
  return await fetchWrapper({
    url: `support-message/${userID}`,
  });
};

export default function useGetMessagesByUserID(
  userID: number,
  enabled?: boolean
) {
  return useQuery({
    queryKey: ["messages", userID],
    queryFn: () => getMessagesByUserID(userID),
    enabled: !!userID && enabled,
    refetchOnWindowFocus: true,
  });
}
