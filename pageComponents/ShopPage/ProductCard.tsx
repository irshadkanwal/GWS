import React from "react";
import CheckMarkIcon from "@/components/svg/CheckMarkIcon";
import { cn } from "@/lib/utils";
import EllipsisTypography from "../common/EllipsisTypography";
import type { ProductType } from "@/utilities/types/product";
import Image from "next/image";
import Typography from "@/components/ui/typography";
import Link from "next/link";

type ProductCardProps = {
  product: ProductType | undefined;
  handleCardClick?: (product: ProductType) => void;
  className?: string;
  imageStyles?: string;
};

function ProductCard({
  product,
  handleCardClick,
  className,
  imageStyles,
}: ProductCardProps) {
  const handleProductSelection = () => {
    if (handleCardClick) {
      handleCardClick(product!);
    }
  };
  return (
    <div className={cn("min-w-[220px] space-y-2 cursor-pointer", className)}>
      <div className="space-y-2" onClick={handleProductSelection}>
        {/* Image */}
        <Image
          src={product?.image_url || ""}
          alt={product?.name || ""}
          width={800}
          height={800}
          className={cn(
            "w-[200px] h-[200px] rounded-lg object-cover",
            imageStyles
          )}
        />

        {/* Title */}
        <EllipsisTypography className="text-[14px] max-w-[200px] line-clamp-1">
          {product?.name}
        </EllipsisTypography>
      </div>

      {/* Verified link */}
      <div className="flex items-center gap-1">
        <CheckMarkIcon variant="filled" width={17} height={18} />
        <Link
          href={product?.affiliate_link || ""}
          target="_blank"
          className="text-[#597FA6] font-bold text-[10px] hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          <EllipsisTypography
            title={product?.affiliate_link || ""}
            className="max-w-[180px] line-clamp-1"
          >
            {product?.affiliate_link}
          </EllipsisTypography>
        </Link>
      </div>

      {/* Price */}
      <Typography className=" text-[#505152]">
        {`${product?.price || 0}`}
      </Typography>
    </div>
  );
}

export default ProductCard;
