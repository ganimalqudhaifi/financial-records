import * as jose from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const createToken = async (payload: any) => {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);
};

export const verifyToken = (token: string) => {
  return jose.decodeJwt(token);
};
