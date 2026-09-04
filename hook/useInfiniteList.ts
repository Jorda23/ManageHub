import { keepPreviousData, useInfiniteQuery, type QueryKey } from "@tanstack/react-query";

export const INFINITE_SCROLL_PAGE_SIZE = 20;

type UseInfiniteListOptions<TItem> = {
  queryKey: QueryKey;
  queryFn: (page: number) => Promise<TItem[]>;
  pageSize?: number;
};

export function useInfiniteList<TItem>({
  queryKey,
  queryFn,
  pageSize = INFINITE_SCROLL_PAGE_SIZE,
}: UseInfiniteListOptions<TItem>) {
  return useInfiniteQuery<TItem[]>({
    queryKey,
    queryFn: ({ pageParam }) => queryFn(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length >= pageSize ? allPages.length + 1 : undefined,
    placeholderData: keepPreviousData,
  });
}
