import { useTheme } from "styled-components";
import IconClose from "./source/close";
import Tick from "./source/tick";
import IconArrowDown from "./source/arrow-down";
import IconError from "./source/error-icon";
import SearchInputIcon from "./source/search-input";
import SearchPolicyIcon from "./source/search-policy";
import SearchBack from "./source/search-back";

const IconComponent = {
  close: IconClose,
  tick: Tick,
  "arrow-down": IconArrowDown,
  "error-icon": IconError,
  "search-input": SearchInputIcon,
  "search-policy": SearchPolicyIcon,
  "search-back": SearchBack,
};

export interface IconProps {
  size?: string | number;
  color?: string;
  fill?: string;
}

export type IconType = keyof typeof IconComponent;

interface IconsProps extends IconProps {
  icon: IconType;
  size?: number;
}

const Icons = ({ icon, color, ...res }: IconsProps) => {
  const Icon = IconComponent[icon];
  const theme = useTheme();
  const colorObj = theme.color.status as any;
  if (!Icon) return null;
  return <Icon {...res} color={colorObj[color] || color} />;
};

export default Icons;
