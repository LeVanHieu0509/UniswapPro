import { IconProperty } from "@custom-types";

const SearchPolicyIcon = ({ width = 24, height = 24, fill = "#E87722" }: IconProperty) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 3C6.15 3 3 6.15 3 10C3 13.85 6.15 17 10 17C13.85 17 17 13.85 17 10C17 6.15 13.85 3 10 3ZM10 15C7.25 15 5 12.75 5 10C5 7.25 7.25 5 10 5C12.75 5 15 7.25 15 10C15 12.75 12.75 15 10 15Z"
        fill={fill}
      />
      <path
        d="M20.3504 18.9498L16.7004 15.2998L16.3504 15.6498C15.7504 16.2498 15.7504 17.1998 16.3504 17.7498L18.9504 20.3498C19.1504 20.5498 19.4504 20.5498 19.6504 20.3498L20.3504 19.6498C20.5504 19.4498 20.5504 19.1498 20.3504 18.9498Z"
        fill={fill}
      />
    </svg>
  );
};

export default SearchPolicyIcon;
