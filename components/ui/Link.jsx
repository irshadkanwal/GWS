import React from "react";
import NextLink from "next/link";

export default function Link({ href, children, className = "", ...props }) {
  return (
    <NextLink
      href={href}
      className={`!text-gray-700 font-medium no-underline ${className}`}
      {...props}
    >
      {children}
    </NextLink>
  );
}
