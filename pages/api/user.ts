import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "@/lib/firebase/admin";
import { verifyToken } from "../../lib/jwt";

const getTokenFromCookies = (req: NextApiRequest) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  return cookies.token || null;
};

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = getTokenFromCookies(req);

  if (token) {
    const claims = verifyToken(token);
    const uid = claims.uid as string;

    try {
      const userRecord = await getUser(uid);
      res.status(200).json(userRecord);
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.json(null);
    }
  }

  res.json(null);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res
        .status(405)
        .json({ success: false, message: `Method ${req.method} Not Allowed` });
      break;
  }
}
