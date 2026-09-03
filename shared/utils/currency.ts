import type { Currency } from "@/shared/types/api.types";

export const currencies: readonly Currency[] = ["USD", "NIO"];

export const currencyLabels: Record<Currency, string> = {
  USD: "Dólar estadounidense (USD)",
  NIO: "Córdoba nicaragüense (NIO)",
};

export function normalizeCurrency(value: unknown): Currency {
  const normalized = String(value ?? "")
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .replace(/\$/g, "$")
    .replace(/\s*\$\s*/g, "$")
    .replace(/\s+/g, " ")
    .trim();

  const usdAliases = [
    "USD",
    "US$",
    "DOLAR",
    "DOLARES",
    "US DOLLAR",
    "US DOLLARS",
    "DOLLAR",
    "DOLLARS",
    "$",
  ];

  const nioAliases = [
    "NIO",
    "C$",
    "CS",
    "CORDOBA",
    "CORDOBA NICARAGUENSE",
    "C ORDOBA",
    "CORDOBA NICARAGUENSES",
  ];

  if (usdAliases.includes(normalized)) {
    return "USD";
  }

  if (nioAliases.includes(normalized)) {
    return "NIO";
  }

  return "NIO";
}

export const currencySymbols: Record<Currency, string> = {
  USD: "$",
  NIO: "C$",
};

export function getCurrencySymbol(currency: unknown): string {
  return currencySymbols[normalizeCurrency(currency)] ?? "C$";
}
