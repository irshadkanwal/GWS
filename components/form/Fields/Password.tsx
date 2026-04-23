import React from "react";
import { Input, type InputProps } from "@/components/ui/input";
import { useFormContext, Controller } from "react-hook-form";
import ErrorText from "./ErrorText";
import { GridItem } from "@/components/ui/Grid";
import type { GridItemProps } from "@/components/ui/Grid/GridItem";
import { Eye, EyeClosed } from "lucide-react";

type PasswordFieldProps = {
  name: string;
  label: string;
  size?: GridItemProps["size"];
  disableGutter?: boolean;
  className?: string;
} & Omit<InputProps, "name" | "type" | "label">;

const PasswordField: React.FC<PasswordFieldProps> = ({
  name,
  label,
  required,
  size = 12,
  disableGutter = false,
  className,
  ...rest
}) => {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <GridItem className={className} size={size}>
      {label && (
        <label className="text-sm font-medium text-gray-700" htmlFor={name}>
          {label}
          {required && <span className="text-red-500 ml-0.1">*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-1">
            <div className="relative">
              <Input
                {...rest}
                {...field}
                id={name}
                type={isPasswordVisible ? "text" : "password"}
                endIcon={{
                  icon: isPasswordVisible ? Eye : EyeClosed,
                  onClick: togglePasswordVisibility,
                }}
                disabled={isSubmitting}
              />
            </div>
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

export default PasswordField;
