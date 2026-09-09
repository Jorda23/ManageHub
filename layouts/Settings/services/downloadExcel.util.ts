import dayjs from "dayjs";
import * as XLSX from "xlsx";

import type { BackupExportPayload } from "@/shared/types/api.types";

const LABELS: Record<string, string> = {
  hardware: "Ferretería",
  grains: "Granos",
  property: "Terrenos",
  products: "Productos",
  sales: "Ventas",
  properties: "Terrenos",
  payments: "Pagos",
};

type SheetData = {
  name: string;
  rows: Record<string, unknown>[];
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isLeafRecord(value: unknown): value is Record<string, unknown> {
  return isPlainObject(value) && !Object.values(value).some((child) => Array.isArray(child));
}

function normalizeCell(value: unknown): unknown {
  if (value === null || value === undefined) {
    return "";
  }

  if (isPlainObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }

  return value;
}

function normalizeRecord(record: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(record)) {
    out[key] = normalizeCell(value);
  }

  return out;
}

function rowsOf(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isLeafRecord).map(normalizeRecord);
}

function humanize(value: string): string {
  const cleaned = value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim();

  return cleaned
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => {
      const known = LABELS[word.toLowerCase()] ?? word;
      return known.charAt(0).toUpperCase() + known.slice(1);
    })
    .join(" ");
}

function collectSheets(source: unknown, path: string[]): SheetData[] {
  if (Array.isArray(source)) {
    const rows = rowsOf(source);
    const sheets: SheetData[] = [];

    if (rows.length > 0) {
      sheets.push({ name: path.map(humanize).join(" - ") || "Datos", rows });
    }

    for (const item of source) {
      if (!isLeafRecord(item)) {
        sheets.push(...collectSheets(item, path));
      }
    }

    return sheets;
  }

  if (!isPlainObject(source)) {
    return [];
  }

  const sheets: SheetData[] = [];

  for (const [key, child] of Object.entries(source)) {
    if (
      Array.isArray(child) &&
      child.length > 0 &&
      isPlainObject(child[0]) &&
      typeof child[0].kind === "string" &&
      Array.isArray(child[0].items)
    ) {
      for (const entry of child) {
        if (
          isPlainObject(entry) &&
          typeof entry.kind === "string" &&
          Array.isArray(entry.items)
        ) {
          sheets.push(...collectSheets(entry.items, [key, entry.kind]));
        }
      }
    } else {
      sheets.push(...collectSheets(child, [...path, key]));
    }
  }

  return sheets;
}

function uniqueSheetNames(sheets: SheetData[]): SheetData[] {
  const used = new Map<string, number>();

  return sheets.map((sheet) => {
    const base = (sheet.name.slice(0, 31) || "Datos").trim();
    const count = used.get(base) ?? 0;

    used.set(base, count + 1);

    const name = count === 0 ? base : `${base} (${count + 1})`.slice(0, 31);

    return { name, rows: sheet.rows };
  });
}

function toWorksheet(rows: Record<string, unknown>[]): XLSX.WorkSheet {
  const headers = Array.from(
    rows.reduce((keys, row) => {
      for (const key of Object.keys(row)) {
        keys.add(key);
      }
      return keys;
    }, new Set<string>()),
  );

  const aoa = [headers, ...rows.map((row) => headers.map((key) => row[key] ?? ""))];

  const worksheet = XLSX.utils.aoa_to_sheet(aoa);

  worksheet["!cols"] = headers.map((_, index) => ({
    wch: Math.min(
      40,
      Math.max(
        10,
        ...aoa.map((row) => {
          const value = row[index];
          return String(value).length;
        }),
      ),
    ),
  }));

  return worksheet;
}

export function downloadExcelFile(payload: BackupExportPayload) {
  const sheets = uniqueSheetNames(collectSheets(payload, []));

  const workbook = XLSX.utils.book_new();

  for (const sheet of sheets) {
    XLSX.utils.book_append_sheet(workbook, toWorksheet(sheet.rows), sheet.name);
  }

  XLSX.writeFile(workbook, `respaldo-negocio-excel-${dayjs().format("YYYY-MM-DD_HH-mm")}.xlsx`);
}