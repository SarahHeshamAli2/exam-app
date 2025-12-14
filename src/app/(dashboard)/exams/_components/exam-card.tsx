import { ExamType } from "@/lib/types/exam";
import { Timer } from "lucide-react";
import Link from "next/link";
interface ExamCardProps {
  exam: ExamType;
}
export default function ExamCard({ exam }: ExamCardProps) {
  return (
    <Link
      href={`/exams/questions/${exam._id}`}
      className="exam flex justify-between bg-blue-50 p-4 font-mono mt-4 ">
      <div className="title">
        <p className="text-xl text-blue-600 font-semibold">{exam.title}</p>
        <span className="text-sm text-gray-500">
          {exam.numberOfQuestions} questions
        </span>
      </div>
      <div className="duration flex items-center gap-2">
        <Timer color="gray" />
        <span className="text-sm">duration: {exam.duration} mins</span>
      </div>
    </Link>
  );
}
