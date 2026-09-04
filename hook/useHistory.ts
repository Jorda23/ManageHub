"use client";

import { useEffect, useMemo, useState } from "react";

import { getPaymentHistory } from "@/service/api";

import { INFINITE_SCROLL_PAGE_SIZE, useInfiniteList } from "@/hook/useInfiniteList";

import type { PaymentHistoryFilters, PaymentHistoryItem } from "@/shared/types/api.types";

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

  const query = useInfiniteList<PaymentHistoryItem>({
    queryKey: ["payment-history", normalizedFilters],
    queryFn: (page) =>
      getPaymentHistory({
        ...normalizedFilters,
        page,
        limit: INFINITE_SCROLL_PAGE_SIZE,
      }),
  });

  const items = useMemo(() => query.data?.pages.flatMap((page) => page) ?? [], [query.data]);

  return {
    items,
    isLoading: query.isLoading,
    isError: query.isError,
    hasMore: query.hasNextPage ?? false,
    isLoadingMore: query.isFetchingNextPage,
    loadMore: () => {
      void query.fetchNextPage();
    },
  };
}
