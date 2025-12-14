import { getExamService } from "../services/exams.service";

export async function getExams() {
  try {
    const response = await getExamService();
    return response.exams;
  } catch (error) {
    console.error("Error fetching exams:", error);
    throw error;
  }
}
