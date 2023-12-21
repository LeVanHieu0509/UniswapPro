import React from "react";
import { IconProps } from "..";

const Tick = ({ size = 24, color = "#FFFFFF" }: IconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.685 18.5221L3 13.8366L3.3535 13.4831C3.9395 12.8976 4.889 12.8976 5.4745 13.4831L7.685 15.6936L17.9395 5.43913C18.525 4.85362 19.475 4.85362 20.0605 5.43913L20.414 5.79312L7.685 18.5221Z"
        fill={color}
      />
    </svg>
  );
};

export default Tick;
