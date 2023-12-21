import { IconProperty } from "@custom-types";

const ArrowRight = ({ width = 24, height = 24, fill = "#E87722" }: IconProperty) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.54991 19.5048C7.24705 20.1651 8.37888 20.1651 9.07602 19.5048L17 12.0006L9.07602 4.49637C8.37914 3.8364 7.24858 3.83642 6.55155 4.48523L6 5.00759L13.3791 11.9958L6 18.984L6.54991 19.5048Z"
        fill={fill}
      />
    </svg>
  );
};

export default ArrowRight;
