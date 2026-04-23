import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";

type BlurryLoadingImageProps = {
  src: string | undefined;
  alt?: string;
  imageStyle?: React.CSSProperties;
  bgColor?: string;
  fallback?: React.ReactNode;
  containerName?: string;
} & React.ImgHTMLAttributes<ImageProps>;

const ImageLoader: React.FC<BlurryLoadingImageProps> = ({
  src,
  alt,
  imageStyle,
  bgColor = "transparent",
  fallback,
  containerName,
  ...rest
}) => {
  if (!src) {
    return fallback ? <>{fallback}</> : null;
  }
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Image
          src={src || ""}
          alt={alt || ""}
          width={Number(rest.width)}
          height={Number(rest.height)}
          className={cn("", rest.className)}
        />
      </TooltipTrigger>
      <TooltipContent>{alt}</TooltipContent>
    </Tooltip>
  );
};

export default ImageLoader;
