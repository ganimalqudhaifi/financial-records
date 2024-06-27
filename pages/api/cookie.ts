import { NextApiRequest, NextApiResponse } from "next";

const getUserFromCookies = (req: NextApiRequest) => {
  const { user } = req.cookies;
  return user ? JSON.parse(user) : null;
};

const setUserCookie = (res: NextApiResponse, user: string) => {
  res.setHeader("Set-Cookie", `user=${user}; Path=/; HttpOnly`);
};

const deleteUserCookie = (res: NextApiResponse) => {
  res.setHeader("Set-Cookie", "user=; Path=/; HttpOnly; Max-Age=0");
};

const handleGetRequest = (req: NextApiRequest, res: NextApiResponse) => {
  const user = getUserFromCookies(req);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(204).send("No content");
  }
};

const handlePostRequest = (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.body;
  if (user) {
    setUserCookie(res, user);
    res.status(200).send("Cookie has been set.");
  } else {
    res.status(400).json({ success: false, message: "User data is required." });
  }
};

const handleDeleteRequest = (res: NextApiResponse) => {
  deleteUserCookie(res);
  res.status(200).send("Cookie has been deleted.");
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      handleGetRequest(req, res);
      break;
    case "POST":
      handlePostRequest(req, res);
      break;
    case "DELETE":
      handleDeleteRequest(res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res
        .status(405)
        .json({ success: false, message: `Method ${req.method} Not Allowed` });
      break;
  }
}
