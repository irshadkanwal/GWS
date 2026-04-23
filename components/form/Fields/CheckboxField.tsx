import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import ErrorText from "./ErrorText";
import { GridItem } from "@/components/ui/Grid";
import { Checkbox } from "@/components/ui/checkbox";
import type { GridItemProps } from "@/components/ui/Grid/GridItem";
import type { SelectableFormOptions } from "@/utilities/types/common/SelectableFormOptions";
import type { CheckboxProps } from "@radix-ui/react-checkbox";

type CheckboxFieldProps = {
  name: string;
  label: string;
  size?: GridItemProps["size"];
  required?: boolean;
  options: SelectableFormOptions[];
  className?: string;
  disabled?: boolean;
};

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  required,
  size = 12,
  options,
  className,
  disabled,
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
        render={({ field, fieldState }) => (
          <div className="flex flex-col items-start justify-start gap-4 mt-2">
            {options?.map((option, index) => (
              <div key={option.value} className="flex gap-3">
                <Checkbox
                  {...rest}
                  {...field}
                  disabled={isSubmitting || field.disabled || disabled}
                  id={`${option.label}-${field.name}-${index}`}
                  checked={field.value?.includes(option.value)}
                  onCheckedChange={(checked) => {
                    return checked
                      ? field.onChange([...field.value, option.value])
                      : field.onChange(
                          field.value?.filter(
                            (value: string) => value !== option.value
                          )
                        );
                  }}
                  className='transition-colors duration-200"'
                />
                <label
                  htmlFor={`${option.label}-${field.name}-${index}`}
                  className={`text-sm font-medium text-[#A3A3A3] cursor-pointer ${
                    disabled ? "pointer-events-none" : ""
                  }`}
                >
                  {option.label}
                </label>
                <ErrorText message={fieldState.error?.message || ""} />
              </div>
            ))}
          </div>
        )}
      />
    </GridItem>
  );
};

export default CheckboxField;
