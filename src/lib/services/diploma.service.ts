import { LOCAL_BASE_URL } from "@/lib/constants/base-url.constant";
import { DiplomasResponse } from "@/lib/types/diplomas";

export default async function diplomaService(
  page: number,
  limit: number = 3
): Promise<DiplomasResponse> {
  const response = await fetch(
    `${LOCAL_BASE_URL}/api/diplomas?page=${page}&limit=${limit}`
  );
  return response.json();
}
