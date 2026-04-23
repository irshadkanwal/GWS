import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { ProductType } from "@/utilities/types/product";

type MutationVariables = {
  productDetails: ProductType;
  productID?: number;
};

async function updateUpdateProduct({
  productDetails,
  productID,
}: MutationVariables): Promise<ProductType> {
  return await fetchWrapper<ProductType>({
    method: "PUT",
    url: `product/${productID}`,
    body: productDetails,
  });
}

export default function useUpdateProductByID() {
  const queryClient = useQueryClient();
  return useMutation<ProductType, Error, MutationVariables>({
    mutationFn: updateUpdateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}
