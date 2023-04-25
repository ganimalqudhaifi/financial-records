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
    socialMedia: {
      facebook: false,
      instagram: false,
      twitter: false,
    },
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
            <div className="p-5 w-full bg-white rounded">
              <h3 className="font-medium text-xl">Personal Information</h3>
              <form className="mt-5 grid grid-cols-3">
                <div className="grid grid-cols-2 col-span-2 gap-x-5 gap-y-3">
                  <div className="flex flex-col">
                    <label htmlFor="firstName" className="mb-1 text-sm text-gray-600">First Name</label>
                    <input id="firstName" type="text" placeholder="firstName" className={`${edits.personalInformation && ' border-2 border-slate-600 rounded'} p-1`} disabled={!edits.personalInformation} />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="firstName" className="mb-1 text-sm text-gray-600">Last Name</label>
                    <input id="firstName" type="text" placeholder="lastName" className={`${edits.personalInformation && ' border-2 border-slate-600 rounded'} p-1`} disabled={!edits.personalInformation} />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="firstName" className="mb-1 text-sm text-gray-600">Email Address</label>
                    <input id="firstName" type="text" placeholder="emailAddress" className={`${edits.personalInformation && ' border-2 border-slate-600 rounded'} p-1`} disabled />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="firstName" className="mb-1 text-sm text-gray-600">Phone</label>
                    <input id="firstName" type="text" placeholder="-" className={`${edits.personalInformation && ' border-2 border-slate-600 rounded'} p-1`} disabled={!edits.personalInformation} />
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
                        ...edits,
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

            {/* <!-- Social Media  --> */}
            <div className="p-5 mt-2.5 w-full bg-white rounded">
              <h3 className="font-medium text-xl">Social Media</h3>
              <form className="mt-5 grid grid-cols-3">
                <div className="grid grid-cols-1 col-span-2 gap-x-5 gap-y-3">
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm text-gray-600">Facebook</label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <i className="bx bxl-facebook-square text-2xl text-blue-800" />
                      </div>
                      <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-11 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter URL" required />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <i
                          className={`${edits.socialMedia.facebook ? 'bx bx-unlink' : 'bx bx-link'} border border-slate-300 active:border-slate-400 p-0.5 rounded`}
                          onClick={() => setEdits({
                            ...edits,
                            socialMedia: {
                              ...edits.socialMedia,
                              facebook: !edits.socialMedia.facebook,
                            },
                          })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm text-gray-600">Instagram</label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <i className="bx bxl-instagram-alt text-2xl bg-clip-text text-transparent bg-gradient-to-b from-purple-800 to-amber-400" />
                      </div>
                      <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-11 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter URL" required />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <i
                          className={`${edits.socialMedia.instagram ? 'bx bx-unlink' : 'bx bx-link'} border border-slate-300 active:border-slate-400 p-0.5 rounded`}
                          onClick={() => setEdits({
                            ...edits,
                            socialMedia: {
                              ...edits.socialMedia,
                              instagram: !edits.socialMedia.instagram,
                            },
                          })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm text-gray-600">Twitter</label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <i className="bx bxl-twitter text-2xl text-blue-500" />
                      </div>
                      <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-11 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter URL" required />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <i
                          className={`${edits.socialMedia.twitter ? 'bx bx-unlink' : 'bx bx-link'} border border-slate-300 active:border-slate-400 p-0.5 rounded`}
                          onClick={() => setEdits({
                            ...edits,
                            socialMedia: {
                              ...edits.socialMedia,
                              twitter: !edits.socialMedia.twitter,
                            },
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-5 py-1 grid justify-end items-start" />
              </form>
            </div>
          </div>
        </AppLayout>
      </>
    );
  }
}
