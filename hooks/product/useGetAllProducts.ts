import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { ProductType } from "@/utilities/types/product";
import { useQuery } from "@tanstack/react-query";

const getAllProducts = async () => {
  return fetchWrapper<ProductType[]>({
    url: "product",
  });
};

export default function useGetAllProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
}
