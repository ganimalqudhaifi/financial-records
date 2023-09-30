import { useEffect, useRef, useState } from 'react';
import { useAccounts } from '../../hooks';
import { modal } from '../../utils';
import Modal from './Modal';

export default function EditableAccount({ account }) {
  const { editAccount, deleteAccount } = useAccounts();
  const [isDisabled, setIsDisabled] = useState(true);
  const [inputValue, setInputValue] = useState(account.name);
  const inputRef = useRef(null);

  const handleDoubleClick = () => {
    setIsDisabled(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsDisabled(true);
      const { id, ...rest } = account;
      editAccount(account.id, { ...rest, name: inputValue });
    }
  };

  const handleBlur = () => {
    setIsDisabled(true);
    const { id, ...rest } = account;
    editAccount(account.id, { ...rest, name: inputValue });
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (!isDisabled) {
      inputRef.current.focus();
    }
  }, [isDisabled]);

  if (isDisabled) {
    return (
      <div
        className="relative w-full px-2 py-2 rounded-lg border border-gray-400 bg-gray-200 text-gray-700 hover:text-gray-800"
        onDoubleClick={handleDoubleClick}
      >
        <button
          className="absolute inset-y-auto right-0 px-1 text-gray-700 hover:text-red-700 hover:animate-wiggle"
          onClick={() => {
            modal.show(account.id);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="ionicon w-6 h-6 " viewBox="0 0 512 512">
            <title>Trash</title>
            <path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
            <path stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M80 112h352" />
            <path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
          </svg>
        </button>

        <Modal id={account.id}>
          <div className="w-screen max-w-sm">
            <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h3 className="px-3 my-7 text-lg lg:text-xl text-gray-500 text-center whitespace-normal">
              Apakah anda yakin ingin menghapus
              <br />
              {account.name}
            </h3>
            <div className="flex justify-center">
              <button
                onClick={() => deleteAccount(account.id)}
                className="inline-flex items-center px-5 py-2.5 mr-2 lg:mr-3 text-gray-100 text-center text-sm lg:text-lg font-medium bg-red-600 border border-red-800 rounded-lg hover:grayscale-[20%] focus:ring-4 focus:outline-none focus:ring-red-400/50"
              >
                Hapus
              </button>
              <button className="px-5 py-2.5 text-gray-600 text-sm lg:text-lg font-medium hover:text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200/50" onClick={() => modal.hide(account.id)}>Batal</button>
            </div>
          </div>
        </Modal>
        {account.name}
      </div>
    );
  }

  return (
    <div>
      <input
        type="text"
        ref={inputRef}
        value={inputValue}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onChange={handleChange}
        className="w-full px-2 py-2 pr-7 rounded-lg border border-slate-500 bg-gray-100"
      />
    </div>
  );
}
