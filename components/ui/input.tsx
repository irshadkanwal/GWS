import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  startIcon?: { icon: React.ElementType; onClick?: () => void; size?: number };
  endIcon?: { icon: React.ElementType; onClick?: () => void; size?: number };
  renderFieldButton?: boolean;
  onFieldButtonClick?: () => void;
  fieldButtonText?: string;
  fieldButtonStyles?: string;
  disableFieldButton?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      renderFieldButton,
      fieldButtonText,
      disableFieldButton = false,
      onFieldButtonClick,
      fieldButtonStyles,
      startIcon,
      endIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const { icon: EndIcon, ...endIconProps } = endIcon ?? {};
    const { icon: StartIcon } = startIcon ?? {};
    return (
      <div className={cn("relative w-full")}>
        {StartIcon && (
          <span className="ml-3 absolute top-2.5 left-0 flex items-center justify-between">
            {<StartIcon size={20} />}
          </span>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-colors-input px-3 py-2 pr-12 text-sm",
            "ring-offset-background placeholder:text-[#A3A3A3] placeholder:text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground file:cursor-pointer",
            "disabled:cursor-default disabled:opacity-50 md:text-sm",
            StartIcon ? "pl-10" : "",
            type === "number"
              ? "input[type='number']::-webkit-inner-spin-button, "
              : "",
            disabled
              ? "file:cursor-not-allowed file:opacity-0 border-none"
              : "",
            className
          )}
          ref={ref}
          {...props}
        />

        {renderFieldButton && (
          <div className="absolute bottom-0 right-0 flex items-center justify-between p-3 pointer-events-none z-50 ">
            <button
              type="button"
              onClick={onFieldButtonClick}
              disabled={disableFieldButton}
              className={cn(
                "flex items-center text-[#385C80] gap-1.5 text-sm transition-colors pointer-events-auto border-[#385C80] disabled:bg-white/80 disabled:backdrop-blur-sm",
                fieldButtonStyles
              )}
            >
              {fieldButtonText}
            </button>
          </div>
        )}

        {EndIcon && (
          <span className="absolute right-0 mr-3 top-2">
            {<EndIcon size={20} {...endIconProps} />}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

const SearchInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
  return (
    <div className="relative border rounded-md">
      <Search className="absolute z-10 w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
      <Input
        ref={ref}
        className={cn(className, "pl-10 border-none shadow-none")}
        {...props}
      />
    </div>
  );
});
SearchInput.displayName = "SearchInput";

export { Input, SearchInput };
