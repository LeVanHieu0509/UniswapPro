import { TextAlign } from "@custom-types";

export type TableType = "string" | "date" | "number" | "status" | "percent" | "function" | "empty" | "rich-text" | "";

export interface TableConfig {
  key?: string;
  type?: TableType;
  label?: string;
  primary?: boolean;
  show?: boolean;
  sort?: boolean;
  config?: TableNodeConfig;
  isSticky?: boolean;
  colSpan?: number;
  sticky?: "left" | "right" | "";
  textAlign?: TextAlign;
  hideMobile?: boolean;
}

export interface DataTable {
  config: TableConfig;
  node: any;
  originData: any;
  renderFuncHeaderMobile?: any;
}

//Table Node
export interface TableNodeHeader {
  label: string;
  type: TableType;
  textAlign?: TextAlign;
  colSpan?: number;
  rowSpan?: number;
  isSticky?: boolean;
  isSpacing?: boolean;
  isBoto?: boolean;
}

export interface TableNodeBody {
  label: string;
  key: string;
  type: TableType;
  isNode?: boolean;
  primary?: boolean;
  isTitle?: boolean;
  isSticky?: boolean;
  isSpacing?: boolean;
  show?: boolean;
  onClick?: (value: any, attribute?: TableNodeBody) => void;
}

export interface TableNodeConfig {
  header: TableNodeHeader[][];
  body: TableNodeBody[];
  stickyIndex?: number;
}

export interface TableNoHeadConfig {
  label?: string;
  value?: any;
  type?: TableType;
  textAlignValue?: string;
}
