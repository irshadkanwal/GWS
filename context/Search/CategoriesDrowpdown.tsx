"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useFilterContext } from "./FilterProvider";
import useGetAllProductTypes from "@/hooks/product-types/useGetAllProductTypes";
import useGetAllServices from "@/hooks/services/useGetAllServices";

export default function CategoriesDropdown() {
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [viewAll, setViewAll] = useState(false);
  const { setFilter } = useFilterContext();
  const { data: productTypes } = useGetAllProductTypes();
  const { data: allServices } = useGetAllServices();

  const categoryGroups = [
    {
      label: "Products",
      categories: productTypes?.map((productType) => ({
        name: productType.name,
        category: productType.id,
      })),
    },
    {
      label: "Services/Help",
      categories: allServices?.map((service) => ({
        name: service.name,
        category: service.id,
      })),
    },
  ];

  const handleCheckboxChanged = (
    category: number,
    checked: boolean | string
  ) => {
    if (checked === true) {
      setFilter((prev) => [...prev, category]);
    } else {
      setFilter((prev) => prev.filter((item) => item !== category));
    }
  };

  const groupsToRender = categoryGroups.filter(
    (group) => group.label === "Products"
  );

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="relative">
        <button
          onClick={() => setCategoriesOpen(!categoriesOpen)}
          className="flex items-center justify-between w-full p-4 font-medium text-left"
        >
          Categories
          <ChevronDown
            className={cn(
              "h-5 w-5 transition-transform",
              categoriesOpen ? "" : "-rotate-90"
            )}
          />
        </button>
      </div>

      {categoriesOpen && (
        <div className="px-4 pb-4 space-y-4">
          {groupsToRender.map((group) => (
            <div key={group.label} className="space-y-2">
              <span className="text-sm font-medium text-gray-700">
                {group.label}
              </span>
              {group.categories?.map((category) => (
                <div key={category.name} className="flex items-center gap-2">
                  <Checkbox
                    id={`category-${category.name}`}
                    onCheckedChange={(checked) =>
                      handleCheckboxChanged(category.category, checked)
                    }
                  />
                  <label
                    htmlFor={`category-${category.name}`}
                    className="text-sm text-gray-700"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          ))}

          <div className="pt-2">
            <button
              type="button"
              className="text-sm text-[#597FA6] "
              onClick={() => setViewAll(!viewAll)}
            >
              {viewAll ? "View less" : "View all"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
