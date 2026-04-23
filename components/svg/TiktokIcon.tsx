import React from "react";

type TiktokIconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function TiktokIcon({
  width = 24,
  height = 24,
  color = "#1E2021",
}: TiktokIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="28"
      viewBox="0 0 24 28"
      fill="none"
    >
      <path
        d="M17.8223 0.341309H13.2186V18.9486C13.2186 21.1656 11.448 22.9868 9.24449 22.9868C7.04099 22.9868 5.27034 21.1656 5.27034 18.9486C5.27034 16.7712 7.00165 14.9896 9.12646 14.9104V10.2388C4.44403 10.318 0.666626 14.1582 0.666626 18.9486C0.666626 23.7786 4.52272 27.6584 9.28385 27.6584C14.0449 27.6584 17.901 23.739 17.901 18.9486V9.40739C19.6323 10.6743 21.7571 11.4265 24 11.4661V6.79447C20.5374 6.6757 17.8223 3.82522 17.8223 0.341309Z"
        fill={color}
      />
    </svg>
  );
}

export default TiktokIcon;
