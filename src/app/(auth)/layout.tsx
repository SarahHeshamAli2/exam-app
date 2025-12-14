import React from "react";
import { LayoutProps } from "@/lib/types/layout.types";
import ExamcontentCard from "./_components/exam-content-card";

export default function layout({ children }: LayoutProps) {
  return (
    <div className="md:flex md:p-0 p-5">
      <ExamcontentCard />
      {children}
    </div>
  );
}
