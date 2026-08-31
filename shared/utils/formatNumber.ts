import { formatPrice } from "./formatPrice";

export const formatCurrency = (value: number): string => {
  return formatPrice(value);
};
