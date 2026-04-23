import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import ErrorText from "./ErrorText";
import { GridItem } from "@/components/ui/Grid";
import type { GridItemProps } from "@/components/ui/Grid/GridItem";
import { cn } from "@/lib/utils";
import type { SelectableFormOptions } from "@/utilities/types/common/SelectableFormOptions";

type SelectableButtonGroupProps = {
  name: string;
  label: string;
  size?: GridItemProps["size"];
  required?: boolean;
  options: SelectableFormOptions[];
};

const FormSelectableButtonGroup: React.FC<SelectableButtonGroupProps> = ({
  name,
  label,
  required,
  size = 12,
  options,
}) => {
  const { control } = useFormContext();

  return (
    <GridItem className="pt-2" size={size}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          return (
            <div className="flex flex-col md:flex-row md:flex-wrap gap-3 mt-3">
              {options.map((option) => {
                const isSelected = field.value
                  ?.map(Number)
                  .includes(Number(option.value));
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      const optionValue = Number(option.value);
                      const currentValues: number[] = (field.value || []).map(
                        Number
                      );

                      const newValue = currentValues.includes(optionValue)
                        ? currentValues.filter((val) => val !== optionValue)
                        : [...currentValues, optionValue];

                      field.onChange(newValue);
                    }}
                    className={cn(
                      "text-sm px-4 py-2 rounded-md border transition-all duration-200",
                      isSelected
                        ? "border-[#9EB7D1] text-[#385C80] bg-white"
                        : "border-[#E5E5E5] text-[#A3A3A3] bg-white hover:border-gray-400"
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
              <ErrorText message={fieldState.error?.message || ""} />
            </div>
          );
        }}
      />
    </GridItem>
  );
};

export default FormSelectableButtonGroup;
