import {
  GraduationCap,
  Home,
  BookOpenCheck,
  UserRound,
  CircleQuestionMark,
} from "lucide-react";

export const ROUTE_CONFIG = {
  "/diplomas": {
    title: "Diplomas",
    icon: GraduationCap,
    iconSize: 37,
  },
  "/exams": {
    title: "Exams",
    icon: BookOpenCheck,
    iconSize: 37,
  },
  "/account-settings": {
    title: "Account Settings",
    icon: UserRound,
    iconSize: 37,
  },
  "/questions": {
    title: "Questions",
    icon: CircleQuestionMark,
    iconSize: 37,
  },
} as const;

export const DEFAULT_ROUTE = {
  title: "Dashboard",
  icon: Home,
  iconSize: 37,
} as const;

export function findMatchingRoute(path: string) {
  if (ROUTE_CONFIG[path as keyof typeof ROUTE_CONFIG]) {
    return ROUTE_CONFIG[path as keyof typeof ROUTE_CONFIG];
  }

  for (const [route, config] of Object.entries(ROUTE_CONFIG)) {
    if (path.startsWith(route + "/")) {
      return config;
    }
  }

  return DEFAULT_ROUTE;
}

export function isExamQuestionsPage(
  pathname: string,
  examId?: string
): boolean {
  return !!examId && pathname.includes(`/questions/${examId}`);
}
