import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { RoleType } from "@/utilities/types/role";
import { useQuery } from "@tanstack/react-query";

const getAllRoles = async () => {
  return fetchWrapper<RoleType[]>({
    url: "role",
  });
};

export default function useGetAllRoles() {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getAllRoles,
  });
}
