import { IconProps } from "@custom-types";
import React from "react";

const IconCalendar = ({ size = 24, color = "#E87722" }: IconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 4.10526V2.52632C18 2.21053 17.8 2 17.5 2H16.5C16.2 2 16 2.21053 16 2.52632V4.10526H7.5V2.52632C7.5 2.21053 7.3 2 7 2H6C5.7 2 5.5 2.21053 5.5 2.52632V4.10526H4.5C3.65 4.10526 3 4.78947 3 5.68421V20.4211C3 21.3158 3.65 22 4.5 22H19.5C20.35 22 21 21.3158 21 20.4211V5.68421C21 4.78947 20.35 4.10526 19.5 4.10526H18ZM19 8.31579H5V6.21053H19V8.31579ZM5 10.4211H19V19.8947H5V10.4211Z"
        fill={color}
      />
    </svg>
  );
};

export default IconCalendar;
