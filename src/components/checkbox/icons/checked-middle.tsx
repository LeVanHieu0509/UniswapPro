import { IconProperty } from "@custom-types";

const IconCheckedMiddle = ({ width = 20, height = 20, fill = "white", stroke = "#E87722" }: IconProperty) => {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.63636 0C1.62806 0 0 1.62806 0 3.63636V16.3636C0 18.3719 1.62806 20 3.63636 20H16.3636C18.3719 20 20 18.3719 20 16.3636V3.63636C20 1.62806 18.3719 0 16.3636 0H3.63636Z"
        fill={fill}
      />
      <path
        d="M4 10C4 9.44772 4.44772 9 5 9H15C15.5523 9 16 9.44772 16 10C16 10.5523 15.5523 11 15 11H5C4.44772 11 4 10.5523 4 10Z"
        fill={stroke}
      />
    </svg>
  );
};

export default IconCheckedMiddle;
