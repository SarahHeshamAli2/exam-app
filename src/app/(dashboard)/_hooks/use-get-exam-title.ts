import { getExamTitleService } from "@/lib/services/exams.service";
import { useQuery } from "@tanstack/react-query";

export function useGetExamTitle(examId: string | undefined | string[]) {
  const { data, error, isPending } = useQuery({
    queryKey: ["exam", examId],
    queryFn: () => {
      console.log("Query function running for id:", examId);
      return getExamTitleService(examId!);
    },
    enabled: !!examId && typeof examId === "string",
  });
  return {
    data,
    error,
    isPending,
  };
}
