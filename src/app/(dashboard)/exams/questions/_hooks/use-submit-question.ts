"use client";
import { useSubmissionError } from "@/hooks/use-submission-error";
import { submitAnswersService } from "@/lib/services/questions.service";
import { SubmittedAnswers } from "@/lib/types/questions";
import { useMutation } from "@tanstack/react-query";

export default function useSubmitAnswer() {
  const { setErrorMessage } = useSubmissionError();

  const {
    error,
    data,
    mutate: submitAnswer,
    isPending,
  } = useMutation({
    mutationFn: async (submittedAnswers: SubmittedAnswers) => {
      const response = await submitAnswersService(submittedAnswers);
      if ("code" in response) {
        throw new Error(response.message);
      }
      return response;
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  return {
    error,
    data,
    submitAnswer,
    isPending,
  };
}
