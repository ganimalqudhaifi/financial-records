import { createToken } from "@/lib/jwt";
import { signUp, updateUser } from "./auth.client";
import { firebaseAddAccount } from "@/features/account/account.service";

export async function registerService(email: string, password: string) {
  const user = await signUp(email, password);
  const uid = user.uid;

  await updateUser(uid);

  await firebaseAddAccount({
    name: "Personal",
    initialBalance: 0,
  });

  const token = await createToken({ uid });

  return token
}