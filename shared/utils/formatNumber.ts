import { formatPrice } from "./formatPrice";
import { normalizeCurrency } from "./currency";
import type { Currency } from "../types/api.types";

export const formatCurrency = (value: number, currency: string = "NIO"): string => {
  const safeCurrency = normalizeCurrency(currency) as Currency;

  return formatPrice(value, {
    locale: safeCurrency === "NIO" ? "es-NI" : "en-US",
    currency: safeCurrency,
  });
};
