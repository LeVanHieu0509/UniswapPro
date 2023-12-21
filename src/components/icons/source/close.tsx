import { IconProps } from "..";
import React from "react";

const IconClose = ({ size = 24, color = "#183028" }: IconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.7069 5.70488L19.3519 5.34988C18.7669 4.76488 17.8169 4.76488 17.2319 5.34988L12.0019 10.5849L6.77187 5.35488C6.18687 4.76988 5.23687 4.76988 4.65188 5.35488L4.29688 5.70988L10.5869 11.9999L4.29688 18.2949L4.65188 18.6499C5.23687 19.2349 6.18687 19.2349 6.77187 18.6499L12.0019 13.4149L17.2319 18.6449C17.8169 19.2299 18.7669 19.2299 19.3519 18.6449L19.7069 18.2899L13.4169 11.9999L19.7069 5.70488Z"
        fill={color}
      />
    </svg>
  );
};

export default IconClose;
