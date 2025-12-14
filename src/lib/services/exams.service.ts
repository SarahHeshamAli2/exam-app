import getToken from "@/lib/utils/manage-token";
import { ExamResponse, ExamTitleResponse } from "../types/exam";

export async function getExamService(): Promise<ExamResponse> {
  const token = await getToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exams`, {
    headers: {
      token: token!.accessToken,
    },
  });
  return response.json();
}

export async function getExamTitleService(
  examId: string | string[] | undefined
): Promise<ExamTitleResponse> {
  const token = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/exams/${examId}`,
    {
      headers: {
        token: token!.accessToken,
      },
    }
  );
  return response.json();
}
