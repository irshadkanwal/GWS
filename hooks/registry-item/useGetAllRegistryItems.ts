import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { RegistryItemType } from "@/utilities/types/registryItem";
import { useQuery } from "@tanstack/react-query";

const getAllRegistryItems = async () => {
  return fetchWrapper<RegistryItemType[]>({
    url: "registry-item",
  });
};

export default function useGetAllRegistryItems() {
  return useQuery({
    queryKey: ["registryItems"],
    queryFn: getAllRegistryItems,
  });
}
