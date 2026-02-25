import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/app")) {
    const token = request.cookies.get("token");

    if (token) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/", request.url));
  }
}
