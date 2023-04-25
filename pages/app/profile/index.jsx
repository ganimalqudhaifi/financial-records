import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AppLayout } from '../../../components';
import checkUID from '../../../utils/checkUID';

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const [edits, setEdits] = useState({
    personalInformation: false,
  });

  const router = useRouter();

  useEffect(() => {
    // login check
    const uid = checkUID();
    uid !== null ? setIsLogin(true) : router.push('/login');
    isLogin && setUser(JSON.parse(localStorage.getItem('user')));
  }, [router, isLogin]);

  if (isLogin) {
    return (
      <>
        <Head>
          <title>Financial Records - App Profile</title>
        </Head>

        <AppLayout user={user}>
          <div className="w-full p-4 lg:ml-64">
            <h2 className="font-medium text-3xl mb-4">Profile</h2>
            <div>
              - TODO!: add feature for edit profile picture / avatar
              <br />
              - TODO!: add feature for change password - it would be verified email to unlock this feature
              <br />
              - TODO!: add feature add link to social media - it will be direct link with icon on sidebar
            </div>
            <div className="p-5 w-full bg-white rounded">
              <h3 className="font-medium text-xl">Personal Information</h3>
              <form className="mt-5 grid grid-cols-3">
                <div className="grid grid-cols-2 col-span-2 gap-x-5 gap-y-3">
                  <div className="flex flex-col">
                    <label htmlFor="firstName" className="mb-1 text-sm text-gray-600">First Name</label>
                    <input id="firstName" type="text" placeholder="firstName" className={`${edits.personalInformation && 'p-1 border-2 border-slate-600 rounded'}`} disabled={!edits.personalInformation} />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="firstName" className="mb-1 text-sm text-gray-600">Last Name</label>
                    <input id="firstName" type="text" placeholder="lastName" className={`${edits.personalInformation && 'p-1 border-2 border-slate-600 rounded'}`} disabled={!edits.personalInformation} />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="firstName" className="mb-1 text-sm text-gray-600">Email Address</label>
                    <input id="firstName" type="text" placeholder="emailAddress" className={`${edits.personalInformation && 'p-1 border-2 border-slate-600 rounded'}`} disabled={!edits.personalInformation} />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="firstName" className="mb-1 text-sm text-gray-600">Phone</label>
                    <input id="firstName" type="text" placeholder="-" className={`${edits.personalInformation && 'p-1 border-2 border-slate-600 rounded'}`} disabled={!edits.personalInformation} />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="firstName" className="mb-1 text-sm text-gray-600">Bio</label>
                    <input id="firstName" type="text" placeholder="Bio" className={`${edits.personalInformation && 'p-1 border-2 border-slate-600 rounded'}`} disabled={!edits.personalInformation} />
                  </div>
                </div>
                <div className="px-5 py-1 grid justify-end items-start">
                  <button
                    type="button"
                    onClick={() => {
                      setEdits({
                        personalInformation: !edits.personalInformation,
                      });
                    }}
                    className="grid grid-flow-col px-2 py-1 border justify-center items-center border-slate-300 hover:border-slate-500 active:border-slate-400 text-slate-600 hover:text-slate-700 active:text-slate-600 rounded-full"
                  >
                    <p className="text-md">
                      {edits.personalInformation ? 'Save' : 'Edit'}
                    </p>
                    {edits.personalInformation ? <i className="ml-1 bx bx-save text-base " /> : <i className="ml-1 bx bx-edit-alt text-base " />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </AppLayout>
      </>
    );
  }
}
