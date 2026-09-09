import { formatCurrency } from "@/shared";

import type { Currency } from "@/shared/types/api.types";

const dateFormatter = new Intl.DateTimeFormat("es-NI", {
  year: "numeric",
  month: "short",
  day: "2-digit",
});

export function formatReportDate(value: string | null | undefined): string {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return dateFormatter.format(date);
}

export function formatMoney(value: number, currency: Currency): string {
  return formatCurrency(value, currency);
}

const quantityFormatter = new Intl.NumberFormat("es-NI", {
  maximumFractionDigits: 2,
});

export function formatQuantity(value: number): string {
  return quantityFormatter.format(Number.isFinite(value) ? value : 0);
}