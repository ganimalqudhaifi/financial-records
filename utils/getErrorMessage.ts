import { FirebaseError } from "firebase/app";

const DEFAULT_ERROR_MESSAGE = "Terjadi kesalahan. Mohon coba lagi nanti.";

export function handleAuthError(err: FirebaseError): string {
  switch (err.code) {
    case "auth/email-already-in-use":
      return "Email telah digunakan.";
    case "auth/invalid-email":
      return "Harap masukkan alamat email yang valid.";
    case "auth/invalid-password":
      return "Kata sandi tidak valid. Pastikan panjangnya minimal 6 karakter.";
    case "auth/user-not-found":
      return "Maaf, kami tidak dapat menemukan akun dengan email ini.";
    case "auth/wrong-password":
      return "Kata sandi yang dimasukkan salah.";
    case "auth/weak-password":
      return "Kata sandi terlalu lemah. Pastikan panjangnya minimal 6 karakter.";
    case "auth/network-request-failed":
      return "Koneksi jaringan gagal. Periksa koneksi internet Anda.";
    default:
      return DEFAULT_ERROR_MESSAGE;
  }
}
