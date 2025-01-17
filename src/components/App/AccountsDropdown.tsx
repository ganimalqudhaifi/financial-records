import { useEffect, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAccount,
  selectAccounts,
} from "@/lib/redux/features/accounts/accountsSlice";
import { Account } from "@/types";

export default function AccountsDropdown() {
  const { accounts, selectedAccount } = useSelector(selectAccounts);
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (accounts.length && Object.keys(selectedAccount).length === 0) {
      dispatch(selectAccount(accounts[0]));
    }
  }, [accounts, dispatch, selectedAccount]);

  const handleSelectAccount = (account: Account) => {
    setIsActive(!isActive);
    dispatch(selectAccount(account));
  };

  return (
    <div className="my-1.5">
      <button
        type="button"
        className={`group peer ${isActive && "is-active"} inline-flex justify-between items-center w-full p-2 rounded-lg text-white font-medium hover:bg-slate-800`}
        onClick={() => setIsActive(!isActive)}
      >
        {selectedAccount?.name ? <p>{selectedAccount.name}</p> : <p>...</p>}
        <IoChevronDownOutline className="ml-2.5 group-[.is-active]:-rotate-90 duration-300" />
      </button>
      <div className="overflow-hidden max-h-72 duration-500 peer-[.is-active]:max-h-0 peer-[.is-active]:duration-200">
        <ul>
          {accounts.map((account) => (
            <li
              key={account.id}
              className="ml-2 text-sm text-slate-400 font-semibold capitalize hover:text-slate-300 hover:cursor-pointer"
            >
              <button
                className="w-full p-2 text-left"
                onClick={() => handleSelectAccount(account)}
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
