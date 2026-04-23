import React from "react";

import type { ProductType } from "@/utilities/types/product";
import type { RegistryItemType } from "@/utilities/types/registryItem";
import { getSuggestedProducts } from "@/utilities/helpers/getSuggestedProducts";

type UseSuggestedProductsArgs = {
  allProducts: ProductType[] | undefined;
  userRegistryProducts: RegistryItemType[];
  preferredCategories: number[] | undefined;
};

export function useGetSuggestedProducts({
  allProducts,
  userRegistryProducts,
  preferredCategories,
}: UseSuggestedProductsArgs): ProductType[] {
  return React.useMemo(
    () =>
      getSuggestedProducts({
        allProducts,
        userRegistryProducts,
        preferredCategories,
      }),
    [allProducts, userRegistryProducts, preferredCategories]
  );
}
