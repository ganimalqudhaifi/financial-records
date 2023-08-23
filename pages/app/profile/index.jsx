import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AppLayout } from '../../../components';
import {
  auth, database, ref, set, updateProfile,
} from '../../../config/firebase';
import { globalActionType, useGlobalContext } from '../../../context';
import checkUID from '../../../utils/checkUID';
import alertToast from '../../../utils/sweetAlert';

export default function App() {
  const { dispatch, state } = useGlobalContext();
  const { socialMediaLinks, socialMediaAttachment, personalInformation } = state;

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
    isLogin && setUser(JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user')));
  }, [router, isLogin]);

  const uid = checkUID();

  const changeUser = (payload) => {
    dispatch({ type: globalActionType.CHANGE_USER, payload });
  };

  const changeSocialMediaLinks = (isDemo, payload) => {
    if (!isDemo) {
      set(ref(database, `users/${uid}/socialMediaLinks`), payload);
    }
    dispatch({ type: globalActionType.CHANGE_SOCIAL_MEDIA_LINKS, payload });
  };

  const changeSocialMediaAttachment = (isDemo, payload) => {
    if (!isDemo) {
      set(ref(database, `users/${uid}/socialMediaAttachment`), payload);
    }
    dispatch({ type: globalActionType.CHANGE_SOCIAL_MEDIA_ATTACHMENT, payload });
  };

  const changePersonalInformation = (isDemo, payload) => {
    if (!isDemo) {
      set(ref(database, `users/${uid}/personalInformation`), payload);
    }
    dispatch({ type: globalActionType.CHANGE_PERSONAL_INFORMATION, payload });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(auth.currentUser, { displayName: `${personalInformation.firstName} ${personalInformation.lastName}` })
      .then(() => {
        changeUser({
          uid: auth.currentUser.uid,
          displayName: auth.currentUser.displayName,
          email: auth.currentUser.email,
          photoURL: auth.currentUser.photoURL,
          emailVerified: auth.currentUser.emailVerified,
        });
      }).catch(() => {
        // TODO: error auth.currentUser getIdToken
      });
    changePersonalInformation(0, personalInformation);
  };

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
              <form onSubmit={handleSubmit} className="mt-5 grid grid-cols-3 md:grid-cols-6 text-gray-600">
                <div className="grid grid-cols-2 col-span-3 md:col-span-5 gap-x-5 gap-y-3">
                  <div className="flex flex-col">
                    <label htmlFor="firstName" className="mb-1 text-sm">First Name</label>
                    <input id="firstName" name="firstName" type="text" placeholder="firstName" onChange={(e) => changePersonalInformation(0, { ...personalInformation, [e.target.name]: e.target.value })} value={personalInformation.firstName} className={`${edits.personalInformation && ' border-2 border-slate-400 rounded focus:border-slate-500'} p-1 disabled:bg-slate-400/10 disabled:rounded`} disabled={!edits.personalInformation} />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="lastName" className="mb-1 text-sm">Last Name</label>
                    <input id="lastName" name="lastName" type="text" placeholder="lastName" onChange={(e) => changePersonalInformation(0, { ...personalInformation, [e.target.name]: e.target.value })} value={personalInformation.lastName} className={`${edits.personalInformation && ' border-2 border-slate-400 rounded focus:border-slate-500'} p-1 disabled:bg-slate-400/10 disabled:rounded`} disabled={!edits.personalInformation} />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="email" className="mb-1 text-sm">Email Address</label>
                    <input id="email" name="email" type="text" placeholder="emailAddress" onChange={(e) => changePersonalInformation(0, { ...personalInformation, [e.target.name]: e.target.value })} value={user.email} className={`${edits.personalInformation && ' border-2 border-slate-400 rounded focus:border-slate-500'} p-1 disabled:bg-slate-400/10 disabled:rounded`} disabled />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="phone" className="mb-1 text-sm">Phone</label>
                    <input id="phone" name="phone" type="tel" placeholder="-" onChange={(e) => changePersonalInformation(0, { ...personalInformation, [e.target.name]: e.target.value })} value={personalInformation.phone} className={`${edits.personalInformation && ' border-2 border-slate-400 rounded focus:border-slate-500'} p-1 disabled:bg-slate-400/10 disabled:rounded`} disabled={!edits.personalInformation} />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="bio" className="mb-1 text-sm">Bio</label>
                    <input id="bio" name="bio" type="text" placeholder="-" onChange={(e) => changePersonalInformation(0, { ...personalInformation, [e.target.name]: e.target.value })} value={personalInformation.bio} className={`${edits.personalInformation && 'border-2 border-slate-400 rounded focus:border-slate-500'} p-1 disabled:bg-slate-400/10 disabled:rounded`} disabled={!edits.personalInformation} />
                  </div>
                </div>
                <div className="md:px-5 pt-6 md:pt-2 grid col-span-3 md:col-span-1 justify-start md:justify-end items-start">
                  <button
                    onClick={(e) => {
                      edits.personalInformation && handleSubmit(e);
                      setEdits((value) => ({
                        personalInformation: !value.personalInformation,
                      }));
                    }}
                    className="grid grid-flow-col px-16 md:px-2 py-1 border justify-center items-center border-slate-300 hover:border-slate-500 active:border-slate-400 text-slate-600 hover:text-slate-700 active:text-slate-600 rounded-full"
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
                <div className="grid grid-cols-1 col-span-3 gap-x-5 gap-y-3">
                  <div className="flex flex-col">
                    <label htmlFor="facebook" className="mb-1 text-sm text-gray-600">Facebook</label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <i className="bx bxl-facebook-square text-2xl text-blue-800" />
                      </div>
                      <input type="text" name="facebook" id="facebook" value={socialMediaLinks.facebook} disabled={socialMediaAttachment.facebook} onChange={(e) => changeSocialMediaLinks(0, { ...socialMediaLinks, [e.target.name]: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-11 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter URL" required />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <i
                          className={`${socialMediaAttachment.facebook ? 'bx bx-unlink' : 'bx bx-link'} border border-slate-300 active:border-slate-400 p-0.5 rounded`}
                          onClick={() => {
                            if (!socialMediaAttachment.facebook && !socialMediaLinks.facebook) {
                              alertToast('Incorrect URL');
                            } else if (socialMediaLinks.facebook.includes('facebook.com')) {
                              changeSocialMediaAttachment(0, { ...socialMediaAttachment, facebook: !socialMediaAttachment.facebook });
                              changeSocialMediaLinks(0, { ...socialMediaLinks, facebook: (socialMediaAttachment.facebook ? '' : socialMediaLinks.facebook) });
                            } else {
                              alertToast('Please Input \'facebook.com\' URL');
                            }
                          }}
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
                      <input type="text" id="simple-search" name="instagram" value={socialMediaLinks.instagram} disabled={socialMediaAttachment.instagram} onChange={(e) => changeSocialMediaLinks(0, { ...socialMediaLinks, [e.target.name]: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-11 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter URL" required />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <i
                          className={`${socialMediaAttachment.instagram ? 'bx bx-unlink' : 'bx bx-link'} border border-slate-300 active:border-slate-400 p-0.5 rounded`}
                          onClick={() => {
                            if (!socialMediaAttachment.instagram && !socialMediaLinks.instagram) {
                              alertToast('Incorrect URL');
                            } else if (socialMediaLinks.instagram.includes('instagram.com')) {
                              changeSocialMediaAttachment(0, { ...socialMediaAttachment, instagram: !socialMediaAttachment.instagram });
                              changeSocialMediaLinks(0, { ...socialMediaLinks, instagram: (socialMediaAttachment.instagram ? '' : socialMediaLinks.instagram) });
                            } else {
                              alertToast('Please Input \'instagram.com\' URL');
                            }
                          }}
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
                      <input type="text" id="simple-search" name="twitter" value={socialMediaLinks.twitter} disabled={socialMediaAttachment.twitter} onChange={(e) => changeSocialMediaLinks(0, { ...socialMediaLinks, [e.target.name]: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-11 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter URL" required />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <i
                          className={`${socialMediaAttachment.twitter ? 'bx bx-unlink' : 'bx bx-link'} border border-slate-300 active:border-slate-400 p-0.5 rounded`}
                          onClick={() => {
                            if (!socialMediaAttachment.twitter && !socialMediaLinks.twitter) {
                              alertToast('Incorrect URL');
                            } else if (socialMediaLinks.twitter.includes('twitter.com')) {
                              changeSocialMediaAttachment(0, { ...socialMediaAttachment, twitter: !socialMediaAttachment.twitter });
                              changeSocialMediaLinks(0, { ...socialMediaLinks, twitter: (socialMediaAttachment.twitter ? '' : socialMediaLinks.twitter) });
                            } else {
                              alertToast('Please Input \'twitter.com\' URL');
                            }
                          }}
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
