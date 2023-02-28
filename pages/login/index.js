import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword } from '../../config/firebase';
import { useGlobalContext } from '../../context';
import { changeUser } from '../../context/action/demoAction';
import alertToast from '../../utils/sweetAlert';

export default function Login() {
  const { dispatch } = useGlobalContext();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    setInputs((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRemember = () => {
    setRemember(!remember);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const { email, password } = inputs;
    await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const dataUser = {
          uid: res.user.uid,
          displayName: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
          emailVerified: res.user.emailVerified,
        };
        dispatch(changeUser(dataUser));
        localStorage.removeItem('uid');
        sessionStorage.removeItem('uid');
        if (remember) {
          localStorage.setItem('uid', JSON.stringify(dataUser.uid));
        } else {
          sessionStorage.setItem('uid', JSON.stringify(dataUser.uid));
        }
        setInputs({
          email: '',
          password: '',
        });
        router.push('/app');
      })
      .catch((err) => {
        let errMsg;
        switch (err.code) {
          case 'auth/user-not-found':
            errMsg = 'Email tidak ditemukan';
            break;
          case 'auth/invalid-email':
            errMsg = 'Email tidak sah';
            break;
          case 'auth/wrong-password':
            errMsg = 'Password salah';
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
          <h3 className="text-white font-semibold text-[2em] w-full text-center mb-[30px] tracking-[2px] uppercase">Log In</h3>
          <div className="firebaseui-auth-container" />
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
                autoComplete="email"
                required
              />
            </div>
          </div>
          <div className="relative w-full mb-5">
            <label htmlFor="password" className="inline-block text-white mb-[10px] uppercase tracking-[1px] text-xs border-l-4 border-white pl-1 leading-[1em]">Password</label>
            <div className="flex">
              <div className="relative min-w-[40px] h-10 bg-main-color flex justify-center items-center rounded-full mr-[10px] text-bg-color text-[1.15em] shadow-[5px_5px_7px_rgba(0,0,0,.25),inset_2px_2px_5px_rgba(255,255,255,.25),inset_-3px_-3px_5px_rgba(0,0,0,.5)]"><ion-icon name="lock-closed" /></div>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                onChange={handleChange}
                className="relative w-full px-5 py-[10px] rounded-full shadow-[5px_5px_7px_rgba(0,0,0,.25),inset_2px_2px_5px_rgba(0,0,0,.35),inset_-3px_-3px_5px_rgba(0,0,0,.5)] outline-0 text-sm leading-[24px]"
                minLength="6"
                required
              />
            </div>
          </div>
          <div className="flex items-center mb-2 w-full">
            <input type="checkbox" id="remember" onChange={handleRemember} className="mr-[10px]" />
            <label htmlFor="remember" className="text-white uppercase tracking-[1px] text-sm">Remember me</label>
          </div>
          <button className={`w-full px-5 py-[10px] mb-6 rounded-full bg-[#1f83f2] shadow-[5px_5px_7px_rgba(0,0,0,.25),inset_2px_2px_5px_rgba(255,255,255,.25),inset_-3px_-3px_5px_rgba(0,0,0,.5)] text-white uppercase tracking-[2px] font-semibold mt-[10px] hover:brightness-110 active:brightness-100 ${isLoading && 'grayscale'}`} type="Submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Masuk'}</button>
          <Link className="text-white text-sm text-center w-full inline-block" href="/register">
            {'Belum punya akun? '}
            <span className="text-main-color">Daftar</span>
          </Link>
        </form>
      </div>
      <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" />
      <Script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" />
    </div>
  );
}
