import React from "react";
import type { RegistryItemType } from "@/utilities/types/registryItem";
import useGetAllServices from "@/hooks/services/useGetAllServices";
import useGetRegistryItemByRegistryID from "@/hooks/registry-item/useGetRegistryItemsByRegistryID";
import useUpdateRegistryItems from "@/hooks/registry-item/useUpdateRegistryItems";
import { toast } from "sonner";
import RegistryItemList from "@/pageComponents/Dashboard/BuildYourRegistry/RegistryItemList";
import ProductCard from "@/pageComponents/ShopPage/ProductCard";
import GWSLoader from "@/components/shared/gws-loader";
import useGetAllProductTypes from "./product-types/useGetAllProductTypes";

export type TabType = {
  value: string;
  title: string;
  description: string;
  content: React.ReactNode;
};

type BuildRegistryProps = {
  giftWellID: number;
  actions?: (item: RegistryItemType) => React.ReactNode;
  renderCheckbox?: boolean;
  handleReorder?: (newData: RegistryItemType[]) => void;
  isListView?: boolean;
};

function useBuildRegistryTabs({
  giftWellID,
  actions,
  renderCheckbox,
  handleReorder,
  isListView = true,
}: BuildRegistryProps) {
  const { data: registryItems, isLoading } = useGetRegistryItemByRegistryID(
    giftWellID || 0
  );

  const { data: services = [] } = useGetAllServices();
  const { data: productTypes = [] } = useGetAllProductTypes();
  const { mutateAsync: updateRegistryItem } = useUpdateRegistryItems();

  const expandedRegistryItems = React.useMemo(() => {
    return (
      registryItems?.flatMap((item) =>
        Array.from({ length: item.quantity || 1 }, () => item)
      ) || []
    );
  }, [registryItems]);

  const listedItems = React.useMemo(
    () =>
      expandedRegistryItems?.filter((item) => item.status === "listed") || [],
    [expandedRegistryItems]
  );

  const orderedRegistryItems = React.useMemo(
    () =>
      [...listedItems].sort(
        (a, b) => (a.order_index || 0) - (b.order_index || 0)
      ),
    [listedItems]
  );

  const handleUpdateItem = async (item: RegistryItemType) => {
    try {
      await updateRegistryItem({
        id: item.id,
        registryItem: {
          ...item,
          status: "purchased",
          is_claimed: true,
          quantity: 1,
          updated_at: new Date().toISOString(),
        },
      });
      toast.success("Item marked as purchased.");
    } catch (error) {
      toast.error("Failed to update registry item.");
    }
  };

  const renderContent = (items: RegistryItemType[]) => {
    if (isLoading) {
      return <GWSLoader />;
    }
    if (isListView) {
      return (
        <RegistryItemList
          registryItem={items}
          handleUpdateItem={handleUpdateItem}
          actions={actions}
          renderCheckbox={renderCheckbox}
          handleReorder={handleReorder}
        />
      );
    }

    return (
      <div className="my-2">
        <div className="flex justify-center md:justify-start flex-wrap gap-4 ">
          {items.map((item) =>
            item.registry_product ? (
              <ProductCard key={item.id} product={item.registry_product} />
            ) : null
          )}
        </div>
      </div>
    );
  };

  const specialTabs: TabType[] = [
    {
      value: "all",
      title: "All",
      description: "All registry items across all categories.",
      content: renderContent(listedItems),
    },
    {
      value: "most-wanted",
      title: "Most Wanted",
      description: "Items marked as high priority.",
      content: renderContent(orderedRegistryItems),
    },
  ];

  const serviceTabs: TabType[] = services.map((service) => {
    // const matchedItems = listedItems.filter(
    //   (item) => item.registry_product?.category === service.id
    // );

    return {
      value: service.name.toLowerCase().replace(/\s+/g, "-"),
      title: service.name,
      description: service.description,
      content: renderContent([]),
    };
  });

  return [...specialTabs, ...serviceTabs];
}

export default useBuildRegistryTabs;
