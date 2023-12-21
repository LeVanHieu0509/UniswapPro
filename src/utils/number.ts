export const formatCurrency = (r = 0, withCurrency = true) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(r);
};

export const formattedNumber = (n: number = 0, fixed = 2) =>
  n?.toLocaleString("de-DE", {
    style: "decimal",
    useGrouping: true,
    maximumFractionDigits: fixed,
  });

export const formatSize = (r = 0) => {
  if (r > 1000000) {
    return (Math.round(r / 100000) * 10).toString().replace(/(\d)(?=(\d{3})+\b)/g, "$1.") + "Mb";
  }
  if (r > 1000) {
    return (
      Math.round(r / 1000)
        .toString()
        .replace(/(\d)(?=(\d{3})+\b)/g, "$1.") + "kb"
    );
  }
};
