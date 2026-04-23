import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { ProductTypesType } from "@/utilities/types/product-type";
import { useQuery } from "@tanstack/react-query";

const getAllProductTypes = async () => {
  return fetchWrapper<ProductTypesType[]>({
    url: "product-types",
  });
};

export default function useGetAllProductTypes() {
  return useQuery({
    queryKey: ["productTypes"],
    queryFn: getAllProductTypes,
  });
}
