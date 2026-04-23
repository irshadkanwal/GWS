import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import { useMutation } from "@tanstack/react-query";
type MutationVariables = {
  productLink: string;
};

type ProductMetaType = {
  title: string;
  description: string;
  image: string;
  price: string;
};

export const fetchProductMeta = async ({ productLink }: MutationVariables) => {
  const response = await fetchWrapper<ProductMetaType>({
    url: `product-meta?url=${encodeURIComponent(productLink)}`,
  });

  const cleanedTitle = response.title
    ?.split("Amazon.com:")[1]
    ?.split(" :")[0]
    ?.trim();

  return {
    ...response,
    title: cleanedTitle || response.title,
  };
};

export default function useFetchProductMeta() {
  return useMutation<ProductMetaType, Error, MutationVariables>({
    mutationFn: fetchProductMeta,
  });
}
