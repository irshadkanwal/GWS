import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { UserType } from "@/utilities/types/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const verifyToken = async (token: string): Promise<UserType> => {
  const response = await fetchWrapper<UserType>({
    url: `/reset-password?token=${token}`,
  });
  return response;
};

export const useVerifyResetToken = () => {
  const router = useRouter();
  const token = router.query.token as string | undefined;
  const isOnVerifyPage = router.pathname === "/reset-password";

  return useQuery({
    queryKey: ["verifyReset", token],
    queryFn: () => verifyToken(token!),
    enabled: !!token && isOnVerifyPage,
    retry: false,
  });
};
