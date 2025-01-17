import type { RootState } from "@/lib/redux/store";
import { Account } from "@/types";
import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

interface AccountsState {
  accounts: Account[];
  selectedAccount: Account;
}

const initialState: AccountsState = {
  accounts: [],
  selectedAccount: {} as Account,
};

export const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    setAccounts: (state, action: PayloadAction<Account[]>) => {
      state.accounts = action.payload;
    },
    addAccount: (state, action: PayloadAction<Omit<Account, "id">>) => {
      const id = nanoid();
      state.accounts.push({ ...action.payload, id });
    },
    updateAccount: (state, action: PayloadAction<Account>) => {
      const accountsIndex = state.accounts.findIndex(
        (account) => (account.id = action.payload.id),
      );
      const updatedAccounts = state.accounts.fill(
        action.payload,
        accountsIndex,
        accountsIndex + 1,
      );
      state.accounts = updatedAccounts;
    },
    deleteAccount: (state, action: PayloadAction<Account>) => {
      const filteredAccounts = state.accounts.filter(
        (account) => account.id !== action.payload.id,
      );
      state.accounts = filteredAccounts;
    },
    selectAccount: (state, action: PayloadAction<Account>) => {
      state.selectedAccount = action.payload;
    },
  },
});

export const {
  setAccounts,
  addAccount,
  updateAccount,
  deleteAccount,
  selectAccount,
} = accountsSlice.actions;

export const selectAccounts = (state: RootState) => state.accounts;

export default accountsSlice.reducer;
