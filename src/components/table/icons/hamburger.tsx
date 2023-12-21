import { IconProperty } from "@custom-types";

const IconHamburger = ({ width = 24, height = 24, fill = "#E87722" }: IconProperty) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 8H3V10.6667H21V8ZM3 16H21V13.3333H3V16Z" fill={fill} />
    </svg>
  );
};

export default IconHamburger;
