"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
  showAttachmentButton?: boolean;
  onAttachmentClick?: () => void;
  showCharacterCount?: boolean;
  placeholder?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      maxLength = 1000,
      showAttachmentButton = false,
      showCharacterCount = false,
      onAttachmentClick,
      ...props
    },
    ref
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    // Combine the external ref with our internal ref
    React.useImperativeHandle(
      ref,
      () => textareaRef.current as HTMLTextAreaElement
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      props.onChange?.(e);
    };

    return (
      <div className="w-full">
        <textarea
          className={cn(
            "flex min-h-[200px] w-full resize-none rounded-md border border-colors-input px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-[#A3A3A3] placeholder:text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-default disabled:opacity-50",
            className
          )}
          ref={textareaRef}
          onChange={handleChange}
          maxLength={maxLength}
          placeholder={props.placeholder}
          {...props}
        />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
