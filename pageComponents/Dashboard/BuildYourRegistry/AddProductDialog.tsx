import React from "react";
import { z } from "zod";
import { CircleDollarSign } from "lucide-react";
import FormSelectField from "@/components/form/Fields/FormSelectField";
import FormTextareaField from "@/components/form/Fields/FormTextareaField";
import FormTextField from "@/components/form/Fields/FormTextField";
import Form from "@/components/form/Form";
import FormFooter from "@/components/form/FormFooter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useCreateRegistryItem from "@/hooks/registry-item/useCreateRegistryItem";
import { useS3Upload } from "@/hooks/s3-bucket/useS3Upload";
import useAddNewProduct from "@/hooks/product/useAddProduct";
import useUpdateRegistryItems from "@/hooks/registry-item/useUpdateRegistryItems";
import type {
  RegistryItemsStatusType,
  RegistryItemType,
} from "@/utilities/types/registryItem";
import { useUserStore } from "@/store";
import type { ProductType } from "@/utilities/types/product";
import { toast } from "sonner";
import { BUCKET_FOLDER_NAME } from "@/constants/constants";

type AddProductProps = {
  open: boolean;
  closeDialog: () => void;
  affiliateLink?: string;
  selectedProduct?: ProductType | null;
  selectedRegistryItem?: RegistryItemType | null;
  giftWellID?: number;
  registryItemOrderIndex?: number;
  productType?: string;
};

function AddProductDialog({
  open,
  closeDialog,
  affiliateLink,
  selectedProduct,
  giftWellID,
  registryItemOrderIndex,
  selectedRegistryItem,
  productType,
}: AddProductProps) {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const { mutateAsync: createRegistryItem } = useCreateRegistryItem();
  const { mutateAsync: updateRegistryItem } = useUpdateRegistryItems();
  const { uploadFile } = useS3Upload();
  const user = useUserStore(React.useCallback((state) => state, []));

  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
  const { mutateAsync: addNewProduct } = useAddNewProduct();

  const selectedItemQuantity =
    selectedRegistryItem?.quantity !== undefined &&
    selectedRegistryItem?.quantity !== null
      ? String(selectedRegistryItem.quantity)
      : "1";

  const initialValues = {
    productName: selectedProduct?.name || "",
    price: String(selectedProduct?.price) || "",
    quantity: selectedItemQuantity,
    description: selectedProduct?.description || "",
    imageUploadedUrl: selectedProduct?.image_url || "",
  };

  const validationSchema = z.object({
    productName: z.string().min(1, "Product name is required"),
    price: z.string().min(1, "Price is required"),
    quantity: z.string().min(1, "Quantity is required"),
    description: z.string().min(1, "Description is required"),
    imageUploadedUrl: z.union([z.instanceof(File), z.string().url().min(1)]),
  });

  type FormValues = z.infer<typeof validationSchema>;

  const handleSubmit = async (values: FormValues) => {
    let imageUrl: string = selectedProduct?.image_url || "";

    if (values.imageUploadedUrl instanceof File) {
      try {
        imageUrl = await uploadFile({
          file: values.imageUploadedUrl,
          userId: user.id || 0,
          type: BUCKET_FOLDER_NAME.REGISTRY,
        });
      } catch (e) {
        toast.error(`Error uploading file:${e}`);
        return;
      }
    }

    const newProduct = {
      name: values.productName,
      description: values.description,
      price: Number(values.price),
      category: selectedProduct?.category,
      image_url: imageUrl,
      is_affiliated: true,
    };

    if (productType === "Wish") {
      try {
        const registryItem = {
          id: selectedRegistryItem?.id!,
          giftwell_id: giftWellID!,
          product_id: Number(selectedProduct?.id),
          status: selectedRegistryItem?.status as RegistryItemsStatusType,
          registry_product: {
            ...newProduct,
            affiliate_link: selectedProduct?.affiliate_link,
            id: selectedProduct?.id!,
          },
          quantity: Number(values.quantity),
          order_index: registryItemOrderIndex,
        };

        await updateRegistryItem({
          id: selectedRegistryItem?.id!,
          registryItem: registryItem,
        });
        closeDialog();
        toast.success("Registry Item updated.");
        return;
      } catch (error) {
        toast.error(`Update failed: ${error}`);
        return;
      }
    }

    if (affiliateLink) {
      const response = await addNewProduct({
        newProduct: { ...newProduct, affiliate_link: affiliateLink },
      });

      if (response && response.id) {
        const createPayloads = Array.from(
          { length: Number(values.quantity) },
          (_, index) => ({
            giftwell_id: giftWellID!,
            product_id: Number(response?.id),
            status: "listed" as RegistryItemsStatusType,
            registry_product: {
              ...newProduct,
              affiliate_link: response.affiliate_link,
              id: response?.id!,
            },
            quantity: 1,
            order_index: registryItemOrderIndex! + index,
          })
        );

        await Promise.all(
          createPayloads.map((registryItemData) =>
            createRegistryItem({ registryItemData })
          )
        );
        toast.success("Registry item added successfully");
      }
    } else {
      const createPayloads = Array.from(
        { length: Number(values.quantity) },
        (_, index) => ({
          giftwell_id: giftWellID!,
          product_id: Number(selectedProduct?.id),
          status: "listed" as RegistryItemsStatusType,
          registry_product: {
            ...newProduct,
            affiliate_link: selectedProduct?.affiliate_link,
            id: selectedProduct?.id!,
          },
          quantity: 1,
          order_index: registryItemOrderIndex! + index,
        })
      );

      await Promise.all(
        createPayloads.map((registryItemData) =>
          createRegistryItem({ registryItemData })
        )
      );
      toast.success("Registry item added successfully");
    }

    closeDialog();
  };

  const isFormFieldDisabled =
    productType === "Wish" || productType === "Suggestion";

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="bg-white md:min-w-[625px] max-h-[90vh] overflow-auto w-11/12 rounded-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Registry Item Details
          </DialogTitle>
        </DialogHeader>

        <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          className="gap-0"
        >
          <FormTextField
            name="productName"
            label="Product Name"
            readOnly={isFormFieldDisabled}
          />
          <FormTextField
            className="col-span-12 md:col-span-6"
            startIcon={{ icon: CircleDollarSign }}
            name="price"
            label="Price"
            placeholder="0.00"
            readOnly={isFormFieldDisabled}
          />
          <FormSelectField
            className="col-span-12 md:col-span-6"
            readonly={productType === "Wish"}
            name="quantity"
            label="Quantity"
            placeholder="Select quantity"
            options={[
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
              { label: "5", value: "5" },
              { label: "6", value: "6" },
            ]}
          />
          <FormTextareaField
            name="description"
            label="Description"
            placeholder="Example: ('Large size, blue color')"
            readonly={isFormFieldDisabled}
          />
          <FormTextField
            className="col-span-12 md:col-span-6"
            type="file"
            accept="image/*"
            name="imageUploadedUrl"
            label=""
            previewImage={previewUrl || selectedProduct?.image_url || ""}
            onFileChange={(file: File) => {
              if (file && file.type.startsWith("image/")) {
                const preview = URL.createObjectURL(file);
                setPreviewUrl(preview);
              }
            }}
            readOnly={isFormFieldDisabled}
          />
          <FormFooter
            renderBackButton={false}
            submitButtonText={
              productType === "Wish"
                ? "Update my Care Registry item"
                : "Add item to my Care Registry"
            }
            className="col-span-12 !w-full"
            nextButtonType="submit"
          />
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddProductDialog;
