import React from "react";
import ProductCard from "./ProductCard";
import { useFilterContext } from "@/context/Search/FilterProvider";
import { sortNumbers } from "@/utilities/helpers/sort";
import useGetAllProducts from "@/hooks/product/useGetAllProducts";
import type { ProductType } from "@/utilities/types/product";
import GWSLoader from "@/components/shared/gws-loader";

function ShopProducts({
  handleSelectedProduct = () => {},
}: {
  handleSelectedProduct?: (product: ProductType) => void;
}) {
  const { data: allProducts, isLoading } = useGetAllProducts();
  const { search, filter, sortOption, setItemsCount } = useFilterContext();

  const filteredItems = allProducts
    ?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .filter(
      (item) => filter.length === 0 || filter.includes(item.category || 0)
    );

  const getSortedItems = (
    items: ProductType[],
    sortOption: string
  ): ProductType[] => {
    switch (sortOption) {
      case "lowToHigh":
        return sortNumbers(items, "price", "asc");
      case "highToLow":
        return sortNumbers(items, "price", "desc");
      case "newest":
        return items;
      default:
        return items;
    }
  };

  const sortedFilterItems = getSortedItems(filteredItems || [], sortOption);

  React.useEffect(() => {
    setItemsCount(sortedFilterItems.length);
  }, [sortedFilterItems]);

  if (isLoading) {
    return <GWSLoader loadingText="Loading products..." />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {sortedFilterItems.map((product, index) => (
        <div className="p-2 px-0" key={index}>
          <ProductCard
            product={product}
            imageStyles="w-full"
            handleCardClick={handleSelectedProduct}
          />
        </div>
      ))}
    </div>
  );
}

export default ShopProducts;
