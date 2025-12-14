import { ExamType } from "@/lib/types/exam";
import ExamCard from "./exam-card";
import { getExams } from "@/lib/api/get-exams";
import EmptyState from "../../_components/empty-state";

export default async function ExamList() {
  const exams = await getExams();
  const emptyExams = exams.length == 0;

  return (
    <div className="bg-white mt-2 h-screen p-6">
      {emptyExams && <EmptyState type="no-exams" />}
      {exams?.map((exam: ExamType) => (
        <ExamCard exam={exam} key={exam._id} />
      ))}
    </div>
  );
}
