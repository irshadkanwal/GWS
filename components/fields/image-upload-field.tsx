import React from "react";
import { Input } from "../ui/input";
import ImageIcon from "../svg/ImageIcon";
import { cn } from "@/lib/utils";

type Props = {
  handleUploads?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting?: boolean;
  labelClassname?: string;
  label?: string;
};

function ImageUploadField({
  handleUploads,
  isSubmitting,
  labelClassname,
  label = "Photo/Video",
}: Props) {
  return (
    <div className="flex items-center">
      <Input
        id="file-upload"
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleUploads}
        className="sr-only cursor-pointer"
        disabled={isSubmitting}
      />
      <label
        htmlFor="file-upload"
        className={cn(
          "z-20 flex items-center gap-1.5 text-sm cursor-pointer bg-white/80 backdrop-blur-sm pointer-events-auto",
          isSubmitting ? "text-gray-400" : "text-[#385C80]",
          labelClassname
        )}
      >
        <ImageIcon color={isSubmitting ? "#9CA3AF" : "#385C80"} />
        {label}
      </label>
    </div>
  );
}

export default ImageUploadField;
