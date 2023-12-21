import { IconProperty } from "@custom-types";

const IconSort = ({ width = 16, height = 16, fill = "#ffffff" }: IconProperty) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.79263 10.6213L12.0856 5.32876L17.3786 10.6213L17.7321 10.2678C18.3176 9.68226 18.3176 8.73226 17.7321 8.14676L12.0856 2.49976L6.43913 8.14676C5.85362 8.73226 5.85362 9.68226 6.43913 10.2678L6.79263 10.6213ZM17.7321 13.5608C18.3176 14.1463 18.3176 15.0963 17.7321 15.6823L12.0856 21.3288L6.43913 15.6823C5.85362 15.0963 5.85362 14.1463 6.43913 13.5608L6.79263 13.2073L12.0856 18.4998L17.3786 13.2073L17.7321 13.5608Z"
        fill={fill}
      />
    </svg>
  );
};

export default IconSort;
