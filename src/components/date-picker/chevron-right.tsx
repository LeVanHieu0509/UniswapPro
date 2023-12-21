import { IconProps } from "@custom-types";
import React from "react";

const ChevronRight = ({ size = 24, color = "#183028" }: IconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.54991 19.5048C7.24705 20.1651 8.37888 20.1651 9.07602 19.5048L17 12.0006L9.07602 4.49637C8.37914 3.8364 7.24858 3.83642 6.55155 4.48523L6 5.00759L13.3791 11.9958L6 18.984L6.54991 19.5048Z"
        fill={color}
      />
    </svg>
  );
};

export default ChevronRight;
