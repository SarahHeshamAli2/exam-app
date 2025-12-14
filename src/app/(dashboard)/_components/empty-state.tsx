import React from "react";
import { FileQuestion, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmptyState({
  type = "no-answers",
}: {
  type?: "no-answers" | "no-questions" | "no-exams" | "no-diplomas";
}) {
  const states = {
    "no-answers": {
      icon: FileQuestion,
      title: "No Questions Answered",
      description:
        "You haven't answered any questions yet. Get started to begin tracking your progress!",
    },
    "no-questions": {
      icon: AlertCircle,
      title: "No Questions for This Exam",
      description:
        "This exam doesn't have any questions yet. Please check back later or select a different exam.",
    },
    "no-exams": {
      icon: AlertCircle,
      title: "No Exams Yet!",
      description:
        "This field doesn't have any exams yet. Please check back later or select a different exam.",
    },
    "no-diplomas": {
      icon: AlertCircle,
      title: "No diplomas Yet!",
      description:
        "This field doesn't have any diplomas yet. Please check back later or select a different diploma.",
    },
  };

  const state = states[type];
  const Icon = state.icon;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
          <Icon className="w-10 h-10 text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {state.title}
        </h2>
        <p className="text-gray-600">{state.description}</p>
        {type === "no-questions" && (
          <Button asChild className="w-full my-5">
            <Link href="/exams">Explore</Link>
          </Button>
        )}
        {type === "no-exams" && (
          <Button asChild className="w-full my-5">
            <Link href="/">Home</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
