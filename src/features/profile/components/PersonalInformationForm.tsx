import { updateProfile } from "firebase/auth";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { auth } from "@/features/auth/services/auth.client";
import { DataUser } from "@/types";
import { alertToast } from "@/utils";
import AvatarModal from "./AvatarModal";

interface PersonalInformationFormProps {
  user: DataUser | null;
}

type TInputs = Pick<DataUser, "displayName" | "email" | "phoneNumber">;

export default function PersonalInformationForm({
  user,
}: PersonalInformationFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edits, setEdits] = useState({ personalInformation: false });
  const [inputs, setInputs] = useState<TInputs>({
    displayName: "",
    email: "",
    phoneNumber: "",
  });

  if (user) {
    setInputs(user);
  }

  const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await updateProfile(auth.currentUser!, { displayName: inputs.displayName })
      .then(() => {})
      .catch((error) => {
        alertToast(error.message);
      });
  };

  return (
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
          {isModalOpen && <AvatarModal onClose={() => setIsModalOpen(false)} />}
        </div>
      </form>
    </div>
  );
}
