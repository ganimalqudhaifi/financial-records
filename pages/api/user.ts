import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "../../lib/firebase/auth";
import { verifyToken } from "../../lib/jwt";

const getTokenFromCookies = (req: NextApiRequest) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  return cookies.token || null;
};

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = getTokenFromCookies(req);

  if (token) {
    const claims = verifyToken(token);
    const uid = claims.uid;

    try {
      const userRecord = await getUser(uid as string);
      res.status(200).json(userRecord);
    } catch (error) {
      console.log("Error fetching user data:", error);
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
