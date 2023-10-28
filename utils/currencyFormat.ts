export const thousandSeparator = (x: Number) => {
  return Number(x).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  });
};
