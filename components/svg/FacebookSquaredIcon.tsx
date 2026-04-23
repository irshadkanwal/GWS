import React from "react";

type FacebookSquaredIconProps = {
  width?: string;
  height?: string;
  color?: string;
};

function FacebookSquaredIcon({
  width = "24",
  height = "24",
  color = "#A3A3A3",
}: FacebookSquaredIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.5 3H16.504C18.987 3 21 5.013 21 7.496V16.505C21 18.987 18.987 21 16.504 21H7.496C5.013 21 3 18.987 3 16.504V7.5C3 5.015 5.015 3 7.5 3V3Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0996 12.9004H16.4996"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5004 8.40039H15.5554C14.0894 8.40039 12.9004 9.58939 12.9004 11.0554V12.0004V21.0004"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default FacebookSquaredIcon;
