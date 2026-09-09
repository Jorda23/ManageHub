"use client";

import { useQuery } from "@tanstack/react-query";

import { getSystemInfo } from "../services/settings.service";

import type { SystemInfo } from "@/shared/types/api.types";

const SYSTEM_INFO_QUERY_KEY = ["system-info"];

export function useSystemInfo() {
  return useQuery<SystemInfo, Error>({
    queryKey: SYSTEM_INFO_QUERY_KEY,
    queryFn: getSystemInfo,
    staleTime: 60_000,
  });
}