import * as React from "react";
import { cn } from "@/lib/utils";

export type TypographyProps = {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "body1"
    | "body2"
    | "caption"
    | "label";
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "xs";
  color?: "default" | "primary" | "secondary" | "error" | "muted";
  status?: "approved" | "pending" | "rejected" | "expired";
  children: string | number;
  className?: string;
};

const Typography = ({
  variant = "body1",
  size = "md",
  color = "default",
  children,
  status,
  className,
}: TypographyProps) => {
  // Define base typography styles for each variant
  const baseStyles = {
    h1: "text-4xl font-bold leading-tight",
    h2: "text-3xl font-semibold leading-tight",
    h3: "text-2xl font-semibold leading-tight",
    h4: "text-xl font-medium leading-tight",
    h5: "text-lg font-medium leading-tight",
    body1: "text-base leading-relaxed",
    body2: "text-sm leading-relaxed",
    caption: "text-xs leading-tight text-muted-foreground",
    label: "text-sm leading-relaxed text-muted-foreground",
  };

  // Define size variants for typography
  const sizeStyles = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
  };

  // Define color variants
  const colorStyles = {
    default: "text-border-dark",
    primary: "text-primary",
    secondary: "text-secondary",
    error: "text-red-500",
    muted: "text-muted-foreground",
  };

  const statusStyles = {
    approved: "text-secondary-muted bg-secondary",
    pending: "text-yellow-100 bg-yellow-500",
    rejected: "text-error-muted bg-error",
    expired: "text-primary-muted bg-primary",
  };

  // Combine styles
  const classes = cn(
    baseStyles[variant],
    sizeStyles[size],
    colorStyles[color],
    status && statusStyles[status],
    className // Allow additional classes from parent
  );

  return <p className={classes}>{children}</p>;
};

Typography.displayName = "Typography";

export default Typography;
