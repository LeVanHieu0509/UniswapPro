import { IconProperty } from "@custom-types";

const IconSortDown = ({ width = 16, height = 16, fill = "#ffffff" }: IconProperty) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
      <path
        d="M17.732,14.061C18.318,14.647 18.318,15.597 17.732,16.183L12.086,21.829L6.439,16.183C5.854,15.597 5.854,14.647 6.439,14.061L6.793,13.708L12.086,19L17.379,13.708L17.732,14.061Z"
        fill={fill}
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default IconSortDown;
