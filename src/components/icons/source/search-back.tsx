import { IconProperty } from "@custom-types";
import React from "react";

const SearchBack = ({ width = 24, height = 24, fill = "#183028" }: IconProperty) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.3518 19.5609L13.7057 19.2074L7.41377 12.9154L21.998 12.9154L21.998 10.9154L7.41277 10.9154L13.7052 4.62187L13.3518 4.26887C12.7663 3.68287 11.8164 3.68287 11.2305 4.26887L3.58559 11.9149L11.2309 19.5609C11.8164 20.1464 12.7663 20.1464 13.3518 19.5609Z"
        fill={fill}
      />
    </svg>
  );
};

export default SearchBack;
