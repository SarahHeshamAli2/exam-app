"use client";
import { CircleX } from "lucide-react";
import React from "react";
type submissionProps = {
  errorMessage: string;
};

export default function SubmissionError({ errorMessage }: submissionProps) {
  return (
    <div>
      <p className="text-destructive bg-red-50 p-3 text-center border border-red-600 relative my-8">
        <CircleX className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full" />
        {errorMessage}
      </p>
    </div>
  );
}
