import { loginService } from "@/features/auth/services/login.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const response = NextResponse.next()

  try {
    const { email, password } = await req.json();

    const jwtToken = await loginService(email, password)

    response.cookies.set("token", jwtToken, {
      maxAge: 7 * 24 * 60 * 60,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })
    return NextResponse.json({ message: "Logged in successfully" }, { status: 200 })
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Login failed";
    return NextResponse.json({ error: errorMessage }, { status: 401 })
  }
}

