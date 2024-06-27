import { auth } from "../config/firebase";
import { AuthenticationError } from "../types";
import { alertToast } from "../utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { IoPerson, IoLockClosed, IoEye, IoEyeOff } from "react-icons/io5";

export default function Login() {
  const [errorMsg, setErorrMsg] = useState("");
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, password } = inputs;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setInputs({ email: "", password: "" });
      router.replace("/app");
    } catch (err) {
      if (err instanceof AuthenticationError) {
        switch (err.code) {
          case "auth/user-not-found":
            setErorrMsg("Email tidak ditemukan");
            break;
          case "auth/invalid-email":
            setErorrMsg("Email tidak sah");
            break;
          case "auth/wrong-password":
            setErorrMsg("Password salah");
            break;
          default:
            setErorrMsg("Terjadi kesalahan");
        }
      }
      alertToast(errorMsg);
    }
    setIsLoading(false);
  };

  return (
    <div className="font-['Poppins','sans-serif'] flex justify-center items-center min-h-screen bg-bg-color">
      <div className="relative w-[350px] min-h-[500px] flex justify-center items-center bg-bg-color p-[50px] rounded-[30px] shadow-[25px_25px_75px_rgba(0,0,0,.25),10px_10px_70px_rgba(0,0,0,.25),inset_5px_5px_10px_rgba(0,0,0,.5),inset_5px_5px_20px_rgba(255,255,255,.2),inset_-5px_-5px_15px_rgba(0,0,0,.75)]">
        <form
          onSubmit={handleSubmit}
          spellCheck="false"
          className="relative w-full"
        >
          <h3 className="text-white font-semibold text-[2em] w-full text-center mb-[30px] tracking-[2px] uppercase">
            Log In
          </h3>
          <div className="firebaseui-auth-container" />
          <div className="relative w-full mb-5">
            <label
              htmlFor="email"
              className="inline-block text-white mb-[10px] uppercase tracking-[1px] text-xs border-l-4 border-white pl-1 leading-[1em]"
            >
              Email
            </label>
            <div className="flex">
              <div className="relative min-w-[40px] h-10 bg-main-color flex justify-center items-center rounded-full mr-[10px] text-bg-color text-[1.15em] shadow-[5px_5px_7px_rgba(0,0,0,.25),inset_2px_2px_5px_rgba(255,255,255,.25),inset_-3px_-3px_5px_rgba(0,0,0,.5)]">
                <IoPerson />
              </div>
              <input
                id="email"
                type="text"
                name="email"
                placeholder="Masukkan email..."
                onChange={handleChange}
                className="relative w-full px-5 py-[10px] rounded-full shadow-[5px_5px_7px_rgba(0,0,0,.25),inset_2px_2px_5px_rgba(0,0,0,.35),inset_-3px_-3px_5px_rgba(0,0,0,.5)] outline-0 text-sm leading-[24px]"
                autoComplete="email"
                required
              />
            </div>
          </div>
          <div className="relative w-full mb-5">
            <label
              htmlFor="password"
              className="inline-block text-white mb-[10px] uppercase tracking-[1px] text-xs border-l-4 border-white pl-1 leading-[1em]"
            >
              Password
            </label>
            <div className="flex">
              <div className="relative min-w-[40px] h-10 bg-main-color flex justify-center items-center rounded-full mr-[10px] text-bg-color text-[1.15em] shadow-[5px_5px_7px_rgba(0,0,0,.25),inset_2px_2px_5px_rgba(255,255,255,.25),inset_-3px_-3px_5px_rgba(0,0,0,.5)]">
                <IoLockClosed />
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={`${!showPassword ? "password" : "text"}`}
                  name="password"
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                  onChange={handleChange}
                  className="relative w-full px-5 py-[10px] pr-10 rounded-full shadow-[5px_5px_7px_rgba(0,0,0,.25),inset_2px_2px_5px_rgba(0,0,0,.35),inset_-3px_-3px_5px_rgba(0,0,0,.5)] outline-0 text-sm leading-[24px]"
                  minLength={6}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
                  <span
                    className="flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? (
                      <IoEye className="w-5 h-5 fill-gray-700" />
                    ) : (
                      <IoEyeOff className="w-5 h-5 fill-gray-700" />
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button
            className={`w-full px-5 py-[10px] mb-6 rounded-full bg-[#1f83f2] shadow-[5px_5px_7px_rgba(0,0,0,.25),inset_2px_2px_5px_rgba(255,255,255,.25),inset_-3px_-3px_5px_rgba(0,0,0,.5)] text-white uppercase tracking-[2px] font-semibold mt-[10px] hover:brightness-110 active:brightness-100 ${isLoading && "grayscale"}`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Masuk"}
          </button>
          <Link
            className="text-white text-sm text-center w-full inline-block"
            href="/register"
          >
            {"Belum punya akun? "}
            <span className="text-main-color">Daftar</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
