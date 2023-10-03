import { useEffect, useState } from 'react';
import { useAccounts } from '../../hooks';

export default function AccountsDropdown() {
  const {
    accounts,
    activeAccountIndex,
    setActiveAccountIndex,
    selectedAccount,
    setSelectedAccount,
  } = useAccounts();

  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (accounts.length) {
      if (accounts.length > activeAccountIndex) {
        setSelectedAccount(accounts[activeAccountIndex]);
      } else {
        setSelectedAccount(accounts[activeAccountIndex - 1]);
      }
    }
  }, [accounts, activeAccountIndex]);

  return (
    <div className="my-1.5">
      <button
        type="button"
        className={`group peer ${isActive && 'is-active'} inline-flex justify-between items-center w-full p-2 rounded-lg text-white font-medium hover:bg-slate-800`}
        onClick={() => setIsActive(!isActive)}
      >
        {
          selectedAccount.name
            ? <p>{selectedAccount.name}</p>
            : <p>...</p>
        }
        <svg className="w-2.5 h-2.5 ml-2.5 group-[.is-active]:-rotate-90 duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>
      <div className="overflow-hidden max-h-72 duration-500 peer-[.is-active]:max-h-0 peer-[.is-active]:duration-200">
        <ul>
          {accounts.map((account, i) => (
            <li key={account.id} className="ml-2 text-sm text-slate-400 font-semibold capitalize hover:text-slate-300 hover:cursor-pointer">
              <button
                className="w-full p-2 text-left"
                onClick={() => {
                  setIsActive(!isActive);
                  setActiveAccountIndex(i);
                }}
              >
                {account.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
