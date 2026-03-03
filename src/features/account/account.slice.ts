import { Account } from "@/features/account/account.types";
import type { RootState } from "@/store/store";
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
      const index = state.accounts.findIndex(
        (account) => (account.id === action.payload.id),
      );
      if (index !== -1) {
        state.accounts[index] = action.payload;
      }
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
