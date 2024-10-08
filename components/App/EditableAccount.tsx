import { ChangeEvent, KeyboardEvent, useState } from "react";
import { IoAlertCircleOutline, IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  firebaseDeleteAccount,
  firebaseUpdateAccount,
} from "@/lib/firebase/database";
import {
  deleteAccount,
  selectAccount,
  selectAccounts,
  updateAccount,
} from "@/lib/redux/features/accounts/accountsSlice";
import { selectDemo } from "@/lib/redux/features/demo/demoSlice";
import { Account } from "../../types";
import Modal from "../Modal";

type EditableAccountProps = {
  account: Account;
};

export default function EditableAccount({ account }: EditableAccountProps) {
  const { accounts } = useSelector(selectAccounts);
  const { isDemo } = useSelector(selectDemo);
  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(true);
  const [inputValue, setInputValue] = useState(account.name);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDoubleClick = () => {
    setIsDisabled(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const updatedAccount = { ...account, name: inputValue };
      setIsDisabled(true);
      !isDemo
        ? firebaseUpdateAccount(updatedAccount)
        : dispatch(updateAccount(updatedAccount));
    }
  };

  const handleBlur = () => {
    const updatedAccount = { ...account, name: inputValue };
    setIsDisabled(true);
    !isDemo
      ? firebaseUpdateAccount(updatedAccount)
      : dispatch(updateAccount(updatedAccount));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleDelete = () => {
    !isDemo
      ? firebaseDeleteAccount(account.id)
      : dispatch(deleteAccount(account));
    dispatch(selectAccount(accounts[0]));
  };

  if (isDisabled) {
    return (
      <div
        className="relative w-full px-2 py-2 rounded-lg border border-gray-400 bg-gray-200 text-gray-700 hover:text-gray-800"
        onDoubleClick={handleDoubleClick}
      >
        <button
          className="absolute inset-y-auto right-0 px-1 text-gray-700 hover:text-red-700 hover:animate-wiggle"
          onClick={() => setIsModalOpen(true)}
        >
          <IoTrashOutline className="w-6 h-6" />
        </button>

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <div className="w-screen max-w-sm">
              <IoAlertCircleOutline className="mx-auto mb-4 text-gray-400 w-14 h-14" />
              <h3 className="px-3 my-7 text-lg lg:text-xl text-gray-500 text-center whitespace-normal">
                Apakah anda yakin ingin menghapus
                <br />
                {account.name}
              </h3>
              <div className="flex justify-center">
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center px-5 py-2.5 mr-2 lg:mr-3 text-gray-100 text-center text-sm lg:text-lg font-medium bg-red-600 border border-red-800 rounded-lg hover:grayscale-[20%] focus:ring-4 focus:outline-none focus:ring-red-400/50"
                >
                  Hapus
                </button>
                <button
                  className="px-5 py-2.5 text-gray-600 text-sm lg:text-lg font-medium hover:text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200/50"
                  onClick={() => setIsModalOpen(false)}
                >
                  Batal
                </button>
              </div>
            </div>
          </Modal>
        )}
        {account.name}
      </div>
    );
  }

  return (
    <div>
      <input
        type="text"
        // ref={inputRef}
        value={inputValue}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onChange={handleChange}
        className="w-full px-2 py-2 pr-7 rounded-lg border border-slate-500 bg-gray-100"
      />
    </div>
  );
}
