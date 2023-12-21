import { IconProperty } from "@custom-types";
import React from "react";

const IconArrowDown = ({ width = 16, height = 16, fill = "#E87722" }: IconProperty) => {
  return (
    <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.907 11.6001C14.414 11.0931 14.414 10.2699 13.907 9.76289L8.14408 4L2.38118 9.76289C1.87437 10.2697 1.87438 11.0919 2.37263 11.5989L2.77378 12L8.1404 6.6334L13.507 12L13.907 11.6001Z"
        fill={fill}
      />
    </svg>
  );
};

export default IconArrowDown;
