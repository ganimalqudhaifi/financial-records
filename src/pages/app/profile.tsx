import { updateProfile } from "firebase/auth";
import Head from "next/head";
import Image from "next/image";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppLayout, EditableAccount, Modal } from "@/components";
import { useAuthContext } from "@/hooks/useAuthContext";
import { auth } from "@/lib/firebase/auth";
import { firebaseAddAccount } from "@/lib/firebase/database";
import {
  addAccount,
  selectAccounts,
} from "@/lib/redux/features/accounts/accountsSlice";
import { selectDemo } from "@/lib/redux/features/demo/demoSlice";
import { DataUser } from "@/types";
import { alertToast } from "@/utils";

type TInputs = Pick<DataUser, "displayName" | "email" | "phoneNumber">;

const avatarLists = [
  "/avatar/boy_01.svg",
  "/avatar/boy_02.svg",
  "/avatar/boy_03.svg",
  "/avatar/boy_04.svg",
  "/avatar/boy_05.svg",
  "/avatar/boy_06.svg",
  "/avatar/boy_07.svg",
  "/avatar/girl_01.svg",
  "/avatar/girl_02.svg",
  "/avatar/girl_03.svg",
  "/avatar/girl_04.svg",
  "/avatar/girl_05.svg",
  "/avatar/girl_06.svg",
  "/avatar/girl_07.svg",
];

export default function Profile() {
  const { accounts } = useSelector(selectAccounts);
  const { isDemo } = useSelector(selectDemo);
  const dispatch = useDispatch();

  const { user, setUser } = useAuthContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edits, setEdits] = useState({ personalInformation: false });
  const [inputs, setInputs] = useState<TInputs>({
    displayName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (user) {
      setInputs(user);
    }
  }, [user]);

  const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await updateProfile(auth.currentUser!, { displayName: inputs.displayName })
      .then(() => {
        setUser({ ...user, displayName: inputs.displayName });
      })
      .catch((error) => {
        alertToast(error.message);
      });
  };

  const handleProfilePicture = async (pathURL: string) => {
    await updateProfile(auth.currentUser!, { photoURL: pathURL })
      .then(() => {
        setUser({ ...user, photoURL: pathURL });
        setIsModalOpen(false);
      })
      .catch((error) => {
        alertToast(error.message);
        setIsModalOpen(false);
      });
  };

  if (user) {
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
              <form
                onSubmit={handleSubmit}
                className={`group ${edits.personalInformation && "can-edit"} mt-5 grid grid-cols-3 md:grid-cols-6 text-gray-600`}
              >
                <div className="grid grid-cols-2 col-span-3 md:col-span-5 gap-x-5 gap-y-3">
                  <div className="flex flex-col">
                    <label htmlFor="displayName" className="mb-1 text-sm">
                      Display Name
                    </label>
                    <input
                      id="displayName"
                      name="displayName"
                      type="text"
                      placeholder="displayName"
                      onChange={handleInputs}
                      value={inputs.displayName!}
                      className="border border-gray-300 p-1 disabled:bg-gray-200 rounded focus:border-gray-800 focus:outline-none group-[.can-edit]:border-gray-400 "
                      disabled={!edits.personalInformation}
                    />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="email" className="mb-1 text-sm">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      placeholder="emailAddress"
                      onChange={handleInputs}
                      value={inputs.email!}
                      className="border border-gray-300 p-1 disabled:bg-gray-200 rounded focus:border-gray-800 focus:outline-none group-[.can-edit]:border-gray-400"
                      disabled
                    />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="phoneNumber" className="mb-1 text-sm">
                      Phone
                    </label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      placeholder="-"
                      onChange={handleInputs}
                      value={inputs.phoneNumber || "-"}
                      className="border border-gray-300 p-1 disabled:bg-gray-200 rounded focus:border-gray-800 focus:outline-none group-[.can-edit]:border-gray-400"
                      disabled
                    />
                  </div>
                </div>
                <div className="md:px-5 pb-3 pt-6 grid col-span-3 md:col-span-1 justify-stretch items-start">
                  <button
                    onClick={(e) => {
                      edits.personalInformation && handleSubmit(e);
                      setEdits((value) => ({
                        personalInformation: !value.personalInformation,
                      }));
                    }}
                    className="grid grid-flow-col px-16 md:px-2 py-1 border justify-center items-center border-slate-300 hover:border-slate-500 active:border-slate-400 text-slate-600 hover:text-slate-700 active:text-slate-600 rounded"
                  >
                    <p className="text-md">
                      {edits.personalInformation ? "Save" : "Edit"}
                    </p>
                    {edits.personalInformation ? (
                      <i className="ml-1 bx bx-save text-base " />
                    ) : (
                      <i className="ml-1 bx bx-edit-alt text-base " />
                    )}
                  </button>
                  <button
                    className="grid grid-flow-col px-16 py-1 mt-4 md:px-2 lg:mt-2 border justify-center items-center bg-slate-700 hover:bg-slate-800/90 border-slate-800 active:border-slate-600 text-slate-200 hover:text-slate-100 active:text-slate-200 rounded"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Change Avatar
                  </button>
                  {isModalOpen && (
                    <Modal onClose={() => setIsModalOpen(false)}>
                      <div className="p-2">
                        <h3 className="text-center text-2xl font-bold tracking-wide mb-6 mt-2">
                          Chose Avatar
                        </h3>
                        <div className="grid grid-cols-4 lg:grid-cols-5 gap-4">
                          {avatarLists.map((path) => (
                            <Image
                              key={path}
                              src={path}
                              alt="avatar"
                              width={100}
                              height={100}
                              className="w-30 transition duration-200 grayscale-[40%] cursor-pointer hover:grayscale-0 hover:scale-105 active:scale-100"
                              onClick={() => handleProfilePicture(path)}
                              style={{
                                maxWidth: "100%",
                                height: "auto",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </Modal>
                  )}
                </div>
              </form>
            </div>

            {/* <!-- Accounts  --> */}
            <div className="p-5 mt-2.5 w-full bg-white rounded">
              <h3 className="font-medium text-xl">Accounts</h3>
              <div className="p-4 mt-2 bg-gray-100">
                <p className="text-xs italic mb-2">
                  * double click to edit accounts name
                </p>
                <ul className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {accounts.length &&
                    accounts.map((account) => (
                      <li key={account.id}>
                        <EditableAccount account={account} />
                      </li>
                    ))}
                  <li>
                    <button
                      onClick={() => {
                        const newAccount = {
                          name: "New Account",
                          initialBalance: 0,
                        };
                        !isDemo
                          ? firebaseAddAccount(newAccount)
                          : dispatch(addAccount(newAccount));
                      }}
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
