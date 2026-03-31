import { firebaseAddAccount } from "@/features/account/account.service";
import { addAccount, selectAccounts } from "@/features/account/account.slice";
import { selectDemo } from "@/features/demo/demo.slice";
import EditableAccount from "@/features/profile/components/EditableAccount";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function AccountList() {
  const { accounts } = useAppSelector(selectAccounts);
  const { isDemo } = useAppSelector(selectDemo);
  const dispatch = useAppDispatch();

  return (
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
  );
}
