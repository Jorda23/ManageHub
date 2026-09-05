import { currencySymbols, normalizeCurrency } from "./currency";

export type FormatPriceOptions = {
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

export function formatPrice(value: number, options: FormatPriceOptions = {}): string {
  const { locale = "es-US", currency = "USD" } = options;
  const safeCurrency = normalizeCurrency(currency);

  const minimumFractionDigits = options.minimumFractionDigits ?? 2;
  const maximumFractionDigits = options.maximumFractionDigits ?? minimumFractionDigits;

  const quantity = new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);

  const symbol = currencySymbols[safeCurrency] ?? safeCurrency;
  const spacer = safeCurrency === "NIO" ? " " : "";

  return `${symbol}${spacer}${quantity}`;
}
