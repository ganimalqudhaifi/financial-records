import { createToken } from "@/lib/jwt";
import { signIn } from "./auth.client";

export async function loginService(email: string, password: string) {
  const user = await signIn(email, password);

  const jwtToken = await createToken({ uid: user.uid });

  return jwtToken;
}