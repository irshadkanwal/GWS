import React from "react";
import { FilterProvider } from "@/context/Search/FilterProvider";
import ShopPageWrapped from "./ShopPageWrapped";

function FilterSearchLayout() {
  return (
    <div className="px-6 sm:px-12 lg:px-20">
      <FilterProvider>
        <ShopPageWrapped />
      </FilterProvider>
    </div>
  );
}

export default FilterSearchLayout;
