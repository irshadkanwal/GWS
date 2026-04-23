import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { RegistryServiceType } from "@/utilities/types/registry-service";
import { useQuery } from "@tanstack/react-query";

const getAllRegistryServices = async () => {
  return fetchWrapper<RegistryServiceType[]>({
    url: "registry-service",
  });
};

export default function useGetAllRegistryServices() {
  return useQuery({
    queryKey: ["registryServices"],
    queryFn: getAllRegistryServices,
  });
}
