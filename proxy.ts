import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const protectedRoutes = ["/dashboard", "/records", "/profile"];

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtected) {
    const token = request.cookies.get("token");

    if (token) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/", request.url));
  }
}
