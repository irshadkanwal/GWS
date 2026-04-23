import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

function Grid({ children, className, onClick }: Props) {
  return (
    <div
      className={cn("grid grid-cols-12 gap-2 w-full", className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Grid;
