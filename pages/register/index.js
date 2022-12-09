import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useContext, useState } from 'react';
import {
  Button, Input, Label,
} from '../../components';
import { auth, createUserWithEmailAndPassword } from '../../config/firebase';
import { RootContext } from '../../context';
import { changeUser } from '../../context/action/demoAction';
import styles from './Register.module.css';

export default function Register() {
  const { dispatch } = useContext(RootContext);
  const router = useRouter();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setInputs((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    const { email, password } = inputs;
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const dataUser = {
          email: res.user.email,
          uid: res.user.uid,
          emailVerified: res.user.emailVerified,
          refreshToken: res.user.refreshToken,
        };
        dispatch(changeUser(dataUser));
        sessionStorage.setItem('uid', JSON.stringify(dataUser.uid));
        setInputs({
          email: '',
          password: '',
        });
        router.push('/app');
      })
      .catch(() => {
      });
    setInputs({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <div className={styles.body}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit}>
            <h3>Register</h3>
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
            <Button className={styles['btn-register']} title="Daftar" type="Submit" />
            <div className={styles['link-login']}>
              {'Sudah punya akun? '}
              <Link href="/login">Login</Link>
            </div>
          </form>
        </div>
        <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" />
        <Script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" />
      </div>
    </>
  );
}
