"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import {
  getGrainSalesReport,
  getHardwareSalesReport,
  getInventoryReport,
  getPendingAccountsReport,
  getProfitReport,
  getPropertyPaymentsReport,
  getSalesReport,
  getSoldPropertiesReport,
} from "../services/reports.service";

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

export function useSalesReport(filters: ReportFilters) {
  return useQuery<SaleReportRow[], Error>({
    queryKey: ["reports", "sales", filters],
    queryFn: () => getSalesReport(filters),
    placeholderData: keepPreviousData,
  });
}

export function useSoldPropertiesReport(filters: ReportFilters) {
  return useQuery<SoldPropertyRow[], Error>({
    queryKey: ["reports", "sold-properties", filters],
    queryFn: () => getSoldPropertiesReport(filters),
    placeholderData: keepPreviousData,
  });
}

export function usePropertyPaymentsReport(filters: ReportFilters) {
  return useQuery<PropertyPaymentRow[], Error>({
    queryKey: ["reports", "property-payments", filters],
    queryFn: () => getPropertyPaymentsReport(filters),
    placeholderData: keepPreviousData,
  });
}

export function usePendingAccountsReport(filters: ReportFilters) {
  return useQuery<PendingAccountRow[], Error>({
    queryKey: ["reports", "pending-accounts", filters],
    queryFn: () => getPendingAccountsReport(filters),
    placeholderData: keepPreviousData,
  });
}

export function useInventoryReport() {
  return useQuery<InventoryRow[], Error>({
    queryKey: ["reports", "inventory"],
    queryFn: getInventoryReport,
    placeholderData: keepPreviousData,
  });
}

export function useGrainSalesReport(filters: ReportFilters) {
  return useQuery<GrainSaleRow[], Error>({
    queryKey: ["reports", "grain-sales", filters],
    queryFn: () => getGrainSalesReport(filters),
    placeholderData: keepPreviousData,
  });
}

export function useHardwareSalesReport(filters: ReportFilters) {
  return useQuery<HardwareSaleRow[], Error>({
    queryKey: ["reports", "hardware-sales", filters],
    queryFn: () => getHardwareSalesReport(filters),
    placeholderData: keepPreviousData,
  });
}

export function useProfitReport(filters: ReportFilters) {
  return useQuery<ProfitReportData, Error>({
    queryKey: ["reports", "profit", filters],
    queryFn: () => getProfitReport(filters),
    placeholderData: keepPreviousData,
  });
}