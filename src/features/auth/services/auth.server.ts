import { getUserByUid } from "@/lib/firebase/admin";
import { verifyToken } from "@/lib/jwt";

export async function getAuthenticatedUser(token: string) {
  const claims = verifyToken(token);
  const uid = claims.uid as string;

  return await getUserByUid(uid);
}