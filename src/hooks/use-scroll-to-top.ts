interface ScrollToTopOptions {
  behavior?: ScrollBehavior;
  top?: number;
  left?: number;
}

export function useScrollToTop(options?: ScrollToTopOptions) {
  const { behavior = "smooth", top = 0, left = 0 } = options || {};

  const scrollToTop = () => {
    window.scrollTo({
      top,
      left,
      behavior,
    });
  };

  return scrollToTop;
}
