import { NextResponse } from "next/server";

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/app")) {
    if (request.cookies.has("user")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
