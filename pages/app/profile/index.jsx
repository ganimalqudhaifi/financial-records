import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppLayout, EditableAccount } from '../../../components';
import { auth, updateProfile } from '../../../config/firebase';
import { useGlobalContext } from '../../../context';
import {
  alertToast,
  checkUserAuth,
} from '../../../utils';
import { useAccounts } from '../../../hooks';

export default function App() {
  const { accounts, addAccount } = useAccounts();
  const { state, changeIsLoginState, changeUserState } = useGlobalContext();
  const { isLogin, user } = state;

  const [edits, setEdits] = useState({ personalInformation: false });

  const router = useRouter();

  useEffect(() => {
    checkUserAuth((user) => {
      if (user) {
        const { displayName, email, phoneNumber, photoURL, emailVerified, uid } = user;
        changeIsLoginState(true);
        changeUserState({ displayName, email, phoneNumber, photoURL, emailVerified, uid });
      } else {
        changeIsLoginState(false);
        router.push('/');
      }
    });
  }, []);

  const handleInputs = (e) => changeUserState({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(auth.currentUser, { displayName: user.displayName })
      .then(() => {
        changeUserState({
          uid: auth.currentUser.uid,
          displayName: auth.currentUser.displayName,
          email: auth.currentUser.email,
          photoURL: auth.currentUser.photoURL,
          phoneNumber: auth.currentUser.phoneNumber,
          emailVerified: auth.currentUser.emailVerified,
        });
      }).catch((error) => {
        alertToast(error.message);
      });
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
                    <label htmlFor="displayName" className="mb-1 text-sm">Display Name</label>
                    <input id="displayName" name="displayName" type="text" placeholder="displayName" onChange={handleInputs} value={user.displayName} className={`${edits.personalInformation && ' border-2 border-slate-400 rounded focus:border-slate-500'} p-1 disabled:bg-slate-400/10 disabled:rounded`} disabled={!edits.personalInformation} />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="email" className="mb-1 text-sm">Email Address</label>
                    <input id="email" name="email" type="text" placeholder="emailAddress" onChange={handleInputs} value={user.email} className={`${edits.personalInformation && ' border-2 border-slate-400 rounded focus:border-slate-500'} p-1 disabled:bg-slate-400/10 disabled:rounded`} disabled />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="phoneNumber" className="mb-1 text-sm">Phone</label>
                    <input id="phoneNumber" name="phoneNumber" type="tel" placeholder="-" onChange={handleInputs} value={user.phoneNumber || '-'} className={`${edits.personalInformation && ' border-2 border-slate-400 rounded focus:border-slate-500'} p-1 disabled:bg-slate-400/10 disabled:rounded`} disabled={!edits.personalInformation} />
                  </div>
                </div>
                <div className="md:px-5 pb-3 pt-6 grid col-span-3 md:col-span-1 justify-stretch  items-start">
                  <button
                    onClick={(e) => {
                      edits.personalInformation && handleSubmit(e);
                      setEdits((value) => ({ personalInformation: !value.personalInformation }));
                    }}
                    className="grid grid-flow-col px-16 md:px-2 py-1 border justify-center items-center border-slate-300 hover:border-slate-500 active:border-slate-400 text-slate-600 hover:text-slate-700 active:text-slate-600 rounded"
                  >
                    <p className="text-md">
                      {edits.personalInformation ? 'Save' : 'Edit'}
                    </p>
                    {edits.personalInformation ? <i className="ml-1 bx bx-save text-base " /> : <i className="ml-1 bx bx-edit-alt text-base " />}
                  </button>
                </div>
              </form>
            </div>

            {/* <!-- Accounts  --> */}
            <div className="p-5 mt-2.5 w-full bg-white rounded">
              <h3 className="font-medium text-xl">Accounts</h3>
              <div className="p-4 mt-2 bg-gray-100">
                <p className="text-xs italic mb-2">* double click to edit accounts name</p>
                <ul className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  { accounts.length && accounts.map((account) => (
                    <li key={account.id}>
                      <EditableAccount account={account} />
                    </li>
                  )) }
                  <li>
                    <button
                      onClick={() => addAccount({ name: 'New Account', initialBalance: 0 })}
                      className="w-full p-2 rounded-lg border border-slate-700 border-dashed text-gray-900 "
                    >
                      <span>New Account +</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </AppLayout>
      </>
    );
  }
}
