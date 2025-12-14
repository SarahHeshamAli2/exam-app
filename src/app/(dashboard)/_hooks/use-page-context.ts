import { useParams, usePathname } from "next/navigation";
import { isExamQuestionsPage } from "@/lib/route.config";
import { useGetExamTitle } from "./use-get-exam-title";

export function usePageContext() {
  const pathname = usePathname();
  const params = useParams();
  const examId = typeof params.id === "string" ? params.id : undefined;
  const shouldFetchExamTitle = isExamQuestionsPage(pathname, examId);

  const { data, isPending } = useGetExamTitle(
    shouldFetchExamTitle ? examId : undefined
  );

  return {
    pathname,
    params,
    examId,
    shouldFetchExamTitle,
    examTitle: data?.exam?.title,
    isLoadingExamTitle: isPending,
  };
}
