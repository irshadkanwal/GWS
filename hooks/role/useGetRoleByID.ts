import { useQuery } from "@tanstack/react-query";
import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { RoleType } from "@/utilities/types/role";

const getRoleByID = async (id: number): Promise<RoleType> => {
  return await fetchWrapper({
    url: `role/${id}`,
  });
};

export default function useGetRoleById(id: number) {
  return useQuery({
    queryKey: ["roles", id],
    queryFn: () => getRoleByID(id),
    enabled: !!id,
  });
}
