import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { ProductType } from "@/utilities/types/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface MutationVariables {
  newProduct: Omit<ProductType, "id">;
}

async function addNewProduct({
  newProduct,
}: MutationVariables): Promise<ProductType> {
  return await fetchWrapper({
    url: `product`,
    method: "POST",
    body: newProduct,
  });
}

export default function useAddNewProduct() {
  const queryClient = useQueryClient();

  return useMutation<ProductType, Error, MutationVariables>({
    mutationFn: (newProduct) => addNewProduct(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
