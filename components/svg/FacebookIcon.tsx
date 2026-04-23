import React from "react";

type FacebookIconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function FacebookIcon({
  width = 32,
  height = 32,
  color = "#1E2021",
}: FacebookIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M29.3333 16.0002C29.3333 8.63638 23.3637 2.66684 16 2.66684C8.63617 2.66684 2.66663 8.63638 2.66663 16.0002C2.66663 22.2532 6.97143 27.5 12.7789 28.9409V20.0746H10.0295V16.0002H12.7789V14.2445C12.7789 9.70625 14.8327 7.60279 19.2882 7.60279C20.1329 7.60279 21.5904 7.76838 22.1867 7.93404V11.6276C21.872 11.5945 21.3254 11.5779 20.6463 11.5779C18.46 11.5779 17.6153 12.406 17.6153 14.5592V16.0002H21.9704L21.2223 20.0746H17.6153V29.2358C24.2172 28.4385 29.3333 22.8171 29.3333 16.0002Z"
        fill={color}
      />
    </svg>
  );
}

export default FacebookIcon;
