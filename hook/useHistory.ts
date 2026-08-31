"use client";

import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { getPaymentHistory } from "@/service/api";

import type { PaymentHistoryFilters, PaymentHistoryItem } from "@/shared/types/api.types";

const HISTORY_QUERY_KEY = ["payment-history"];

const SEARCH_DEBOUNCE_MS = 400;

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounced;
}

export function usePaymentHistory(filters?: PaymentHistoryFilters) {
  const debouncedSearch = useDebouncedValue(filters?.search ?? "", SEARCH_DEBOUNCE_MS);

  const normalizedFilters: PaymentHistoryFilters = {
    ...filters,
    search: debouncedSearch,
  };

  return useQuery<PaymentHistoryItem[], Error>({
    queryKey: [...HISTORY_QUERY_KEY, normalizedFilters],
    queryFn: () => getPaymentHistory(normalizedFilters),
    placeholderData: (previousData) => previousData,
  });
}
