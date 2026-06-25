import { useEffect, useState, useCallback } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { selectAccounts } from "@/features/account/account.selector";
import { selectAccount } from "@/features/account/account.slice";
import { Account } from "@/features/account/account.types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function AccountsDropdown() {
  const { accounts, selectedAccount } = useAppSelector(selectAccounts);
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (accounts.length && Object.keys(selectedAccount).length === 0) {
      dispatch(selectAccount(accounts[0]));
    }
  }, [accounts, dispatch, selectedAccount]);

  const handleSelectAccount = useCallback(
    (account: Account) => {
      setIsOpen(false);
      dispatch(selectAccount(account));
    },
    [dispatch],
  );

  return (
    <div className="my-1.5">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-between items-center w-full px-3 py-2.5 rounded-lg text-slate-200 font-medium hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
      >
        {selectedAccount?.name ? (
          <span className="truncate">{selectedAccount.name}</span>
        ) : (
          <span className="text-slate-500">Pilih Akun...</span>
        )}
        <IoChevronDownOutline
          className={`ml-2 w-4 h-4 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-0" : "-rotate-90"
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-72" : "max-h-0"
        }`}
      >
        <ul className="mt-1 space-y-0.5">
          {accounts.map((account) => (
            <li key={account.id}>
              <button
                type="button"
                onClick={() => handleSelectAccount(account)}
                className={`w-full px-3 py-2 text-left text-sm rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  selectedAccount.id === account.id
                    ? "text-white bg-blue-600/20 font-medium"
                    : "text-slate-400 hover:text-slate-300 hover:bg-slate-800"
                }`}
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
