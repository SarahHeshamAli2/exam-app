import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/", "/login", "/register", "/forgot-password"];
const publicRoutes = authRoutes;
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const dashboardUrl = new URL("/diplomas", request.nextUrl.origin);
  if (!publicRoutes.includes(request.nextUrl.pathname)) {
    if (token) return NextResponse.next();
    const rediretcUrl = new URL("/", request.nextUrl.origin);
    rediretcUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(rediretcUrl);
  }
  if (!authRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  if (!token) return NextResponse.next();
  return NextResponse.redirect(dashboardUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)",
  ],
};
