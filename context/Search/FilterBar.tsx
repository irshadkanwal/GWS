import React, { ChangeEvent, useEffect, useState } from "react";
import { SearchInput } from "@/components/ui/input";
import { useFilterContext } from "./FilterProvider";
import CategoriesDropdown from "./CategoriesDrowpdown";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useRouter } from "next/router";

type FilterProps = {
  children: React.ReactNode;
};

function FilterBar({ children }: FilterProps) {
  const [fieldSearch, setFieldSearch] = useState("");
  const { setSearch, setSortOption, sortOption, itemsCount } =
    useFilterContext();

  const router = useRouter();

  const isShopPage = router.pathname === "/shop";

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(fieldSearch);
    }, 500);

    return () => clearTimeout(handler);
  }, [fieldSearch]);

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldSearch(e.target.value);
  };

  return (
    <div>
      {/* Main layout - sidebar and content */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left sidebar with filters */}
        {isShopPage && (
          <div className="w-[100%] md:w-64">
            <div className="space-y-4">
              {/* Categories Filter */}
              <CategoriesDropdown />
            </div>
          </div>
        )}

        {/* Main content area - products will be passed as children */}
        <main className="flex-1">
          {/* Top search bar */}
          <div className="mb-6">
            <div className="relative">
              <SearchInput
                placeholder="Search by name, categories, gifts, treatment..."
                className="w-full"
                onChange={onChangeSearch}
              />
            </div>
          </div>
          {/* Sort controls */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="text-sm text-[#505152]">
              + {itemsCount} product{itemsCount === 1 ? "" : "s"} found
            </div>
            <div className="flex items-center gap-2">
              <div>
                <span className="text-sm">Ordered By:</span>
              </div>
              <div>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select something" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectGroup>
                      <SelectLabel>Sort By</SelectLabel>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="lowToHigh">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="highToLow">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* <Select className="px-2 py-1 text-sm border rounded-md"> */}
            </div>
          </div>

          {/* Products grid - children will be rendered here */}
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}

export default FilterBar;

// {filterRow && <div className="mt-4">{filterRow}</div>}
