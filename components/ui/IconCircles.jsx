import React from "react";

export default function IconCircle({
  children,
  className = "",
  size = "w-16 h-16",
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-blue-100 mb-4 text-3xl ${size} ${className}`}
    >
      {children}
    </div>
  );
}
