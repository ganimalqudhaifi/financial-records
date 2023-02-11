import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { auth, createUserWithEmailAndPassword } from '../../config/firebase';
import { RootContext } from '../../context';
import { changeSaldoAwal, changeUser } from '../../context/action/demoAction';
import styles from './Register.module.css';

export default function Register() {
  const { dispatch } = useContext(RootContext);
  const router = useRouter();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setInputs((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    const { email, password } = inputs;
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
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
        sessionStorage.setItem('uid', JSON.stringify(dataUser.uid));
        setInputs({
          email: '',
          password: '',
        });
        dispatch(changeSaldoAwal(false, 0));
        router.push('/app');
      })
      .catch((err) => {
        let errMsg;
        if (err.code === 'auth/email-already-in-use') {
          errMsg = 'Email telah digunakan';
        } else if (err.code === 'auth/invalid-email') {
          errMsg = 'Email tidak sah';
        } else {
          errMsg = 'terjadi kesalahan';
        }

        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'error',
          title: errMsg,
        });
      });
    setIsLoading(false);
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <h3>Register</h3>
          <div className={styles.inputBox}>
            <label htmlFor="email" className="inline-block text-white mb-[10px] uppercase tracking-[1px] text-xs border-l-4 border-white pl-1 leading-[1em]">Email</label>
            <div className={styles.box}>
              <div className={styles.icon}><ion-icon name="person" /></div>
              <input
                id="email"
                className="relative w-full px-5 py-[10px] rounded-full shadow-[5px_5px_7px_rgba(0,0,0,.25),inset_2px_2px_5px_rgba(0,0,0,.35),inset_-3px_-3px_5px_rgba(0,0,0,.5)] outline-0 text-sm leading-[24px]"
                type="text"
                name="email"
                placeholder="Masukkan email..."
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="password" className="inline-block text-white mb-[10px] uppercase tracking-[1px] text-xs border-l-4 border-white pl-1 leading-[1em]">Password</label>
            <div className={styles.box}>
              <div className={styles.icon}><ion-icon name="lock-closed" /></div>
              <input
                id="password"
                className="relative w-full px-5 py-[10px] rounded-full shadow-[5px_5px_7px_rgba(0,0,0,.25),inset_2px_2px_5px_rgba(0,0,0,.35),inset_-3px_-3px_5px_rgba(0,0,0,.5)] outline-0 text-sm leading-[24px]"
                type="password"
                name="password"
                placeholder="Masukkan password..."
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button className={`${styles['btn-register']} ${isLoading ? 'grayscale' : ''}`} type="Submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Daftar'}</button>
          <div className={styles['link-login']}>
            {'Sudah punya akun? '}
            <Link href="/login">Login</Link>
          </div>
        </form>
      </div>
      <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" />
      <Script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" />
    </div>
  );
}
