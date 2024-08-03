import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { signOut } from "@/lib/firebase/auth";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await signOut();

    const clearCookie = cookie.serialize("token", "", {
      maxAge: -1, // Set the cookie to expire immediately
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    res.setHeader("Set-Cookie", clearCookie);

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
