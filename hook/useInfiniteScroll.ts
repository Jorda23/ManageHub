import { useCallback, useEffect, useRef } from "react";

type UseInfiniteScrollOptions = {
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  useViewport?: boolean;
};

export function useInfiniteScroll<TElement extends HTMLElement>({
  hasMore,
  isLoadingMore,
  onLoadMore,
  useViewport = false,
}: UseInfiniteScrollOptions) {
  const rootRef = useRef<TElement | null>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const onLoadMoreRef = useRef(onLoadMore);

  const hasMoreRef = useRef(hasMore);

  const isLoadingMoreRef = useRef(isLoadingMore);

  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  useEffect(() => {
    isLoadingMoreRef.current = isLoadingMore;
  }, [isLoadingMore]);

  const disconnect = useCallback(() => {
    observerRef.current?.disconnect();

    observerRef.current = null;
  }, []);

  const connect = useCallback(
    (target: Element) => {
      disconnect();

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting && hasMoreRef.current && !isLoadingMoreRef.current) {
            onLoadMoreRef.current();
          }
        },
        {
          root: useViewport ? null : rootRef.current,
          rootMargin: "160px 0px",
        },
      );

      observer.observe(target);

      observerRef.current = observer;
    },
    [disconnect, useViewport],
  );

  const sentinelRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (element) {
        connect(element);
      } else {
        disconnect();
      }
    },
    [connect, disconnect],
  );

  return {
    rootRef,
    sentinelRef,
  };
}
