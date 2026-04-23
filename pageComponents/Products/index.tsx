import React from "react";
import DataTable from "@/components/ui/datatable";
import { Grid, GridItem } from "@/components/ui/Grid";
import Typography from "@/components/ui/typography";
import useGetAllProductTypes from "@/hooks/product-types/useGetAllProductTypes";
import useGetAllProducts from "@/hooks/product/useGetAllProducts";
import type { ProductType } from "@/utilities/types/product";
import type { ColumnDef } from "@tanstack/react-table";
import {
  CircleCheck,
  Filter,
  PencilIcon,
  PlusIcon,
  Trash2,
} from "lucide-react";
import EllipsisTypography from "../common/EllipsisTypography";
import Image from "next/image";
import SummaryCardsSkeleton from "../Users/SummaryCardsSkeleton";
import { SummaryCard } from "../Users/SummaryCards";
import { SearchInput } from "../Users/SearchInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TextField from "@/components/fields/text-field";
import { isValidUrl } from "@/utilities/helpers/customValidations";
import useFetchProductMeta from "@/hooks/product-meta/useFetchProductMeta";
import { useDialog } from "@/hooks/useDialog";
import AddProductFormModal from "./AddProductFormModal";
import ConfirmationDialog from "@/components/shared/confirmation-dialog";
import useDeleteProduct from "@/hooks/product/useDeleteProduct";

function AdminProductPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const [linkError, setLinkError] = React.useState("");
  const [productLink, setProductLink] = React.useState<string>("");
  const [selectedProduct, setSelectedProduct] =
    React.useState<ProductType | null>(null);
  const { data: allProducts, isLoading } = useGetAllProducts();
  const { mutateAsync: deleteProduct } = useDeleteProduct();
  const { data: allProductTypes, isLoading: isLoadingProductTypes } =
    useGetAllProductTypes();
  const { mutateAsync: fetchProductMeta, isPending } = useFetchProductMeta();

  const {
    open: isOpen,
    openDialog: openModal,
    closeDialog: closeModal,
  } = useDialog(false);

  const {
    open: isDeleteDialogOpen,
    openDialog: openDeleteDialog,
    closeDialog: closeDeleteDialog,
  } = useDialog(false);

  const categoryMap = React.useMemo(() => {
    const map: Record<number, string> = {};
    allProductTypes?.forEach((type) => {
      if (type.id) map[type.id] = type.name;
    });
    return map;
  }, [allProductTypes]);

  const filteredProducts = React.useMemo(() => {
    if (!allProducts) return [];

    return allProducts.filter((product) => {
      const fullName = product.name.toLowerCase();

      const matchesSearch = fullName.includes(searchQuery.toLowerCase());

      const matchesRole =
        categoryFilter === "all" || product.category === Number(categoryFilter);

      return matchesSearch && matchesRole;
    });
  }, [allProducts, searchQuery, categoryFilter]);

  const categoryCounts = React.useMemo(() => {
    const counts: Record<number, number> = {};

    allProducts?.forEach((product) => {
      const categoryId = product.category;
      if (categoryId != null) {
        counts[categoryId] = (counts[categoryId] || 0) + 1;
      }
    });

    return counts;
  }, [allProducts]);

  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-3 w-60">
            <div className="max-w-10 max-h-10 overflow-hidden rounded-md">
              <Image
                src={row.original?.image_url ?? ""}
                alt="product image"
                width={300}
                height={300}
                className="object-cover w-full h-full rounded-sm"
              />
            </div>
            <EllipsisTypography
              title={row.original?.name ?? ""}
              className="text-sm line-clamp-1"
            >
              {row.original?.name}
            </EllipsisTypography>
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        return (
          <Typography
            size="xs"
            className="text-[#828383]"
          >{`$${row.original.price}`}</Typography>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const categoryId = row.original.category;
        const categoryName = categoryId ? categoryMap[categoryId] : null;
        return categoryName ? (
          <Typography size="xs" className="text-[#828383]">
            {categoryName}
          </Typography>
        ) : (
          <Typography size="xs" className="text-[#828383]">
            General
          </Typography>
        );
      },
    },
    {
      accessorKey: "affiliate_link",
      header: "Affiliate Link",
      cell: ({ row }) => {
        return (
          <div className="max-w-48">
            <Link
              href={row.original.affiliate_link || ""}
              target="_blank"
              className="flex items-center gap-1"
            >
              <CircleCheck size={20} color="#fff" fill="lightGreen" />
              <EllipsisTypography className="text-xs text-[#597FA6] max-w-40">
                {row.original.affiliate_link || ""}
              </EllipsisTypography>
            </Link>
          </div>
        );
      },
    },
    {
      accessorKey: "is_affiliated",
      header: "Is Affiliated",
      cell: ({ row }) => {
        return (
          <Typography size="xs" className="text-[#828383]">
            {row.original.is_affiliated ? "Yes" : "No"}
          </Typography>
        );
      },
    },
    {
      accessorKey: "action",
      header: "",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedProduct(row.original);
                openModal();
              }}
            >
              <PencilIcon size={18} color="#385c80" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedProduct(row.original);
                openDeleteDialog();
              }}
            >
              <Trash2 size={20} color="red" />
            </Button>
          </div>
        );
      },
    },
  ];

  const handleChange = (value: string) => {
    setProductLink(value);

    if (!value || isValidUrl(value)) {
      setLinkError("");
    } else {
      setLinkError("Enter valid URL");
    }
  };

  const onNextClick = async () => {
    setSelectedProduct(null);

    const response = await fetchProductMeta({ productLink });

    if (response) {
      setSelectedProduct({
        id: Number(Date.now().toString()),
        name: response.title,
        image_url: response.image,
        price: Number(response.price),
        description: response.description,
        affiliate_link: productLink,
        is_affiliated: true,
        category: 2,
      });
    }
    if (!isPending) {
      openModal();
    }
  };

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id);
  };

  return (
    <Grid className="bg-white lg:m-6 mx-4 my-2 p-6 rounded-sm w-[calc(100vw-6)]">
      <GridItem className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Typography size="xl" className="font-bold text-[#050708]">
          Products
        </Typography>
      </GridItem>
      <GridItem className="flex items-center p-0 w-full gap-2">
        <div className="w-4/5">
          <TextField
            name="link"
            label="Paste a product link from anywhere on the web"
            placeholder="https://"
            renderFieldButton
            disableFieldButton={
              productLink === "" || isPending || !isValidUrl(productLink)
            }
            fieldButtonText={isPending ? "Fetching product..." : "Next"}
            onFieldButtonClick={onNextClick}
            value={productLink}
            onChange={(e) => handleChange(e.target.value)}
            error={linkError}
            className="p-0"
          />
        </div>

        <Button
          variant="outline"
          onClick={openModal}
          type="button"
          className="bg-[#385c80] text-white rounded-md hover:bg-transparent hover:text-[#385c80] hover:border-[#385c80] mt-2 w-1/5"
        >
          <PlusIcon size={20} className="mr-2" />
          Add Your Own Product
        </Button>
      </GridItem>

      {isLoading || isLoadingProductTypes ? (
        <SummaryCardsSkeleton cardCount={9} />
      ) : (
        <>
          <SummaryCard
            label="Total Products"
            count={allProducts?.length || 0}
            colorClass="text-[#385c80]"
          />
          {allProductTypes?.map((type) => (
            <SummaryCard
              key={type.id}
              label={type.name}
              count={categoryCounts[type.id] || 0}
              colorClass="text-green-600"
            />
          ))}

          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search Products"
          />

          <GridItem className="lg:col-span-4 px-0">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full">
                <Filter size={20} className="mr-2" />
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                {allProductTypes?.map((type) => (
                  <SelectItem key={type.id} value={`${type.id}`}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </GridItem>
        </>
      )}

      <GridItem>
        <DataTable
          data={filteredProducts || []}
          columns={columns}
          isLoading={isLoading || isLoadingProductTypes}
          emptyDataText="No products found"
          tableHeaderClassname="bg-[#385c80] text-white"
        />
      </GridItem>

      <AddProductFormModal
        open={isOpen}
        closeDialog={() => {
          closeModal();
          setSelectedProduct(null);
          setProductLink("");
        }}
        selectedProduct={selectedProduct}
        affiliateLink={productLink}
      />

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        openDialog={openDeleteDialog}
        closeDialog={() => {
          closeDeleteDialog();
          setSelectedProduct(null);
          setProductLink("");
        }}
        title="Delete Product?"
        description={`Are you sure you want to delete "${selectedProduct?.name}" product?`}
        confirmText="Yes, Delete"
        cancelText="Don't Delete"
        onConfirm={() => handleDeleteProduct?.(selectedProduct?.id || 0)}
      />
    </Grid>
  );
}

export default AdminProductPage;
