import { IconType } from "components/icons";

export type ModifiedData<T> = {
  [key in keyof T]?: any;
};

export type Colors =
  | "blue-gray"
  | "gray"
  | "brown"
  | "deep-orange"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "light-green"
  | "green"
  | "teal"
  | "cyan"
  | "light-blue"
  | "blue"
  | "indigo"
  | "deep-purple"
  | "purple"
  | "pink"
  | "red";
export interface IconProps {
  size?: string | number;
  color?: string;
}

export interface ValueLabel {
  value: any;
  label: any;
}

//sidebar
export interface SubMenu {
  title?: string;
  href?: string;
  disable?: boolean;
}
export interface ListMenu {
  title?: string;
  icon?: IconType;
  href?: string;
  subMenu?: SubMenu[];
}

export interface ListSidebar {
  label?: string;
  menu: ListMenu[];
}

export interface ListProfile {
  href?: string;
  title: string;
}

export interface ListNoti {
  key: string;
  title: string;
  des: string;
  icon: string;
}

export interface HelpTextProps {
  countNow: number;
  maxCount: number;
  content: string;
}

export interface IconProperty {
  stroke?: string;
  width?: string | number;
  height?: string | number;
  fill?: string;
}

export interface ValueLabel {
  value: any;
  label: any;
  type?: any;
}

export interface TitleDes {
  title: string;
  des: string;
}

export interface ValueLabelShow extends ValueLabel {
  show?: boolean;
}

export interface TaskListProps {
  name: string;
  status: string;
  day?: string | number;
}

export interface ResponseAPI {
  errMsg: string;
  status: string;
}

export type TextAlign = "left" | "right" | "center" | "";

export interface SagaAction<Payload> {
  payload: Payload;
  type: string;
}

export interface IconProperty {
  stroke?: string;
  width?: string | number;
  height?: string | number;
  fill?: string;
}
