import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input, InputProps } from "@/components/ui/input";
import { GridItem } from "@/components/ui/Grid";
import ErrorText from "./ErrorText";
import type { GridItemProps } from "@/components/ui/Grid/GridItem";
import { ArrowUpToLine } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type FormTextFieldProps = {
  name: string;
  label: string;
  type?: string;
  size?: GridItemProps["size"];
  disableGutter?: boolean;
  previewImage?: string;
  className?: string;
  inputFieldStyles?: string;
  onFileChange?: (file: File) => void;
} & Omit<InputProps, "name" | "type" | "label">;

const FormTextField: React.FC<FormTextFieldProps> = ({
  name,
  label,
  type = "text",
  required,
  size = 12,
  readOnly = false,
  disableGutter = false,
  previewImage,
  className,
  inputFieldStyles,
  onFileChange,
  ...rest
}) => {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();

  const isFileType = type === "file";
  const { disabled } = rest;

  return (
    <GridItem className={className} size={size}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-[#262626]">
          {label}
          {required && <span className="text-red-500 ml-0.1">*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <div className={cn("flex flex-col gap-1", inputFieldStyles)}>
            {isFileType ? (
              <div className="flex gap-2">
                <div
                  className={cn(
                    "relative bg-[#F3F3F3] w-10 h-10 rounded-sm p-6 transition-colors flex items-center justify-center cursor-pointer",
                    fieldState.error ? "border-red-300" : "",
                    disabled ? "cursor-not-allowed" : "",
                    "hover:border-gray-400"
                  )}
                >
                  <Input
                    {...rest}
                    ref={field.ref}
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                        if (file.type.startsWith("image/")) {
                          onFileChange?.(file);
                        }
                      }
                    }}
                    className={cn(
                      "absolute left-0 w-10 h-10 opacity-0 -top-5",
                      disabled ? "cursor-not-allowed" : ""
                    )}
                    disabled={disabled}
                    readOnly={isSubmitting}
                  />

                  <div
                    className={cn(
                      "w-6 h-6 text-center cursor-pointer",
                      disabled ? "cursor-not-allowed" : ""
                    )}
                  >
                    <ArrowUpToLine />
                  </div>
                </div>
                {previewImage && (
                  <div className="w-12 h-12">
                    <Image
                      src={previewImage}
                      alt="Preview"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full rounded-sm"
                    />
                  </div>
                )}
              </div>
            ) : (
              <Input
                {...field}
                {...rest}
                readOnly={readOnly || isSubmitting}
                id={name}
                type={type}
                disabled={disabled}
                disableFieldButton={field.value === "" || fieldState.invalid}
              />
            )}

            {!disableGutter && (
              <div className="h-2">
                <ErrorText message={fieldState.error?.message || ""} />
              </div>
            )}
          </div>
        )}
      />
    </GridItem>
  );
};

export default FormTextField;
