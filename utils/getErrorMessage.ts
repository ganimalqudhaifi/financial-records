import { AuthenticationError } from "../types";

export function getErrorMessage(err: unknown): string {
  if (err instanceof AuthenticationError) {
    switch (err.code) {
      case "auth/user-not-found":
        return "Maaf, kami tidak dapat menemukan akun dengan email ini.";
      case "auth/invalid-email":
        return "Harap masukkan alamat email yang valid.";
      case "auth/invalid-password":
        return "Kata sandi tidak valid. Pastikan panjangnya minimal 6 karakter.";
      default:
        return "Terjadi kesalahan. Mohon coba lagi nanti.";
    }
  }
  return "Terjadi kesalahan. Mohon coba lagi nanti.";
}
