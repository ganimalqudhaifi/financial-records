// shared/auth/getCurrentUserUid.ts

export const getCurrentUserUid = async () => {
  const res = await fetch("/api/user");
  const user = await res.json();
  return user.uid;
};