"use client";

import { useCallback, useState } from "react";

import type { ReportFilters } from "../types/reports.types";

export function useReportFilters() {
  const [filters, setFilters] = useState<ReportFilters>({});

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  return { filters, setFilters, clearFilters };
}