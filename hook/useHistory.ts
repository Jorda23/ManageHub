"use client";

import { useMemo } from "react";

import { useHardwareSales } from "@/hook/useHardware";
import { useGrainSales } from "@/hook/useGrains";
import { usePropertyPayments } from "@/hook/useProperties";

import {
  mapGrainSaleToHistory,
  mapHardwareSaleToHistory,
  mapPropertyPaymentToHistory,
} from "@/components/History/history.utils";

import type { HistoryFiltersValue, HistoryItem } from "@/components/History/history.types";

const DEFAULT_FILTERS: HistoryFiltersValue = {
  search: "",
  type: "all",
  status: "all",
  from: "",
  to: "",
};

export function useHistory(filters: HistoryFiltersValue = DEFAULT_FILTERS) {
  const {
    data: hardwareSales = [],
    isLoading: isLoadingHardware,
    isError: isHardwareError,
  } = useHardwareSales();

  const {
    data: grainSales = [],
    isLoading: isLoadingGrains,
    isError: isGrainsError,
  } = useGrainSales();

  const {
    data: propertyPayments = [],
    isLoading: isLoadingProperties,
    isError: isPropertiesError,
  } = usePropertyPayments();

  const data = useMemo<HistoryItem[]>(() => {
    const hardwareItems =
      filters.type === "all" || filters.type === "hardware"
        ? hardwareSales.map(mapHardwareSaleToHistory)
        : [];

    const grainItems =
      filters.type === "all" || filters.type === "grains"
        ? grainSales.map(mapGrainSaleToHistory)
        : [];

    const propertyItems =
      filters.type === "all" || filters.type === "property"
        ? propertyPayments.map(mapPropertyPaymentToHistory)
        : [];

    return [...hardwareItems, ...grainItems, ...propertyItems]
      .filter((item) => filterBySearch(item, filters.search))
      .filter((item) => filterByStatus(item, filters.status))
      .filter((item) => filterByDateRange(item, filters.from, filters.to))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [filters, hardwareSales, grainSales, propertyPayments]);

  return {
    data,

    isLoading: isLoadingHardware || isLoadingGrains || isLoadingProperties,

    isError: isHardwareError || isGrainsError || isPropertiesError,
  };
}

function filterBySearch(item: HistoryItem, search: string) {
  const normalizedSearch = search.trim().toLowerCase();

  if (!normalizedSearch) {
    return true;
  }

  return (
    item.clientName.toLowerCase().includes(normalizedSearch) ||
    item.description.toLowerCase().includes(normalizedSearch) ||
    item.paymentMethod.toLowerCase().includes(normalizedSearch)
  );
}

function filterByStatus(item: HistoryItem, status: HistoryFiltersValue["status"]) {
  if (status === "all") {
    return true;
  }

  return item.status === status;
}

function filterByDateRange(item: HistoryItem, from: string, to: string) {
  const itemDate = new Date(item.createdAt);

  if (from) {
    const fromDate = new Date(`${from}T00:00:00`);

    if (itemDate < fromDate) {
      return false;
    }
  }

  if (to) {
    const toDate = new Date(`${to}T23:59:59.999`);

    if (itemDate > toDate) {
      return false;
    }
  }

  return true;
}
