import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword, updateProfile } from '../../config/firebase';
import { useGlobalContext } from '../../context';
import { changeSaldoAwal, changeUser } from '../../context/action/demoAction';
import alertToast from '../../utils/sweetAlert';

export default function Register() {
  const { dispatch } = useGlobalContext();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    setInputs((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const { email, password } = inputs;
    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        updateProfile(auth.currentUser, {
          displayName: 'username',
        });
        const dataUser = {
          uid: res.user.uid,
          displayName: 'username',
          email: res.user.email,
          photoURL: res.user.photoURL,
          emailVerified: res.user.emailVerified,
        };
        dispatch(changeUser(dataUser));
        localStorage.setItem('uid', JSON.stringify(dataUser.uid));
        localStorage.setItem('user', JSON.stringify(dataUser));
        setInputs({
          email: '',
          password: '',
        });
        dispatch(changeSaldoAwal(false, 0));
        router.push('/app');
      })
      .catch((err) => {
        let errMsg;
        switch (err.code) {
          case 'auth/email-already-in-use':
            errMsg = 'Email telah digunakan';
            break;
          case 'auth/invalid-email':
            errMsg = 'Email tidak sah';
            break;
          case 'auth/weak-password':
            errMsg = 'Password lemah';
            break;
          default:
            errMsg = 'Terjadi kesalahan';
        }
        alertToast(errMsg);
      });
    setIsLoading(false);
  };

  return (
    <div className="font-['Poppins','sans-serif'] flex justify-center items-center min-h-screen bg-bg-color">
      <div className="relative w-[350px] min-h-[500px] flex justify-center items-center bg-bg-color p-[50px] rounded-[30px] shadow-[25px_25px_75px_rgba(0,0,0,.25),10px_10px_70px_rgba(0,0,0,.25),inset_5px_5px_10px_rgba(0,0,0,.5),inset_5px_5px_20px_rgba(255,255,255,.2),inset_-5px_-5px_15px_rgba(0,0,0,.75)]">
        <form onSubmit={handleSubmit} className="relative w-full">
          <h3 className="text-white font-semibold text-[2em] w-full text-center mb-[30px] tracking-[2px] uppercase">Register</h3>
          <div className="relative w-full mb-5">
            <label htmlFor="email" className="inline-block text-white mb-[10px] uppercase tracking-[1px] text-xs border-l-4 border-white pl-1 leading-[1em]">Email</label>
            <div className="flex">
              <div className="relative min-w-[40px] h-10 bg-main-color flex justify-center items-center rounded-full mr-[10px] text-bg-color text-[1.15em] shadow-[5px_5px_7px_rgba(0,0,0,.25),inset_2px_2px_5px_rgba(255,255,255,.25),inset_-3px_-3px_5px_rgba(0,0,0,.5)]"><ion-icon name="person" /></div>
              <input
                id="email"
                type="text"
                name="email"
                placeholder="Masukkan email..."
                onChange={handleChange}
                className="relative w-full px-5 py-[10px] rounded-full shadow-[5px_5px_7px_rgba(0,0,0,.25),inset_2px_2px_5px_rgba(0,0,0,.35),inset_-3px_-3px_5px_rgba(0,0,0,.5)] outline-0 text-sm leading-[24px]"
                autoComplete="off"
                required
              />
            </div>
          </div>
          <div className="relative w-full mb-5">
            <label htmlFor="password" className="inline-block text-white mb-[10px] uppercase tracking-[1px] text-xs border-l-4 border-white pl-1 leading-[1em]">Password</label>
            <div className="flex">
              <div className="relative min-w-[40px] h-10 bg-main-color flex justify-center items-center rounded-full mr-[10px] text-bg-color text-[1.15em] shadow-[5px_5px_7px_rgba(0,0,0,.25),inset_2px_2px_5px_rgba(255,255,255,.25),inset_-3px_-3px_5px_rgba(0,0,0,.5)]"><ion-icon name="lock-closed" /></div>
              <div className="relative">
                <input
                  id="password"
                  type={`${!showPassword ? 'password' : 'text'}`}
                  name="password"
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                  onChange={handleChange}
                  className="relative w-full px-5 py-[10px] pr-10 rounded-full shadow-[5px_5px_7px_rgba(0,0,0,.25),inset_2px_2px_5px_rgba(0,0,0,.35),inset_-3px_-3px_5px_rgba(0,0,0,.5)] outline-0 text-sm leading-[24px]"
                  minLength="6"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
                  <span className="flex items-center" onClick={() => setShowPassword(!showPassword)}>
                    {
                      !showPassword
                        ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="ionicon w-5 h-5 fill-gray-700" viewBox="0 0 512 512">
                            <title>Show</title>
                            <circle cx="256" cy="256" r="64" />
                            <path d="M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96c-42.52 0-84.33 12.15-124.27 36.11-40.73 24.43-77.63 60.12-109.68 106.07a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416c46.71 0 93.81-14.43 136.2-41.72 38.46-24.77 72.72-59.66 99.08-100.92a32.2 32.2 0 00-.1-34.76zM256 352a96 96 0 1196-96 96.11 96.11 0 01-96 96z" />
                          </svg>
                        )
                        : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="ionicon w-5 h-5 fill-gray-700" viewBox="0 0 512 512">
                            <title>Hidden</title>
                            <path d="M432 448a15.92 15.92 0 01-11.31-4.69l-352-352a16 16 0 0122.62-22.62l352 352A16 16 0 01432 448zM248 315.85l-51.79-51.79a2 2 0 00-3.39 1.69 64.11 64.11 0 0053.49 53.49 2 2 0 001.69-3.39zM264 196.15L315.87 248a2 2 0 003.4-1.69 64.13 64.13 0 00-53.55-53.55 2 2 0 00-1.72 3.39z" />
                            <path d="M491 273.36a32.2 32.2 0 00-.1-34.76c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.68 96a226.54 226.54 0 00-71.82 11.79 4 4 0 00-1.56 6.63l47.24 47.24a4 4 0 003.82 1.05 96 96 0 01116 116 4 4 0 001.05 3.81l67.95 68a4 4 0 005.4.24 343.81 343.81 0 0067.24-77.4zM256 352a96 96 0 01-93.3-118.63 4 4 0 00-1.05-3.81l-66.84-66.87a4 4 0 00-5.41-.23c-24.39 20.81-47 46.13-67.67 75.72a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.39 76.14 98.28 100.65C162.06 402 207.92 416 255.68 416a238.22 238.22 0 0072.64-11.55 4 4 0 001.61-6.64l-47.47-47.46a4 4 0 00-3.81-1.05A96 96 0 01256 352z" />
                          </svg>
                        )
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button className={`w-full px-5 py-[10px] mb-6 rounded-full bg-[#1f83f2] shadow-[5px_5px_7px_rgba(0,0,0,.25),inset_2px_2px_5px_rgba(255,255,255,.25),inset_-3px_-3px_5px_rgba(0,0,0,.5)] text-white uppercase tracking-[2px] font-semibold mt-[10px] hover:brightness-110 ${isLoading ? 'grayscale' : ''}`} type="Submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Daftar'}</button>
          <div className="text-white text-sm text-center w-full inline-block">
            {'Sudah punya akun? '}
            <Link href="/login" className="text-main-color">Login</Link>
          </div>
        </form>
      </div>
      <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" />
      <Script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" />
    </div>
  );
}
