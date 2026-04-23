import React from "react";
import { FilterProvider } from "@/context/Search/FilterProvider";
import ShopPageWrapped from "@/pageComponents/ShopPage/ShopPageWrapped";
import type { ProductType } from "@/utilities/types/product";
import { useDialog } from "@/hooks/useDialog";
import ProductDetailDialog from "@/pageComponents/Dashboard/BuildYourRegistry/ProductDetailDialog";
import useCreateRegistryItem from "@/hooks/registry-item/useCreateRegistryItem";
import { toast } from "sonner";
import type { RegistryItemsStatusType } from "@/utilities/types/registryItem";
import { useUserStore } from "@/store";
import useDeleteRegistryItem from "@/hooks/registry-item/useDeleteRegistryItem";
import AddProductDialog from "@/pageComponents/Dashboard/BuildYourRegistry/AddProductDialog";
import useGetRegistryItemByRegistryID from "@/hooks/registry-item/useGetRegistryItemsByRegistryID";

function ExplorePage() {
  const user = useUserStore(React.useCallback((state) => state, []));
  const [selectedProduct, setSelectedProdct] =
    React.useState<ProductType | null>(null);

  const { mutateAsync: createRegistryItem, isPending: isCreating } =
    useCreateRegistryItem();
  const { mutateAsync: deleteRegistryItem, isPending: isDeleting } =
    useDeleteRegistryItem();
  const { data: registryItems } = useGetRegistryItemByRegistryID(
    user.giftWellID!
  );

  const {
    open: isProductDialogOpen,
    openDialog: openproductDetailDialog,
    closeDialog: closeProductDialog,
  } = useDialog(false);
  const {
    open: isAddProductDialogOpen,
    openDialog: openAddProductDialog,
    closeDialog: closeAddProductDialog,
  } = useDialog(false);
  const handleSelectedProduct = (product: ProductType) => {
    setSelectedProdct(product);
    openproductDetailDialog();
  };

  const nextOrderIndex =
    Math.max(
      0,
      ...(registryItems?.map((item) => item.order_index ?? 0) ?? [])
    ) + 1;

  const handleAddToList = async () => {
    if (selectedProduct) {
      try {
        const registryItemData = {
          giftwell_id: user.giftWellID!,
          product_id: Number(selectedProduct.id),
          status: "listed" as RegistryItemsStatusType,
          registry_product: {
            ...selectedProduct,
          },
          quantity: 1,
          order_index: nextOrderIndex,
        };

        await createRegistryItem({ registryItemData });
        setSelectedProdct(null);
        toast.success("Registry item added successfully");
      } catch (error) {
        toast.error("Failed to add registry item");
      }
    }
    closeProductDialog();
  };

  const handleRemoveFromList = async () => {
    if (selectedProduct) {
      const productToRemove = registryItems?.find(
        (item) => item.product_id === selectedProduct.id
      );
      await deleteRegistryItem(productToRemove?.id!);
    }

    closeProductDialog();
  };

  const handleEdit = (id: number) => {
    const filteredItems = registryItems?.find((item) => item.product_id === id);

    setSelectedProdct((prev) => ({
      ...prev,
      ...filteredItems?.registry_product!,
    }));
    closeProductDialog();
    openAddProductDialog();
  };

  const handleCloseAddProductDialog = () => {
    setSelectedProdct(null);
    closeAddProductDialog();
  };

  return (
    <>
      <div className=" mx-4 my-2 rounded-sm px-6 py-2 bg-white ">
        <FilterProvider>
          <ShopPageWrapped handleSelectedProduct={handleSelectedProduct} />
        </FilterProvider>
      </div>

      {isProductDialogOpen && (
        <ProductDetailDialog
          open={isProductDialogOpen}
          closeDialog={closeProductDialog}
          onAddToList={handleAddToList}
          onRemoveFromList={handleRemoveFromList}
          onEdit={handleEdit}
          product={selectedProduct}
          isLoading={isCreating || isDeleting}
          productType="Suggestion"
        />
      )}

      {isAddProductDialogOpen && (
        <AddProductDialog
          open={isAddProductDialogOpen}
          closeDialog={handleCloseAddProductDialog}
          selectedProduct={selectedProduct}
          giftWellID={user.giftWellID!}
          registryItemOrderIndex={nextOrderIndex}
        />
      )}
    </>
  );
}

export default ExplorePage;
