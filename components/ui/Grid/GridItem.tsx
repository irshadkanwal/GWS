import React from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const gridItemSizes = cva("p-2", {
  variants: {
    size: {
      1: "col-span-1",
      2: "col-span-2",
      3: "col-span-3",
      4: "col-span-4",
      5: "col-span-5",
      6: "col-span-6",
      7: "col-span-7",
      8: "col-span-8",
      9: "col-span-9",
      10: "col-span-10",
      11: "col-span-11",
      12: "col-span-12",
    },
  },
  defaultVariants: {
    size: 12,
  },
});
export type GridItemProps = {
  children: React.ReactNode;
  className?: string;
} & VariantProps<typeof gridItemSizes>;

function GridItem({ children, className, size }: GridItemProps) {
  return (
    <div className={cn(gridItemSizes({ size }), className)}>{children}</div>
  );
}

export default GridItem;
