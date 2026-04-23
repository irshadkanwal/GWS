import React from "react";

type FilterContextType = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  filter: number[];
  setFilter: React.Dispatch<React.SetStateAction<number[]>>;
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
  setItemsCount: React.Dispatch<React.SetStateAction<number>>;
  itemsCount: number;
};

export const FilterContext = React.createContext<FilterContextType | undefined>(
  undefined
);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState<number[]>([]);
  const [sortOption, setSortOption] = React.useState("relevance");
  const [itemsCount, setItemsCount] = React.useState<number>(0);

  return (
    <FilterContext.Provider
      value={{
        search,
        setSearch,
        filter,
        setFilter,
        sortOption,
        setSortOption,
        setItemsCount,
        itemsCount,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = React.useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};
