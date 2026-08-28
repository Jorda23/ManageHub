const currencyFormatter = new Intl.NumberFormat("es-US", {
  style: "currency",
  currency: "USD",
});

export const formatCurrency = (value: number): string => {
  return currencyFormatter.format(value);
};
