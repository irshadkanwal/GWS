import React from "react";
import { GridItem } from "../ui/Grid";
import { cn } from "@/lib/utils";

type CustomSeparatorProps = {
  className?: string;
};

function CustomSeparator({ className }: CustomSeparatorProps) {
  return (
    <GridItem size={12}>
      <div
        className={cn(
          "w-[calc(100%+4rem)] border-t border-slate-100 my-6 -ml-8",
          className
        )}
      />
    </GridItem>
  );
}

export default CustomSeparator;
