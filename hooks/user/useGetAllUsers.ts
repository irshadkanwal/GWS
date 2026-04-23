import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { UserType } from "@/utilities/types/user";
import { useQuery } from "@tanstack/react-query";

const getAllUsers = async () => {
  return fetchWrapper<UserType[]>({
    url: "user",
  });
};

export default function useGetAllUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
}
