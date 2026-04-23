import React from "react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";

function FormResetButton({ ...props }) {
  const { children, className, ...rest } = props;
  const { formState } = useFormContext();
  return (
    <Button
      {...rest}
      size="lg"
      variant="ghost"
      type="reset"
      className={className}
      disabled={formState.isSubmitting}
    >
      {children}
    </Button>
  );
}

export default FormResetButton;
