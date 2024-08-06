import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { signUp, updateUser } from "@/lib/firebase/auth";
import { addAccount } from "@/lib/firebase/database";
import { createToken } from "@/lib/jwt";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password, newAccount } = req.body;

    try {
      const user = await signUp(email, password);
      const uid = user.uid;

      await updateUser(uid);

      const jwtToken = await createToken({ uid });

      const setCookie = cookie.serialize("token", jwtToken, {
        maxAge: 7 * 24 * 60 * 60,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
      res.setHeader("Set-Cookie", setCookie);

      addAccount(uid, newAccount);

      res.status(200).json({ message: "Signed up successfully" });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      return res.status(401).json({ error: errorMessage });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
