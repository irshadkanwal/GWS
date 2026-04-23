import React from "react";
import DataTable from "@/components/ui/datatable";
import { Grid, GridItem } from "@/components/ui/Grid";
import Typography from "@/components/ui/typography";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import EllipsisTypography from "@/pageComponents/common/EllipsisTypography";
import BuildRegistryFooter from "../BuildRegistryFooter";
import CustomSeparator from "@/components/shared/custom-separator";
import { DragHandle } from "@/components/shared/drag-handle";
import type { RegistryItemType } from "@/utilities/types/registryItem";
import useUpdateRegistryItems from "@/hooks/registry-item/useUpdateRegistryItems";
import { toast } from "sonner";
import EditStatusDropdown from "../EditStatusDropdown";

type PriorityItemsProps = {
  registryItems: RegistryItemType[];
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isLastStep: boolean;
  isLoading?: boolean;
};

function PriorityItems({
  registryItems,
  setCurrentStep,
  isLastStep = false,
  isLoading = false,
}: PriorityItemsProps) {
  const { mutateAsync: updateRegistryItem } = useUpdateRegistryItems();

  const orderedRegistryItems = React.useMemo(() => {
    return registryItems?.sort((a, b) => a.order_index! - b.order_index!);
  }, [registryItems]);

  const columns: ColumnDef<RegistryItemType>[] = [
    {
      accessorKey: "registry_product.name",
      header: "Product",
      cell: ({ row }) => {
        const product = row.original.registry_product;
        return (
          <div className="flex items-center gap-3 w-64">
            <div className="max-w-10 max-h-10 overflow-hidden rounded-md">
              <Image
                src={product?.image_url ?? ""}
                alt="product image"
                width={300}
                height={300}
                className="object-cover w-full h-full rounded-sm"
              />
            </div>
            <EllipsisTypography
              title={product?.name ?? ""}
              className="text-sm line-clamp-1"
            >
              {product?.name}
            </EllipsisTypography>
          </div>
        );
      },
    },
    {
      accessorKey: "registry_product.price",
      header: "Price",
      cell: ({ row }) => (
        <Typography size="xs" className="text-[#828383]">
          {row.original.registry_product?.price?.toString() || ""}
        </Typography>
      ),
    },
    {
      accessorKey: "status",
      header: "status",
      cell: ({ row }) => (
        <Typography size="xs" className="text-[#828383] capitalize">
          {row.original.status}
        </Typography>
      ),
    },
    {
      accessorKey: "action",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-3">
          <EditStatusDropdown item={row.original} />
          <DragHandle id={row.original.id.toString()} />
        </div>
      ),
    },
  ];

  const handleBackClick = () => {
    setCurrentStep((prev) => prev - 1);
  };
  const handleNextClick = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleSave = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleReorder = async (newData: RegistryItemType[]) => {
    try {
      await Promise.all(
        newData.map((item, index) =>
          updateRegistryItem({
            id: item.id,
            registryItem: {
              ...item,
              order_index: index + 1,
            },
          })
        )
      );
      toast.success("Product order updated!");
    } catch (error) {
      toast.error("Failed to update product order");
    }
  };

  return (
    <Grid>
      <GridItem>
        <Typography size="md" className=" text-[#262626]">
          Define the priority order of your list
        </Typography>
        <Typography size="sm" className=" text-[#A3A3A3]">
          Let your supporters know what is most important to you right now
        </Typography>
      </GridItem>

      <GridItem>
        <DataTable<RegistryItemType>
          columns={columns}
          data={orderedRegistryItems}
          isDragEnabled={true}
          onReorder={handleReorder}
          getRowId={(row) => row.id.toString()}
          emptyDataText="Currently No Items Added"
          isLoading={isLoading}
        />
      </GridItem>

      <CustomSeparator className="my-3" />

      <GridItem>
        <BuildRegistryFooter
          handleBackClick={handleBackClick}
          handleNextClick={handleNextClick}
          onSaveClick={handleSave}
        />
      </GridItem>
    </Grid>
  );
}

export default PriorityItems;
