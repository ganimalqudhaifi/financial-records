import { AuthenticationError } from "@/types";

const DEFAULT_ERROR_MESSAGE = "Terjadi kesalahan. Mohon coba lagi nanti.";

export function getErrorMessage(err: unknown): string {
  if (err instanceof AuthenticationError) {
    switch (err.code) {
      case "auth/email-already-in-use":
        return "Email telah digunakan.";
      case "auth/invalid-email":
        return "Harap masukkan alamat email yang valid.";
      case "auth/invalid-password":
        return "Kata sandi tidak valid. Pastikan panjangnya minimal 6 karakter.";
      case "auth/user-not-found":
        return "Maaf, kami tidak dapat menemukan akun dengan email ini.";
      default:
        return DEFAULT_ERROR_MESSAGE;
    }
  }
  return DEFAULT_ERROR_MESSAGE;
}
