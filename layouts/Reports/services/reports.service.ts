import {
  getGrainSalesReport as fetchGrainSalesReport,
  getHardwareSalesReport as fetchHardwareSalesReport,
  getInventoryReport as fetchInventoryReport,
  getPendingAccountsReport as fetchPendingAccountsReport,
  getProfitReport as fetchProfitReport,
  getPropertyPaymentsReport as fetchPropertyPaymentsReport,
  getSalesReport as fetchSalesReport,
  getSoldPropertiesReport as fetchSoldPropertiesReport,
} from "@/service/api";

import type {
  GrainSaleRow,
  HardwareSaleRow,
  InventoryRow,
  PendingAccountRow,
  ProfitReportData,
  PropertyPaymentRow,
  ReportFilters,
  SaleReportRow,
  SoldPropertyRow,
} from "../types/reports.types";

function withDates(filters: ReportFilters): ReportFilters {
  return { from: filters.from, to: filters.to };
}

function sortByDateDesc<T extends { date: string }>(rows: T[]): T[] {
  return [...rows].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function sortByDateDescNullable<T extends { date: string | null }>(rows: T[]): T[] {
  return [...rows].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export async function getSalesReport(filters: ReportFilters): Promise<SaleReportRow[]> {
  return sortByDateDesc(await fetchSalesReport(withDates(filters)));
}

export async function getSoldPropertiesReport(
  filters: ReportFilters,
): Promise<SoldPropertyRow[]> {
  return sortByDateDescNullable(await fetchSoldPropertiesReport(withDates(filters)));
}

export async function getPropertyPaymentsReport(
  filters: ReportFilters,
): Promise<PropertyPaymentRow[]> {
  return sortByDateDesc(await fetchPropertyPaymentsReport(withDates(filters)));
}

export async function getPendingAccountsReport(
  filters: ReportFilters,
): Promise<PendingAccountRow[]> {
  return fetchPendingAccountsReport(withDates(filters));
}

export async function getInventoryReport(): Promise<InventoryRow[]> {
  return fetchInventoryReport();
}

export async function getGrainSalesReport(filters: ReportFilters): Promise<GrainSaleRow[]> {
  return sortByDateDesc(await fetchGrainSalesReport(withDates(filters)));
}

export async function getHardwareSalesReport(
  filters: ReportFilters,
): Promise<HardwareSaleRow[]> {
  return sortByDateDesc(await fetchHardwareSalesReport(withDates(filters)));
}

export async function getProfitReport(filters: ReportFilters): Promise<ProfitReportData> {
  return fetchProfitReport(withDates(filters));
}