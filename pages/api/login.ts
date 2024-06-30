import cookie from "cookie";
import * as jose from "jose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  if (req.method === "POST") {
    const { uid } = req.body;

    try {
      const jwtToken = await new jose.SignJWT({ uid })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("7d")
        .sign(secret);

      const setCookie = cookie.serialize("token", jwtToken, {
        maxAge: 7 * 24 * 60 * 60,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
      res.setHeader("Set-Cookie", setCookie);

      res.status(200).json({ message: "Logged in successfully" });
    } catch (error) {
      res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
