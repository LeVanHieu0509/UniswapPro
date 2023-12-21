import React from "react";

const ArrowRight = ({ width = 54, height = 54, fill = "#E87722" }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_754_29246)">
        <rect x={11} y={2} width={32} height={32} rx={16} fill="white" shapeRendering="crispEdges" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.5499 25.5048C22.247 26.1651 23.3789 26.1651 24.076 25.5048L32 18.0006L24.076 10.4964C23.3791 9.8364 22.2486 9.83642 21.5516 10.4852L21 11.0076L28.3791 17.9958L21 24.984L21.5499 25.5048Z"
          fill="#E87722"
        />
        <rect x={12} y={3} width={30} height={30} rx={15} stroke="white" strokeWidth={2} shapeRendering="crispEdges" />
      </g>
      <defs>
        <filter
          id="filter0_d_754_29246"
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
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_754_29246" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_754_29246" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export default ArrowRight;
