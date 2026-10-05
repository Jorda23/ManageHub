import { act, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useInfiniteScroll } from "./useInfiniteScroll";

class IntersectionObserverMock implements IntersectionObserver {
  readonly root: Element | Document | null;
  readonly rootMargin = "160px 0px";
  readonly thresholds = [0];
  readonly observe = vi.fn();
  readonly unobserve = vi.fn();
  readonly disconnect = vi.fn();
  readonly takeRecords = vi.fn((): IntersectionObserverEntry[] => []);

  constructor(
    private readonly callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
  ) {
    this.root = options?.root ?? null;
  }

  trigger(isIntersecting: boolean) {
    this.callback(
      [{ isIntersecting } as IntersectionObserverEntry],
      this,
    );
  }
}

function ScrollHarness({ hasMore, onLoadMore }: { hasMore: boolean; onLoadMore: () => void }) {
  const { sentinelRef } = useInfiniteScroll({
    hasMore,
    isLoadingMore: false,
    onLoadMore,
    useViewport: true,
  });

  return <div>{hasMore && <div ref={sentinelRef} data-testid="sentinel" />}</div>;
}

describe("useInfiniteScroll", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("observes a sentinel mounted when hasMore changes from false to true", () => {
    const observers: IntersectionObserverMock[] = [];
    vi.stubGlobal(
      "IntersectionObserver",
      class extends IntersectionObserverMock {
        constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
          super(callback, options);
          observers.push(this);
        }
      },
    );
    const onLoadMore = vi.fn();
    const { rerender, getByTestId } = render(
      <ScrollHarness hasMore={false} onLoadMore={onLoadMore} />,
    );

    rerender(<ScrollHarness hasMore onLoadMore={onLoadMore} />);

    expect(observers[0]?.observe).toHaveBeenCalledWith(getByTestId("sentinel"));
    expect(observers[0]?.root).toBeNull();

    act(() => {
      observers[0]?.trigger(true);
    });

    expect(onLoadMore).toHaveBeenCalledOnce();
  });
});
