"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import Image from "next/image";
import EditIcon from "@/components/svg/EditIcon";
import { Grid, GridItem } from "@/components/ui/Grid";
import Typography from "@/components/ui/typography";
import CheckMarkIcon from "@/components/svg/CheckMarkIcon";
import type { ProductType } from "@/utilities/types/product";
import EllipsisTypography from "@/pageComponents/common/EllipsisTypography";
import { useUserStore } from "@/store";
import React from "react";
import useGetRoleById from "@/hooks/role/useGetRoleByID";
import { USER_ROLES } from "@/constants/constants";
import useGetUserDetailsByID from "@/hooks/user-details/useGetUserDetailsByID";

interface ProductDetailDialogProps {
  product: ProductType | null;
  onAddToList?: (productId: number) => void;
  onRemoveFromList?: (productId: number) => void;
  onEdit?: (productId: number) => void;
  open: boolean;
  closeDialog: () => void;
  productType?: string;
  isLoading?: boolean;
}

function ProductDetailDialog({
  product,
  onAddToList,
  onRemoveFromList,
  onEdit,
  open,
  closeDialog,
  productType,
  isLoading = false,
}: ProductDetailDialogProps) {
  const user = useUserStore(React.useCallback((state) => state, []));
  const { data: userDetails } = useGetUserDetailsByID(user.id || 0);
  const { data: userRole } = useGetRoleById(user?.role_id || 0);
  const isUserNotAllowed =
    userRole?.name === USER_ROLES.CAREGIVER &&
    !userDetails?.privacy_settings?.includes("allowOthers");

  const handleAddToList = () => {
    onAddToList?.(product?.id!);
  };

  const handleRemoveFromList = () => {
    onRemoveFromList?.(product?.id!);
  };

  const handleEdit = () => {
    onEdit?.(product?.id!);
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent
        className="md:max-w-[720px] md:max-h-[432px] w-11/12 p-1 rounded-md"
        hideCloseButton={true}
      >
        <Grid className="relative">
          <div className="flex items-center right-0 top-0 absolute z-20">
            {onEdit && (
              <Button
                variant="ghost"
                size="icon"
                className=""
                type="button"
                onClick={handleEdit}
                disabled={isUserNotAllowed}
              >
                <EditIcon width={20} height={21} color="black" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className=""
              type="button"
              onClick={closeDialog}
            >
              <X width={24} color="black" />
            </Button>
          </div>
          <GridItem className="p-1 col-span-12 md:col-span-7">
            <div className="md:h-[400px] md:w-[400px]  rounded-md">
              <Image
                src={product?.image_url || ""}
                alt={product?.name || ""}
                width={400}
                height={400}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </GridItem>
          <GridItem className="relative flex items-center col-span-12 md:col-span-5">
            <div className="w-full space-y-5">
              <div className="flex flex-col gap-1 w-full">
                <Typography size="md" className="text-[#050708]">
                  {product?.name || ""}
                </Typography>
                <span className="flex gap-1 items-center w-full cursor-pointer">
                  <CheckMarkIcon variant="filled" width={13} height={14} />
                  <EllipsisTypography
                    title={product?.affiliate_link || ""}
                    className="text-[#597FA6] font-bold text-[10px] w-11/12"
                  >
                    {product?.affiliate_link || ""}
                  </EllipsisTypography>
                </span>
                <Typography size="md" className="text-[#828383]">
                  {`$${product?.price || ""}`}
                </Typography>
              </div>
              <div className="space-y-1">
                <Button
                  onClick={handleAddToList}
                  type="button"
                  disabled={
                    productType === "Wish" || isLoading || isUserNotAllowed
                  }
                  className="w-full rounded-full text-[#385C80] bg-[#C8DBED] hover:bg-[#385C80] hover:text-[#C8DBED]"
                >
                  Add to my Care Registry
                </Button>
                {productType !== "Suggestion" && (
                  <Button
                    onClick={handleRemoveFromList}
                    variant="ghost"
                    type="button"
                    className="w-full text-[#828383]"
                    disabled={isLoading || isUserNotAllowed}
                  >
                    Remove from my Care Registry
                  </Button>
                )}
              </div>
            </div>
          </GridItem>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailDialog;
