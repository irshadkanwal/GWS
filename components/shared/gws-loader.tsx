import React from "react";
import Spinner from "../svg/Spinner";
import Typography from "../ui/typography";
import { cn } from "@/lib/utils";

type GWSLoaderProps = {
  loadingText?: string;
  loaderStyles?: string;
  spinnerWidth?: number;
  spinnerHeight?: number;
};

function GWSLoader({
  loadingText,
  loaderStyles,
  spinnerWidth = 50,
  spinnerHeight = 50,
}: GWSLoaderProps) {
  return (
    <div
      className={cn(
        "space-y-4 flex flex-col items-center justify-center",
        loaderStyles
      )}
    >
      <Spinner width={spinnerWidth} height={spinnerHeight} />
      {loadingText && <Typography>{loadingText}</Typography>}
    </div>
  );
}

export default GWSLoader;
