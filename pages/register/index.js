import React, { useState } from 'react';
import {
  Button, Gap, Input, Label,
} from '../../components';
import { auth, createUserWithEmailAndPassword } from '../../config/firebase';

export default function Register() {
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
      .then((userCredential) => {
        const { user } = userCredential;
        console.log('sign up success', user);
      })
      .catch((error) => {
        console.log('sign up failed', error);
        console.log('failed reason', error.message);
      });
    setInputs({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <div className="w-full h-full  flex justify-center items-center">
        <div className="flex w-[380px] bg-slate-300 py-5 rounded-md shadow-xl justify-center items-center">
          <form className="w-full mx-6 flex flex-col" onSubmit={handleSubmit}>
            <h1 className="text-5xl font-semibold text-center pb-6 pt-2">Register</h1>
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
              title="Daftar"
              type="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
}
