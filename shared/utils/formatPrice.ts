export type FormatPriceOptions = {
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

export function formatPrice(value: number, options: FormatPriceOptions = {}): string {
  const { locale = "es-US", currency = "USD" } = options;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    ...(options.minimumFractionDigits !== undefined && {
      minimumFractionDigits: options.minimumFractionDigits,
    }),
    ...(options.maximumFractionDigits !== undefined && {
      maximumFractionDigits: options.maximumFractionDigits,
    }),
  }).format(value);
}