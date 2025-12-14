import { getQuestionsOnExam } from "@/lib/api/get-questions-exam";
import ExamQuestions from "./exam-question";

export async function ExamQuestionsData({ id }: { id: number }) {
  const data = await getQuestionsOnExam(id);

  return (
    <ExamQuestions
      questions={data.questions}
      examTitle={data.questions[0]?.exam?.title}
    />
  );
}
