import React, { Suspense } from "react";
import { Metadata } from "next";

import { ExamQuestionsData } from "../_components/exam-questions-data";
import ExamQuestionsSkeleton from "@/components/skeletons/questions.skeleton";

type PageProps = {
  params: Promise<{ id: number }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Exam Questions - ${id}`,
    description: `View and answer questions for exam ${id}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<ExamQuestionsSkeleton />}>
      <ExamQuestionsData id={id} />
    </Suspense>
  );
}
