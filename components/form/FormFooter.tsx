import React from "react";
import { GridItem } from "../ui/Grid";
import FormResetButton from "./Fields/FormResetButton";
import FormButton from "./Fields/FormButton";
import { cn } from "@/lib/utils";
import type { GridItemProps } from "../ui/Grid/GridItem";
import { cva } from "class-variance-authority";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useFormContext } from "react-hook-form";

type FormFooterProps = {
  className?: string;
  IsResetButtonRequired?: boolean;
  submitButtonText?: string;
  resetButtonText?: string;
  size?: GridItemProps["size"];
  orientation?: "horizontal" | "vertical";
  isSubmitButtonDisabled?: boolean;
  errorMessage?: string;
  errorIcon?: React.ReactNode;
  onBackButtonClick?: () => void;
  renderBackButton?: boolean;
  disableBackButton?: boolean;
  backButtonType?: "button" | "submit";
  onNextClick?: () => void;
  nextButtonType?: "button" | "submit";
  disableNextButton?: boolean;
  backButtonText?: string;
  submitButtonVariant?:
    | "default"
    | "destructive"
    | "ghost"
    | "secondary"
    | "link"
    | "outline";
};

const formFooterVariants = cva("flex gap-4 px-0 border-t border-[#9EB7D1] ", {
  variants: {
    orientation: {
      horizontal: "justify-between items-center",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

function FormFooter({
  className,
  IsResetButtonRequired = false,
  submitButtonText = "Submit",
  resetButtonText = "Reset",
  size = 12,
  orientation = "horizontal",
  isSubmitButtonDisabled = false,
  errorMessage,
  errorIcon,
  submitButtonVariant = "ghost",
  onBackButtonClick,
  renderBackButton = false,
  onNextClick,
  disableNextButton = false,
  nextButtonType = "button",
  backButtonType = "button",
  backButtonText = "Back",
  disableBackButton = false,
}: FormFooterProps) {
  const { formState } = useFormContext();
  const isSubmissionDisabled =
    formState.isSubmitting || !formState.isValid || isSubmitButtonDisabled;

  const isBackDisabled =
    backButtonType === "submit"
      ? disableBackButton || isSubmissionDisabled
      : disableBackButton;
  return (
    <GridItem size={size} className="gap-8">
      <div className="flex items-center justify-between w-full gap-6 md:gap-12">
        {(IsResetButtonRequired || renderBackButton) && (
          <div className="w-1/5 px-0 border-t lg:w-2/12">
            {IsResetButtonRequired && (
              <FormResetButton>
                <ArrowLeft className="mr-2" size={20} />
                {resetButtonText}
              </FormResetButton>
            )}
            {renderBackButton && (
              <Button
                className="p-0"
                variant={"ghost"}
                size={"lg"}
                type={backButtonType}
                onClick={onBackButtonClick}
                disabled={isBackDisabled}
              >
                <ArrowLeft className="mr-2" size={20} />
                {backButtonText}
              </Button>
            )}
          </div>
        )}
        <div
          // size={size}
          className={cn(
            formFooterVariants({ orientation: orientation, className }),
            !IsResetButtonRequired && !renderBackButton
              ? "w-full"
              : "w-4/5 lg:w-10/12"
          )}
        >
          <FormButton
            variant={submitButtonVariant}
            disabled={isSubmitButtonDisabled}
            className="p-0 text-[#385C80]"
          >
            {submitButtonText}
          </FormButton>
          <Button
            type={nextButtonType}
            variant="ghost"
            className="p-0"
            onClick={onNextClick}
            disabled={
              nextButtonType === "submit"
                ? isSubmissionDisabled
                : disableNextButton
            }
          >
            <ArrowRight size={20} color="#385C80" />
          </Button>
        </div>
      </div>
    </GridItem>
  );
}

export default FormFooter;
