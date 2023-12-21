import { TableConfig } from "@custom-types/config-table";
import { coverDateNumberToString, formatNumber } from "utils";

export const formatValueTable = (data: any, config: TableConfig) => {
  if (!data[config.key] && config.type !== "number" && config.type !== "percent") {
    return "-";
  }

  switch (config.type) {
    case "date":
      return coverDateNumberToString(data[config.key]);
    case "number":
      return formatNumber(data[config.key]);
    case "percent":
      return `${data[config.key] ?? 0}%`;
    default:
      return data[config.key];
  }
};

export const formatValue = (value: any, type?: "number" | "date" | "percent") => {
  if (!value && type !== "number" && type !== "percent") {
    return "-";
  }
  switch (type) {
    case "date":
      return coverDateNumberToString(value);
    case "number":
      return formatNumber(value);
    case "percent":
      return `${value ?? 0}%`;
    default:
      return value;
  }
};

export function formatCurrency(amount: number) {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return amount ? formatter.format(amount) : 0;
}
