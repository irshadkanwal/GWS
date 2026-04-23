import React from "react";
import { z } from "zod";
import { CircleDollarSign } from "lucide-react";
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
import { useS3Upload } from "@/hooks/s3-bucket/useS3Upload";
import { useUserStore } from "@/store";
import type { ProductType } from "@/utilities/types/product";
import { toast } from "sonner";
import { BUCKET_FOLDER_NAME } from "@/constants/constants";
import useAddNewProduct from "@/hooks/product/useAddProduct";
import useGetAllProductTypes from "@/hooks/product-types/useGetAllProductTypes";
import FormSelectField from "@/components/form/Fields/FormSelectField";
import useUpdateProductByID from "@/hooks/product/useUpdateProduct";

type AddProductProps = {
  open: boolean;
  closeDialog: () => void;
  selectedProduct?: ProductType | null;
  affiliateLink?: string;
};

function AddProductFormModal({
  open,
  closeDialog,
  selectedProduct,
  affiliateLink,
}: AddProductProps) {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const { uploadFile } = useS3Upload();
  const user = useUserStore(React.useCallback((state) => state, []));
  const { mutateAsync: addNewProduct } = useAddNewProduct();
  const { mutateAsync: updateProduct } = useUpdateProductByID();
  const { data: productTypes = [] } = useGetAllProductTypes();

  const isExistingProduct = selectedProduct && !affiliateLink;

  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const productPrice =
    selectedProduct?.price !== undefined && selectedProduct?.price !== null
      ? String(selectedProduct?.price)
      : "0";

  const initialValues = {
    productName: selectedProduct?.name || "",
    price: productPrice,
    description: selectedProduct?.description || "",
    category: String(selectedProduct?.category) || "",
    imageUploadedUrl: selectedProduct?.image_url || "",
  };

  const validationSchema = z.object({
    productName: z.string().min(1, "Product name is required"),
    price: z.string().min(1, "Price is required"),
    category: z.string().nullable(),
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
          type: BUCKET_FOLDER_NAME.PRODUCTS,
        });
      } catch (e) {
        toast.error(`Error uploading file:${e}`);
        return;
      }
    }

    const price = values.price ? Number(values.price) : selectedProduct?.price;
    const category = values.category ? Number(values.category) : null;

    const productToAdd = {
      name: values.productName,
      description: values.description,
      price,
      category,
      image_url: imageUrl,
      affiliate_link: selectedProduct?.affiliate_link,
      is_affiliated: !!selectedProduct?.is_affiliated,
    };
    if (!isExistingProduct) {
      await addNewProduct({ newProduct: productToAdd });
    } else {
      await updateProduct({
        productID: selectedProduct.id,
        productDetails: { id: selectedProduct.id, ...productToAdd },
      });
    }
    setPreviewUrl(null);
    closeDialog();
  };

  const categoryOptions = productTypes?.map((type) => ({
    label: type.name,
    value: type.id,
  }));

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="bg-white md:min-w-[625px] max-h-[90vh] overflow-auto w-11/12 rounded-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Product Details
          </DialogTitle>
        </DialogHeader>

        <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          className="gap-0"
        >
          <FormTextField name="productName" label="Product Name" />
          <FormTextField
            startIcon={{ icon: CircleDollarSign }}
            name="price"
            label="Price"
            placeholder="0.00"
            className="col-span-12 md:col-span-6"
          />
          <FormSelectField
            className="col-span-12 md:col-span-6"
            name="category"
            label="Category"
            options={categoryOptions}
          />

          <FormTextareaField
            name="description"
            label="Description"
            placeholder="Example: ('Large size, blue color')"
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
          />
          <FormFooter
            renderBackButton={false}
            submitButtonText={
              isExistingProduct ? "Update Product" : "Add Product"
            }
            className="col-span-12 !w-full"
            nextButtonType="submit"
          />
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddProductFormModal;
