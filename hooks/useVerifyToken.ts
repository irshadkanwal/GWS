import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

type VerifyTokenType = {
  message: string;
};

const verifyToken = async (token: string) => {
  const response = await fetchWrapper<VerifyTokenType>({
    url: `/verify-email?token=${token}`,
  });
  return response;
};

export const useVerifyToken = () => {
  const router = useRouter();
  const token = router.query.token as string | undefined;
  const isOnVerifyPage = router.pathname === "/verify";

  return useQuery({
    queryKey: ["verify-token", token],
    queryFn: () => verifyToken(token!),
    enabled: !!token && isOnVerifyPage,
    retry: false,
  });
};
