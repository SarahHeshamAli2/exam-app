import React from "react";
import { ResultsPieChart } from "./results-chart";
import { CheckedAnswersProps } from "@/lib/types/questions";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FolderSearch } from "lucide-react";
import Link from "next/link";
import RestartExamButton from "./restart-exam";
import EmptyState from "@/app/(dashboard)/_components/empty-state";

export default function CheckAnswers({
  results,
  onRestart,
}: CheckedAnswersProps) {
  const totalCorrect = results?.correct;
  const totalWrong = results?.wrong;
  const chartData = [
    { result: "correct", value: totalCorrect, fill: "#00BC7D" },
    { result: "incorrect", value: totalWrong, fill: "#EF4444" },
  ];
  const emptyAnswers =
    results?.WrongQuestions.length == 0 && results.correctQuestions.length == 0;

  return (
    <div className="font-mono mt-10">
      {emptyAnswers ? (
        <EmptyState type="no-answers" />
      ) : (
        <>
          <h2 className="text-blue-600 font-semibold text-2xl mb-4">
            Results:
          </h2>
          <div className="result md:flex items-center">
            <div className="md:w-1/4 ">
              <ResultsPieChart
                chartData={chartData}
                totalCorrectAnswers={totalCorrect}
                totalWrongAnswers={totalWrong}
              />
            </div>
            <div className="correct-answers border md:w-3/4 p-3 max-h-96 overflow-y-auto">
              {results?.WrongQuestions.map((question) => (
                <div key={question.QID}>
                  <h2 className="font-semibold text-xl text-blue-600 mb-3">
                    {question.Question}
                  </h2>
                  <div className="incorrect bg-red-50 p-4 flex items-center gap-2">
                    <input
                      id="incorrectAnswer"
                      type="radio"
                      className="size-4 accent-red-600 cursor-pointer"
                      checked={true}
                      readOnly
                    />
                    <Label htmlFor="incorrectAnswer" className="cursor-pointer">
                      {question.inCorrectAnswer}
                    </Label>
                  </div>
                  <div className="correct bg-emerald-50 p-4 mt-2 flex items-center gap-2">
                    <div
                      id="correctAnswer"
                      className="size-4 rounded-full border   border-green-600 "></div>
                    <Label htmlFor="correctAnswer">
                      {question.correctAnswer}
                    </Label>
                  </div>
                </div>
              ))}
              {results?.correctQuestions.map((question) => (
                <div key={question.QID}>
                  <h2 className="font-semibold text-xl text-blue-600 mb-3">
                    {question.Question}
                  </h2>

                  <div className="correct bg-emerald-50 p-4 mt-2 flex items-center gap-2">
                    <input
                      type="radio"
                      className="size-4 accent-green-600 cursor-pointer"
                      checked={true}
                      readOnly
                      id="selectedCorrectAnswer"
                    />
                    <Label
                      htmlFor="selectedCorrectAnswer"
                      className="cursor-pointer">
                      {question.correctAnswer}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="buttons flex gap-4 mt-10">
        <RestartExamButton onRestart={onRestart} />
        <Button asChild className="w-1/2">
          <Link href="/exams">
            <FolderSearch />
            Explore
          </Link>
        </Button>
      </div>
    </div>
  );
}
