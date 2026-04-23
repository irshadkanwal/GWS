import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import ErrorText from "./ErrorText";
import GridItem, { type GridItemProps } from "@/components/ui/Grid/GridItem";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SelectableFormOptions } from "@/utilities/types/common/SelectableFormOptions";

type FormSelectFieldProps = {
  name: string;
  label: string;
  options: SelectableFormOptions[];
  required?: boolean;
  size?: GridItemProps["size"];
  disabled?: boolean;
  onChange?: (value: string) => void;
  readonly?: boolean;
  placeholder?: string;
  className?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const FormSelectField: React.FC<FormSelectFieldProps> = ({
  name,
  label,
  options,
  required,
  disabled,
  size = 12,
  readonly,
  onChange,
  placeholder,
  className,
}) => {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();

  const isSelectDisabled = isSubmitting || disabled || readonly;

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
            <div className="flex flex-col gap-1">
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  onChange && onChange(value);
                }}
                disabled={isSelectDisabled}
                {...field}
              >
                <SelectTrigger className=" bg-white">
                  <SelectValue
                    className="text-[#efefef]"
                    placeholder={placeholder}
                  />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    {options.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={String(option.value)}
                        className="hover:!text-[#385C80]"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <ErrorText message={fieldState.error?.message} />
            </div>
          );
        }}
      />
    </GridItem>
  );
};

export default FormSelectField;
