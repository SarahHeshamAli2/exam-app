import { API_BASE_URL } from "../constants/base-url.constant";
import {
  ExamResultsResponse,
  GetQuestionsOnExamResponse,
  SubmittedAnswer,
} from "../types/questions";
import getToken from "../utils/manage-token";

export async function getQuestionsOnExamService(
  id: number
): Promise<GetQuestionsOnExamResponse> {
  const token = await getToken();

  const response = await fetch(`${API_BASE_URL}/questions?exam=${id}`, {
    headers: {
      "Content-Type": "application/json",
      token: token!.accessToken,
    },
  });

  return response.json();
}

export async function submitAnswersService(
  submittedAnswers: SubmittedAnswer
): Promise<ExamResultsResponse> {
  const token = await getToken();

  const response = await fetch(`${API_BASE_URL}/questions/check`, {
    method: "POST",
    body: JSON.stringify(submittedAnswers),
    headers: {
      "Content-Type": "application/json",
      token: token!.accessToken,
    },
  });
  return response.json();
}
