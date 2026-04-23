import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import ErrorText from "./ErrorText";
import { GridItem } from "@/components/ui/Grid";
import type { GridItemProps } from "@/components/ui/Grid/GridItem";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const QuillEditor = dynamic(
  () => import("@/components/shared/quill-editor-field"),
  { ssr: false }
);

type FormTextareaFieldProps = {
  name: string;
  label: string;
  required?: boolean;
  size?: GridItemProps["size"];
  disableGutter?: boolean;
  className?: string;
  readonly?: boolean;
  placeholder?: string;
  disabled?: boolean;
};

const FormRichTextField: React.FC<FormTextareaFieldProps> = ({
  name,
  label,
  required,
  size = 12,
  disableGutter = false,
  className,
  readonly = false,
  ...rest
}) => {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();

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
        render={({ field, fieldState }) => {
          return (
            <div className="flex flex-col gap-1 relative">
              <QuillEditor
                theme="snow"
                value={field.value || ""}
                onChange={field.onChange}
                readOnly={isSubmitting || readonly}
                placeholder={rest.placeholder}
                className={cn(
                  "bg-white [&>.ql-toolbar]:rounded-t-md [&>.ql-toolbar]:border-colors-input [&>.ql-container]:rounded-b-md [&>.ql-container]:min-h-16 [&>.ql-container]:border-colors-input",
                  rest.disabled && "opacity-50"
                )}
              />
              {!disableGutter && (
                <div className="h-2">
                  <ErrorText message={fieldState.error?.message || ""} />
                </div>
              )}
            </div>
          );
        }}
      />
    </GridItem>
  );
};

export default FormRichTextField;
