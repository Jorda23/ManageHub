import { act, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useInfiniteScroll } from "./useInfiniteScroll";

class IntersectionObserverMock implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "160px 0px";
  readonly thresholds = [0];
  readonly observe = vi.fn();
  readonly unobserve = vi.fn();
  readonly disconnect = vi.fn();
  readonly takeRecords = vi.fn((): IntersectionObserverEntry[] => []);

  constructor(private readonly callback: IntersectionObserverCallback) {}

  trigger(isIntersecting: boolean) {
    this.callback(
      [{ isIntersecting } as IntersectionObserverEntry],
      this,
    );
  }
}

function ScrollHarness({ hasMore, onLoadMore }: { hasMore: boolean; onLoadMore: () => void }) {
  const { rootRef, sentinelRef } = useInfiniteScroll<HTMLDivElement>({
    hasMore,
    isLoadingMore: false,
    onLoadMore,
  });

  return (
    <div ref={rootRef}>
      {hasMore && <div ref={sentinelRef} data-testid="sentinel" />}
    </div>
  );
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
        constructor(callback: IntersectionObserverCallback) {
          super(callback);
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

    act(() => {
      observers[0]?.trigger(true);
    });

    expect(onLoadMore).toHaveBeenCalledOnce();
  });
});
