"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import QuestionsTimer from "./timer";
import CheckAnswers from "./check-answers";
import useSubmitAnswer from "../_hooks/use-submit-question";
import { useSubmissionError } from "@/hooks/use-submission-error";
import { ExamQuestionsProps, ExamResults } from "@/lib/types/questions";
import EmptyState from "@/app/(dashboard)/_components/empty-state";

export default function ExamQuestions({ questions }: ExamQuestionsProps) {
  const emptyQuestions = questions.length == 0;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progressValue = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const examDuration = questions[0]?.exam?.duration || 20;
  const [timeRemaining, setTimeRemaining] = useState(examDuration * 60);
  const [checkAnswers, setCheckAnswers] = useState<boolean>(false);
  const [examResults, setExamResults] = useState<ExamResults | null>(null);

  const { submitAnswer, isPending, error } = useSubmitAnswer();
  const { displayedErrorMessage } = useSubmissionError();

  useEffect(() => {
    if (timeRemaining <= 0) return;
    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const totalSeconds = examDuration * 60;

  const handleAnswerSelect = (answerKey: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion._id]: answerKey,
    }));
  };

  const timerProgressValue = (timeRemaining / totalSeconds) * 100;
  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };
  const handleSubmit = useCallback(() => {
    const formattedAnswers = {
      answers: Object.entries(selectedAnswers).map(([questionId, correct]) => ({
        questionId,
        correct,
      })),
      time: totalSeconds - timeRemaining,
    };

    submitAnswer(formattedAnswers, {
      onSuccess: (responseData) => {
        setTimeRemaining(0);
        setCheckAnswers(true);
        setExamResults(responseData);
      },
    });
  }, [selectedAnswers, totalSeconds, timeRemaining, submitAnswer]);
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeRemaining(examDuration * 60);
    setCheckAnswers(false);
    setExamResults(null);
  };
  useEffect(() => {
    if (timeRemaining === 0 && !checkAnswers) {
      handleSubmit();
    }
  }, [timeRemaining, checkAnswers, handleSubmit]);
  return (
    <div>
      {emptyQuestions ? (
        <EmptyState type="no-questions" />
      ) : (
        <div className="progress font-mono text-gray-500 text-sm bg-white py-6 px-6">
          <div className="flex justify-between mb-2">
            <span>{currentQuestion.exam.title}</span>
            <span>
              Question
              <span className="text-blue-600 font-bold mx-2">
                {currentQuestionIndex + 1}
              </span>
              of {totalQuestions}
            </span>
          </div>
          <Progress value={progressValue} />

          {checkAnswers ? (
            <CheckAnswers results={examResults} onRestart={handleRestart} />
          ) : (
            <>
              <div className="question-card mt-10 min-h-80">
                <h1 className="text-2xl text-blue-600 font-semibold mb-4">
                  {currentQuestion.question}
                </h1>

                {currentQuestion.answers.map((answer) => (
                  <div
                    key={answer.key}
                    className="question flex items-center gap-3 bg-gray-50 p-4 hover:bg-gray-100 cursor-pointer mb-2"
                    onClick={() => handleAnswerSelect(answer.key)}>
                    <Input
                      type="radio"
                      className="size-4"
                      id={answer.key}
                      name={currentQuestion._id}
                      checked={
                        selectedAnswers[currentQuestion._id] === answer.key
                      }
                      onChange={() => handleAnswerSelect(answer.key)}
                    />
                    <Label htmlFor={answer.key} className="cursor-pointer">
                      {answer.answer}
                    </Label>
                  </div>
                ))}
              </div>
              {error && displayedErrorMessage()}
              <div className="buttons flex justify-between items-center gap-4  ">
                <Button
                  className="w-1/2"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}>
                  <ChevronLeft />
                  Previous
                </Button>
                <QuestionsTimer
                  timeRemaining={timeRemaining}
                  progressValue={timerProgressValue}
                />
                <Button
                  disabled={isPending}
                  className="w-1/2 "
                  onClick={handleNext}>
                  {currentQuestionIndex === totalQuestions - 1
                    ? "Submit answers"
                    : "Next"}
                  <ChevronRight />
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
