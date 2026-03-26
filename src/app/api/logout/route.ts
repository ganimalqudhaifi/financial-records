import { signOut } from "@/features/auth/services/auth.client";
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.next()

  try {
    await signOut();

    response.cookies.delete('token')

    return NextResponse.json({ message: "Logged out successfully" }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }

}