import { Suspense } from "react";
import { ExamListSkeleton } from "@/components/skeletons/exams.skeleton";
import ExamList from "./_components/exam-list";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Elevate Exams",
  description: "View and download your exam certificate",
};

export default async function page() {
  return (
    <Suspense fallback={<ExamListSkeleton />}>
      <ExamList />
    </Suspense>
  );
}
