import { useQuery } from "@tanstack/react-query";
import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { RegistryItemType } from "@/utilities/types/registryItem";

const getRegistryItemByRegistryID = async (
  registryID: number
): Promise<RegistryItemType[]> => {
  return await fetchWrapper({
    url: `registry-item/${registryID}`,
  });
};

export default function useGetRegistryItemByRegistryID(registryID: number) {
  return useQuery({
    queryKey: ["registryItems", registryID],
    queryFn: () => getRegistryItemByRegistryID(registryID),
    enabled: !!registryID,
  });
}
