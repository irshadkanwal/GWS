import type { ProductType } from "@/utilities/types/product";
import type { RegistryItemType } from "@/utilities/types/registryItem";

type GetSuggestedProductsArgs = {
  allProducts: ProductType[] | undefined;
  userRegistryProducts: RegistryItemType[];
  preferredCategories: number[] | undefined;
};

export function getSuggestedProducts({
  allProducts,
  userRegistryProducts,
  preferredCategories,
}: GetSuggestedProductsArgs): ProductType[] {
  if (!allProducts) return [];

  const productTypeCounts = userRegistryProducts.reduce<Record<number, number>>(
    (acc, item) => {
      const type = item.product?.category ?? 0;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },
    {}
  );

  const weightedProducts = allProducts
    .filter((product) => {
      const productCategory = product.category;

      const isInPreferredCategory =
        preferredCategories == null || preferredCategories.length === 0
          ? true
          : productCategory != null &&
            preferredCategories.includes(productCategory);

      const isAlreadyRegistered = userRegistryProducts.some(
        (regItem) => regItem.product_id === product.id
      );

      return isInPreferredCategory && !isAlreadyRegistered;
    })
    .map((product) => {
      const countInRegistry = productTypeCounts[product.category!] || 0;
      const weight = 10 - countInRegistry;
      return { product, weight };
    });

  const shuffleArray = (array: ProductType[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const groupedAndShuffled = weightedProducts.reduce<
    Record<number, ProductType[]>
  >((acc, item) => {
    acc[item.weight] = acc[item.weight] || [];
    acc[item.weight].push(item.product);
    return acc;
  }, {});

  const reshuffledSuggestions = Object.entries(groupedAndShuffled)
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .flatMap(([_, products]) => shuffleArray(products));

  return reshuffledSuggestions;
}
