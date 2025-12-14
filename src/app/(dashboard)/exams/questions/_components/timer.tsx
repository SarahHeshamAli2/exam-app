"use client";
import { CircleProgress } from "@/components/ui/progress";

type QuestionsTimerProps = {
  timeRemaining: number;
  progressValue: number;
};

export default function QuestionsTimer({
  timeRemaining,
  progressValue,
}: QuestionsTimerProps) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const displayTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <CircleProgress
      value={Math.round(progressValue)}
      displayText={displayTime}
      className="flex-shrink-0"
    />
  );
}
