import React from "react";
import FilterBar from "@/context/Search/FilterBar";
import ShopProducts from "./ShopProducts";
import type { ProductType } from "@/utilities/types/product";

function ShopPageWrapped({
  handleSelectedProduct = () => {},
}: {
  handleSelectedProduct?: (product: ProductType) => void;
}) {
  return (
    <div className="pt-12">
      <FilterBar>
        <ShopProducts handleSelectedProduct={handleSelectedProduct} />
      </FilterBar>
    </div>
  );
}

export default ShopPageWrapped;
