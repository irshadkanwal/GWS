import { useQuery } from "@tanstack/react-query";
import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { RegistryServiceType } from "@/utilities/types/registry-service";

const getRegistryServiceByRegistryID = async (
  registryID: number
): Promise<RegistryServiceType[]> => {
  return await fetchWrapper({
    url: `registry-service/${registryID}`,
  });
};

export default function useGetRegistryServiceByRegistryID(registryID: number) {
  return useQuery({
    queryKey: ["registryServices", registryID],
    queryFn: () => getRegistryServiceByRegistryID(registryID),
    enabled: !!registryID,
  });
}
