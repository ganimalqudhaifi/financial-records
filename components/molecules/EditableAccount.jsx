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
    (e.key === 'Enter') && setIsDisabled(true);
    editAccount(account.id, { name: inputValue });
  };

  const handleBlur = () => {
    setIsDisabled(true);
    editAccount(account.id, { name: inputValue });
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
        className="relative w-full px-2 py-2 rounded-lg border border-slate-500 bg-gray-200"
        onDoubleClick={handleDoubleClick}
      >
        <button
          className="absolute inset-y-auto right-0 px-1 text-gray-700 hover:text-red-700 hover:animate-wiggle"
          onClick={() => {
            // deleteAccount(account.id);
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

        <Modal style="modal-content-delete" id={account.id}>
          <div>
            <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h3 className="px-3 mb-5 text-lg lg:text-xl text-gray-500 text-center whitespace-normal">
              Apakah anda yaking ingin menghapus
              <br />
              {account.name}
            </h3>
            <div className="flex justify-center">
              <button
                onClick={() => deleteAccount(account.id)}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm lg:text-lg inline-flex items-center px-5 py-2.5 text-center mr-2 lg:mr-3"
              >
                Hapus
              </button>
              <button className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm lg:text-lg font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={() => modal.hide(account.id)}>Batal</button>
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
