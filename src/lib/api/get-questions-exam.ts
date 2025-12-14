import { getQuestionsOnExamService } from "../services/questions.service";

export async function getQuestionsOnExam(id: number) {
  try {
    const data = await getQuestionsOnExamService(id);
    return data;
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    throw error;
  }
}
