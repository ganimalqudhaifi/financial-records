import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import {
  Button, Gap, Input, Label,
} from '../../components';
import { auth, signInWithEmailAndPassword } from '../../config/firebase';
import { RootContext } from '../../context';
import { changeUser } from '../../context/action/demoAction';

export default function Login() {
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
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const dataUser = {
          email: res.user.email,
          uid: res.user.uid,
          emailVerified: res.user.emailVerified,
          refreshToken: res.user.refreshToken,
        };
        console.log('sign in success', res.user);
        dispatch(changeUser(dataUser));
        localStorage.setItem('uid', JSON.stringify(dataUser.uid));
        setInputs({
          email: '',
          password: '',
        });
        router.push('/app');
      })
      .catch((error) => {
        console.log('sign up failed', error);
        console.log('failed reason', error.message);
      });
  };

  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex w-[380px] bg-slate-300 py-5 rounded-md shadow-xl justify-center items-center">
          <form className="w-full mx-6 flex flex-col" onSubmit={handleSubmit}>
            <h1 className="text-5xl font-semibold text-center pb-6 pt-2">Login</h1>
            <Label
              style="login"
              title="Email"
            />
            <Input
              style="login"
              type="text"
              name="email"
              placeholder="Masukkan email..."
              onChange={handleChange}
              required
            />
            <Gap height={10} />
            <Label
              style="login"
              title="Password"
            />
            <Input
              style="login"
              type="password"
              name="password"
              placeholder="Masukkan password..."
              onChange={handleChange}
              required
            />
            <Gap height={30} />
            <Button
              style="login"
              title="Masuk"
              type="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
}
