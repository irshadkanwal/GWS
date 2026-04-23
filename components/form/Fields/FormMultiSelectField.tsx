import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { X } from "lucide-react";
import ErrorText from "./ErrorText";
import GridItem, { type GridItemProps } from "@/components/ui/Grid/GridItem";
import { cn } from "@/lib/utils";
import type { SelectableFormOptions } from "@/utilities/types/common/SelectableFormOptions";

type FormMultiSelectFieldProps = {
  name: string;
  label: string;
  options: SelectableFormOptions[];
  required?: boolean;
  size?: GridItemProps["size"];
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  className?: string;
};

const FormMultiSelectField: React.FC<FormMultiSelectFieldProps> = ({
  name,
  label,
  options,
  required,
  disabled,
  size = 12,
  readonly,
  className,
  placeholder = "Choose the services and help you need",
}) => {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();

  const [open, setOpen] = React.useState(false);

  const isSelectDisabled = isSubmitting || disabled || readonly;

  return (
    <GridItem className={className} size={size}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const selectedValues: string[] = field.value || [];

          const toggleValue = (value: string) => {
            const newValues = selectedValues.includes(value)
              ? selectedValues.filter((v) => v !== value)
              : [...selectedValues, value];

            field.onChange(newValues);
            setOpen(false);
          };

          return (
            <div className="flex flex-col gap-2">
              {/* Select Dropdown */}
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-between text-left text-xs text-[#A3A3A3] hover:text-[#A3A3A3] bg-transparent"
                    )}
                    disabled={isSelectDisabled}
                  >
                    {placeholder}
                    <span className="ml-auto pl-2">&#9662;</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                  <Command>
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          key={option.value}
                          onSelect={() => toggleValue(String(option.value))}
                          className="flex items-center gap-2 border-b h-10 rounded-none hover:bg-black last:border-b-0"
                        >
                          <span className="capitalize">{option.label}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* Selected Tags */}
              <div className="flex flex-wrap gap-2">
                {selectedValues.map((value) => {
                  const label =
                    options.find((opt) => String(opt.value) === String(value))
                      ?.label || value;
                  return (
                    <span
                      key={value}
                      className="flex items-center justify-between border border-gray-200 p-2 rounded-md text-xs text-[#505152]"
                    >
                      {label}
                      {!readonly && (
                        <button
                          type="button"
                          onClick={() => toggleValue(value)}
                          className="ml-2 text-[#505152] hover:text-gray-700"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </span>
                  );
                })}
              </div>

              <ErrorText message={fieldState.error?.message} />
            </div>
          );
        }}
      />
    </GridItem>
  );
};

export default FormMultiSelectField;
