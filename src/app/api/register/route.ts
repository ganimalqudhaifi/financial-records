import { registerService } from "@/features/auth/services/register.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const response = NextResponse.next()

  try {
    const { email, password } = await req.json();

    const token = await registerService(email, password)

    response.cookies.set("token", token, {
      maxAge: 7 * 24 * 60 * 60,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })
    return NextResponse.json({ message: "Signed up successfully" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 410 })
  }
}

