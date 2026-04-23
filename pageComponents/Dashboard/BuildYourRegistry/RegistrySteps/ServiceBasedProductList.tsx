import React from "react";
import { GridItem } from "@/components/ui/Grid";
import { useWindowSize } from "@/hooks/useWindowSize";
import ProductCard from "@/pageComponents/ShopPage/ProductCard";
import { useFormContext } from "react-hook-form";
import useGetAllProducts from "@/hooks/product/useGetAllProducts";
import GWSLoader from "@/components/shared/gws-loader";
import type { ProductType } from "@/utilities/types/product";
import { useDialog } from "@/hooks/useDialog";
import ProductDetailDialog from "../ProductDetailDialog";
import { useUserStore } from "@/store";
import useGetRegistryServiceByRegistryID from "@/hooks/registry-services/useGetRegistryServiceByRegistryID";
import useCreateRegistryService from "@/hooks/registry-services/useCreateRegistryService";
import { toast } from "sonner";
import useDeleteRegistryService from "@/hooks/registry-services/useDeleteRegistryService";
import Typography from "@/components/ui/typography";
import type { RegistryServiceType } from "@/utilities/types/registry-service";
import CustomSeparator from "@/components/shared/custom-separator";

function ServiceBasedProductList() {
  const { data: allProducts, isLoading } = useGetAllProducts();
  const user = useUserStore(React.useCallback((state) => state, []));
  const { data: registryServices } = useGetRegistryServiceByRegistryID(
    user.giftWellID || 0
  );
  const { mutateAsync: createRegistryService, isPending: isCreating } =
    useCreateRegistryService();
  const { mutateAsync: deleteRegistryService, isPending: isDeleting } =
    useDeleteRegistryService();
  const [selectedProduct, setSelectedProduct] =
    React.useState<ProductType | null>(null);
  const [productType, setProductType] = React.useState<string>("");

  const {
    open: isProductDetailDialogOpen,
    openDialog: openProductDetailDialog,
    closeDialog: closeProductDetailDialog,
  } = useDialog(false);

  const { width } = useWindowSize();
  const isMobile = width < 768;

  const { watch } = useFormContext();
  const userServices = watch("availableServices");

  const userProducts = React.useMemo(
    () =>
      allProducts?.filter((product) => {
        if (!product.category) return product;
        return userServices?.includes(String(product.category));
      }),
    [userServices, allProducts]
  );

  if (isLoading) {
    return (
      <GridItem className="flex items-center justify-center">
        <GWSLoader />
      </GridItem>
    );
  }

  const nextOrderIndex =
    Math.max(
      0,
      ...(registryServices?.map((item) => item.order_index ?? 0) ?? [])
    ) + 1;

  const handleAddToList = async () => {
    if (selectedProduct) {
      try {
        const registryServiceData = {
          giftwell_id: user.giftWellID!,
          service_id: Number(selectedProduct.id),
          status: "listed" as const,
          registry_service: {
            ...selectedProduct,
          },
          order_index: nextOrderIndex,
        };

        await createRegistryService({ registryServiceData });
        setSelectedProduct(null);
      } catch (error) {
        toast.error("Failed to add registry item");
      }
    }
    closeProductDetailDialog();
  };

  const handleRemoveFromList = async () => {
    if (selectedProduct) {
      const productToRemove = registryServices?.find(
        (item) => item.registry_service?.id === selectedProduct.id
      );
      await deleteRegistryService(productToRemove?.id!);
    }

    closeProductDetailDialog();
  };

  const handleWishProduct = (
    registryService: RegistryServiceType,
    registryProduct: ProductType,
    ProductType: "Wish" | "Suggestion"
  ) => {
    setProductType(ProductType);
    if (registryService && registryProduct) {
      setSelectedProduct(registryProduct);
    }

    openProductDetailDialog();
  };

  const handleSuggestionClick = (
    product: ProductType,
    ProductType: "Wish" | "Suggestion"
  ) => {
    setProductType(ProductType);
    setSelectedProduct(product);
    openProductDetailDialog();
  };

  return (
    <>
      <GridItem>
        <Typography size="md" className=" text-[#262626]">
          My Services
        </Typography>
      </GridItem>

      {registryServices?.length === 0 ? (
        <GridItem className={"flex items-center justify-center"}>
          <Typography size="md" className=" text-[#A3A3A3]">
            Add Products to your wish list now
          </Typography>
        </GridItem>
      ) : (
        registryServices?.map((items, index) => (
          <GridItem
            key={index}
            className={`col-span-12 md:col-span-4 xl:col-span-3  ${
              isMobile ? "flex items-center justify-center" : ""
            }`}
          >
            <ProductCard
              product={items.registry_service}
              handleCardClick={() =>
                handleWishProduct(items, items.registry_service!, "Wish")
              }
              className="min-w-[200px]"
              imageStyles="shadow-sm hover:shadow-md"
            />
          </GridItem>
        ))
      )}

      <CustomSeparator className="my-0" />

      <GridItem>
        <Typography size="md" className=" text-[#262626]">
          Suggested Services
        </Typography>
      </GridItem>

      {userProducts?.map((product, index) => (
        <GridItem
          key={index}
          className={`col-span-12 md:col-span-4 xl:col-span-3  ${
            isMobile ? "flex items-center justify-center" : ""
          }`}
        >
          <ProductCard
            product={product}
            handleCardClick={() => handleSuggestionClick(product, "Suggestion")}
            className="min-w-[200px]"
            imageStyles="shadow-sm hover:shadow-md"
          />
        </GridItem>
      ))}

      {/* {userProducts?.map((product, index) => (
        <GridItem
          key={index}
          className={`col-span-12 md:col-span-4 xl:col-span-3  ${
            isMobile ? "flex items-center justify-center" : ""
          }`}
        >
          <ProductCard
            product={product}
            className="min-w-[200px]"
            imageStyles="shadow-sm hover:shadow-md"
            handleCardClick={handleProductClick}
          />
        </GridItem>
      ))} */}

      <ProductDetailDialog
        open={isProductDetailDialogOpen}
        closeDialog={closeProductDetailDialog}
        onAddToList={handleAddToList}
        onRemoveFromList={handleRemoveFromList}
        product={selectedProduct}
        productType={productType}
        isLoading={isCreating || isDeleting}
      />
    </>
  );
}

export default ServiceBasedProductList;
