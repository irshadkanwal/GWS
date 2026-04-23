import React from "react";
import { GridItem } from "@/components/ui/Grid";
import Typography from "@/components/ui/typography";
import EllipsisTypography from "@/pageComponents/common/EllipsisTypography";
import { CircleCheck } from "lucide-react";
import Image from "next/image";

type ProductItems = {
  id: number;
  name: string;
  price: string;
  shop: string;
  imageURL: string;
};

type ProductsListItemProps = {
  productDetails: ProductItems;
};

function ProductsListItem({ productDetails }: ProductsListItemProps) {
  return (
    <GridItem size={12}>
      <div className="flex items-center justify-between py-3 pr-12 border-b">
        <div className="flex items-center gap-3 w-2/5">
          <div className="min-w-10 min-h-10 overflow-hidden rounded-md ">
            <Image
              src={`${productDetails.imageURL}`}
              alt={"product image"}
              width={40}
              height={40}
              className="object-fit w-full h-full rounded-sm"
            />
          </div>

          <EllipsisTypography
            title={productDetails.name}
            className="text-sm line-clamp-1"
          >
            {productDetails.name}
          </EllipsisTypography>
        </div>
        <Typography className="text-[#828383]">{`$${productDetails.price}`}</Typography>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <CircleCheck size={24} color="#f5f6f9" fill="lightGreen" />
            <span className="text-sm text-[#597FA6]">
              {productDetails.shop}
            </span>
          </div>
        </div>
      </div>
    </GridItem>
  );
}

export default ProductsListItem;
