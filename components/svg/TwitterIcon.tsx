import React from "react";

type TwitterIconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function TwitterIcon({
  width = 28,
  height = 24,
  color = "#1E2021",
}: TwitterIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 28 24"
      fill="none"
    >
      <path
        d="M21.7352 0H25.8227L16.8479 10.1845L27.3333 24H19.1049L12.6626 15.6044L5.28731 24H1.19978L10.7077 13.107L0.666626 0H9.09937L14.9197 7.66937L21.7352 0ZM20.3045 21.6089H22.5704L7.90866 2.30258H5.47391L20.3045 21.6089Z"
        fill={color}
      />
    </svg>
  );
}

export default TwitterIcon;
