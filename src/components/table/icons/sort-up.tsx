import { IconProperty } from "@custom-types";

const IconSortUp = ({ width = 16, height = 16, fill = "#ffffff" }: IconProperty) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
      <path
        d="M6.793,11.121L12.086,5.829L17.379,11.121L17.732,10.768C18.318,10.182 18.318,9.233 17.732,8.647L12.086,3L6.439,8.647C5.854,9.233 5.854,10.182 6.439,10.768L6.793,11.121Z"
        fill={fill}
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default IconSortUp;
