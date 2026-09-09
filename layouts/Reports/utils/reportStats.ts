import { convertCurrency, formatCurrency, normalizeCurrency, roundCurrency } from "@/shared";

import type { Currency } from "@/shared/types/api.types";

import type { ReportFilters, ReportStatus } from "../types/reports.types";

export type AmountSummary = {
  total: number;
  currency: Currency;
  isMixed: boolean;
  count: number;
  parts: Partial<Record<Currency, number>>;
};

export function summarizeAmounts(
  items: ReadonlyArray<{ amount: number; currency: Currency }>,
): AmountSummary {
  const parts: Partial<Record<Currency, number>> = {};
  let count = 0;

  for (const item of items) {
    const currency = normalizeCurrency(item.currency);
    const amount = Number.isFinite(item.amount) ? item.amount : 0;

    parts[currency] = (parts[currency] ?? 0) + amount;
    count += 1;
  }

  const currenciesWithValue = (
    Object.keys(parts) as Currency[]
  ).filter((key) => (parts[key] as number) !== 0);

  const isMixed = currenciesWithValue.length > 1;
  const base: Currency = isMixed ? "NIO" : currenciesWithValue[0] ?? "NIO";

  let total = 0;

  for (const currency of Object.keys(parts) as Currency[]) {
    total += convertCurrency(parts[currency] as number, currency, base);
  }

  return {
    total: roundCurrency(total),
    currency: base,
    isMixed,
    count,
    parts,
  };
}

export function formatSummaryValue(summary: AmountSummary): string {
  return formatCurrency(summary.total, summary.currency);
}

export function formatSummaryDetail(summary: AmountSummary): string {
  if (!summary.isMixed) {
    return "";
  }

  const entries = (Object.keys(summary.parts) as Currency[]).filter(
    (key) => (summary.parts[key] as number) !== 0,
  );

  return entries.map((currency) => `${formatCurrency(summary.parts[currency] as number, currency)} ${currency}`).join(" + ");
}

export function matchesDateRange(
  value: string | null | undefined,
  filters: ReportFilters,
): boolean {
  if (!value) {
    return !filters.from && !filters.to;
  }

  const timestamp = new Date(value).getTime();

  if (!Number.isFinite(timestamp)) {
    return false;
  }

  if (filters.from && timestamp < new Date(filters.from).getTime()) {
    return false;
  }

  if (filters.to && timestamp > new Date(filters.to).getTime()) {
    return false;
  }

  return true;
}

export function propertySaleStatus(status: string | undefined): ReportStatus {
  return status === "Paid" ? "Pagado" : "Pendiente";
}

export function pendingAccountStatus(nextPaymentDate?: string | null): ReportStatus {
  if (!nextPaymentDate) {
    return "Pendiente";
  }

  const due = new Date(nextPaymentDate).getTime();

  if (!Number.isFinite(due)) {
    return "Pendiente";
  }

  return due < Date.now() ? "Atrasado" : "Pendiente";
}