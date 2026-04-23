type CheckMarkIconProps = {
  width?: number;
  height?: number;
  variant?: "filled" | "outlined";
  color?: string;
  className?: string;
};

function CheckMarkIcon({
  width = 25,
  height = 24,
  variant = "outlined",
  color,
  className = "",
}: CheckMarkIconProps) {
  const defaultColor = variant === "filled" ? "#21D191" : "#B4B5B5";
  const fillColor = variant === "filled" ? color || defaultColor : "none";
  const strokeColor = color || defaultColor;

  if (variant === "filled") {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <circle cx="12.25" cy="12" r="10" fill={fillColor} />
        <path
          d="M16.5303 8.96967C16.8232 9.26256 16.8232 9.73744 16.5303 10.0303L11.5303 15.0303C11.2374 15.3232 10.7626 15.3232 10.4697 15.0303L7.96967 12.5303C7.67678 12.2374 7.67678 11.7626 7.96967 11.4697C8.26256 11.1768 8.73744 11.1768 9.03033 11.4697L11 13.4393L15.4697 8.96967C15.7626 8.67678 16.2374 8.67678 16.5303 8.96967Z"
          fill="white"
        />
      </svg>
    );
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="12.25"
        cy="12"
        r="9.25"
        stroke={strokeColor}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M16.5303 8.96967C16.8232 9.26256 16.8232 9.73744 16.5303 10.0303L11.5303 15.0303C11.2374 15.3232 10.7626 15.3232 10.4697 15.0303L7.96967 12.5303C7.67678 12.2374 7.67678 11.7626 7.96967 11.4697C8.26256 11.1768 8.73744 11.1768 9.03033 11.4697L11 13.4393L15.4697 8.96967C15.7626 8.67678 16.2374 8.67678 16.5303 8.96967Z"
        fill={strokeColor}
      />
    </svg>
  );
}

export default CheckMarkIcon;
