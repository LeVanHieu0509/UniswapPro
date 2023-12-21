import { IconProperty } from "@custom-types";
import React from "react";

const IconCheckedWhite = ({ width = 20, height = 20, fill = "#FFFFFF" }: IconProperty) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.63636 2C3.62806 2 2 3.62806 2 5.63636V18.3636C2 20.3719 3.62806 22 5.63636 22H18.3636C20.3719 22 22 20.3719 22 18.3636V5.63636C22 3.62806 20.3719 2 18.3636 2H5.63636ZM5 13.329L8.92128 17.2502L19.51 6.66153L19.2141 6.36567C18.7266 5.87811 17.9348 5.87811 17.4473 6.36567L8.92128 14.8916L7.06274 13.0331C6.57518 12.5455 5.78342 12.5455 5.29587 13.0331L5 13.329Z"
        fill={fill}
      />
    </svg>
  );
};

export default IconCheckedWhite;
