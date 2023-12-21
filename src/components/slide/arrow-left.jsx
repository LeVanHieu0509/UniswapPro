import React from "react";

const ArrowLeft = ({ width = 54, height = 54, fill = "#E87722" }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_754_29247)">
        <rect x={11} y={2} width={32} height={32} rx={16} fill="white" shapeRendering="crispEdges" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M31.4501 10.4952C30.753 9.83495 29.6211 9.83495 28.924 10.4952L21 17.9994L28.924 25.5036C29.6209 26.1636 30.7514 26.1636 31.4484 25.5148L32 24.9924L24.6209 18.0042L32 11.016L31.4501 10.4952Z"
          fill={fill}
        />
        <rect x={12} y={3} width={30} height={30} rx={15} stroke="white" strokeWidth={2} shapeRendering="crispEdges" />
      </g>
      <defs>
        <filter
          id="filter0_d_754_29247"
          x={0}
          y={0}
          width={54}
          height={54}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={9} />
          <feGaussianBlur stdDeviation="5.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_754_29247" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_754_29247" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export default ArrowLeft;
