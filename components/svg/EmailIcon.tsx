import React from "react";
type EmailIconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function EmailIcon({
  width = 25,
  height = 24,
  color = "#A3A3A3",
}: EmailIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.5 4H19C20.733 4 22.1492 5.35645 22.2449 7.06558L22.25 7.25V16.75C22.25 18.483 20.8935 19.8992 19.1844 19.9949L19 20H5.5C3.76697 20 2.35075 18.6435 2.25514 16.9344L2.25 16.75V7.25C2.25 5.51697 3.60645 4.10075 5.31558 4.00514L5.5 4H19H5.5ZM20.75 9.373L12.5993 13.6637C12.4119 13.7623 12.1931 13.7764 11.9968 13.706L11.9007 13.6637L3.75 9.374V16.75C3.75 17.6682 4.45711 18.4212 5.35647 18.4942L5.5 18.5H19C19.9182 18.5 20.6712 17.7929 20.7442 16.8935L20.75 16.75V9.373ZM19 5.5H5.5C4.58183 5.5 3.82881 6.20711 3.7558 7.10647L3.75 7.25V7.679L12.25 12.1525L20.75 7.678V7.25C20.75 6.33183 20.0429 5.57881 19.1435 5.5058L19 5.5Z"
        fill={color}
      />
    </svg>
  );
}

export default EmailIcon;
