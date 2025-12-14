import { API_BASE_URL } from "@/lib/constants/base-url.constant";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });

  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "6";
  if (token) {
    const response = await fetch(
      `${API_BASE_URL}/subjects?page=${page}&limit=${limit}`,
      {
        headers: {
          token: token?.accessToken,
        },
      }
    );

    const data = await response.json();

    return NextResponse.json({
      subjects: data.subjects,
      metadata: data.metadata,
    });
  }
}
