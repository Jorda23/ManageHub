import { useQuery } from "@tanstack/react-query";

import { getDashboard, type DashboardQuery } from "@/service/api";

import type { DashboardResponse } from "@/shared/types/api.types";

const DASHBOARD_QUERY_KEY = ["dashboard"];

export const useDashboard = (query: DashboardQuery = {}) => {
  const normalizedQuery: DashboardQuery = {
    period: "month",
    salesPeriod: "week",
    ...query,
  };
  const validCustomRange =
    normalizedQuery.salesPeriod !== "custom" ||
    Boolean(
      normalizedQuery.from &&
        normalizedQuery.to &&
        normalizedQuery.from <= normalizedQuery.to,
    );

  return useQuery<DashboardResponse, Error>({
    queryKey: [...DASHBOARD_QUERY_KEY, normalizedQuery],
    queryFn: () => getDashboard(normalizedQuery),
    placeholderData: (previousData) => previousData,
    enabled: validCustomRange,
  });
};
