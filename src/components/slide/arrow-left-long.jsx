import React from "react";

const ArrowLeftLong = ({ size = 24, fill = "white" }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.647 4.43913L10.293 4.79263L16.5855 11.0846H2V13.0846H16.5865L10.2935 19.3781L10.647 19.7311C11.2325 20.3171 12.1825 20.3171 12.7685 19.7311L20.414 12.0851L12.768 4.43913C12.1825 3.85362 11.2325 3.85362 10.647 4.43913Z"
        fill={fill}
      />
    </svg>
  );
};

export default ArrowLeftLong;
