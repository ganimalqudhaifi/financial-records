import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useContext, useState } from 'react';
import {
  Button, Input, Label,
} from '../../components';
import { auth, signInWithEmailAndPassword } from '../../config/firebase';
import { RootContext } from '../../context';
import { changeUser } from '../../context/action/demoAction';
import styles from './Login.module.css';

export default function Login() {
  const { dispatch } = useContext(RootContext);
  const router = useRouter();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [remember, setRemember] = useState(false);
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
        if (remember === true) {
          localStorage.setItem('uid', JSON.stringify(dataUser.uid));
        } else {
          sessionStorage.setItem('uid', JSON.stringify(dataUser.uid));
        }
        setInputs({
          email: '',
          password: '',
        });
        router.push('/app');
        setIsLoading(false);
      })
      .catch(() => {
      });
    setIsLoading(false);
  };

  const handleRemember = () => {
    setRemember(!remember);
  };

  return (
    <>
      <div className={styles.body}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit}>
            <h3>Log In</h3>
            <div className="firebaseui-auth-container" />
            <div className={styles.inputBox}>
              <Label htmlFor="email" style="login-register" title="Email" />
              <div className={styles.box}>
                <div className={styles.icon}><ion-icon name="person" /></div>
                <Input
                  id="email"
                  style="login-register"
                  type="text"
                  name="email"
                  placeholder="Masukkan email..."
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={styles.inputBox}>
              <Label htmlFor="password" style="login-register" title="Password" />
              <div className={styles.box}>
                <div className={styles.icon}><ion-icon name="lock-closed" /></div>
                <Input
                  id="password"
                  style="login-register"
                  type="password"
                  name="password"
                  placeholder="Masukkan password..."
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={styles.remember}>
              <Input type="checkbox" id="remember" styles="login-register-checkbox" onChange={handleRemember} />
              <Label htmlFor="remember" style="login-register-checkbox" title="Remember me" />
            </div>
            <Button className={`${styles['btn-login']} ${isLoading ? 'grayscale' : ''}`} title={isLoading ? 'Loading...' : 'Masuk'} type="Submit" disabled={isLoading} />
            <Link className={styles['link-register']} href="/register">
              {'Belum punya akun? '}
              <span>Daftar</span>
            </Link>
          </form>
        </div>
        <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" />
        <Script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" />
      </div>
    </>
  );
}
