import React from "react";

type Props = {};

function ArrowDownIcon({}: Props) {
  return (
    <svg
      className="w-6 h-6 ml-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m6 9 6 6 6-6"
      />
    </svg>
  );
}

export default ArrowDownIcon;
