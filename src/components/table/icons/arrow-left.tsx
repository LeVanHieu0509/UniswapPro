import { IconProperty } from "@custom-types";

const ArrowLeft = ({ width = 24, height = 24, fill = "#E87722" }: IconProperty) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.4501 4.49516C15.753 3.83495 14.6211 3.83495 13.924 4.49516L6 11.9994L13.924 19.5036C14.6209 20.1636 15.7514 20.1636 16.4484 19.5148L17 18.9924L9.62092 12.0042L17 5.01597L16.4501 4.49516Z"
        fill={fill}
      />
    </svg>
  );
};

export default ArrowLeft;
