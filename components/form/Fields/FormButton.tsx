import React from "react";
import { useFormContext } from "react-hook-form";
import { Button, type ButtonProps } from "@/components/ui/button";
import type { GridItemProps } from "@/components/ui/Grid/GridItem";
import Spinner from "@/components/svg/Spinner";

type FormButtonProps = ButtonProps & GridItemProps;

const FormButton = ({ ...props }: FormButtonProps) => {
  const { formState } = useFormContext();
  const { children, className, disabled, variant, ...rest } = props;
  const isDisabled = formState.isSubmitting || !formState.isValid || disabled;

  return (
    <Button
      {...rest}
      disabled={isDisabled}
      type="submit"
      size="lg"
      className={className}
      variant={variant}
    >
      {formState.isSubmitting ? <Spinner /> : children}
    </Button>
  );
};

export default FormButton;
