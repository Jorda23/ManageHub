import { useQuery } from "@tanstack/react-query";

import { getDashboard } from "@/service/api";

import type { DashboardResponse } from "@/shared/types/api.types";

const DASHBOARD_QUERY_KEY = ["dashboard"];

export const useDashboard = (period: "month" | "year" = "month") => {
  return useQuery<DashboardResponse, Error>({
    queryKey: [...DASHBOARD_QUERY_KEY, period],
    queryFn: () => getDashboard(period),
  });
};
