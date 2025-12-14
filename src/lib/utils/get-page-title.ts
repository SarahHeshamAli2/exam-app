import { findMatchingRoute } from "../route.config";

export function getPageTitle(
  pathname: string,
  shouldFetchExamTitle: boolean,
  examTitle?: string
) {
  if (shouldFetchExamTitle && examTitle) {
    return `[${examTitle}] Questions`;
  }

  const route = findMatchingRoute(pathname);
  return route.title;
}

export function formatSegmentLabel(segment: string): string {
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}
