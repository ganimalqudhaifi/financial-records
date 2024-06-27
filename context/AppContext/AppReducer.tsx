import { Account, Record } from "../../types";

export const appInitialState = {
  accounts: [] as Account[],
  activeAccountIndex: 0,
  selectedAccount: {} as Account,
  records: [] as Record[],
  hasDemoLoadRecords: false,
};

export type ACTION_TYPE =
  | { type: "SET_ACCOUNTS"; payload: Account[] }
  | { type: "ADD_ACCOUNTS"; payload: Account }
  | { type: "EDIT_ACCOUNTS"; payload: Account }
  | { type: "DELETE_ACCOUNTS"; id: Account["id"] }
  | { type: "SET_ACTIVE_ACCOUNT_INDEX"; payload: number }
  | { type: "SET_SELECTED_ACCOUNT"; payload: Account }
  | { type: "SET_RECORDS"; payload: Record[] }
  | { type: "ADD_RECORDS"; payload: Record }
  | { type: "EDIT_RECORDS"; payload: Record }
  | { type: "DELETE_RECORDS"; id: Record["id"] }
  | { type: "SET_HAS_DEMO_LOAD_RECORDS"; payload: boolean };

export const appReducer = (
  state: typeof appInitialState,
  action: ACTION_TYPE,
) => {
  switch (action.type) {
    case "SET_ACCOUNTS":
      return {
        ...state,
        accounts: action.payload,
      };
    case "ADD_ACCOUNTS":
      return {
        ...state,
        accounts: [...state.accounts, action.payload],
      };
    case "EDIT_ACCOUNTS": {
      const indexAccount = state.accounts.findIndex(
        (account) => account.id === action.payload.id,
      );
      const updatedAccount = state.accounts.fill(
        action.payload,
        indexAccount,
        indexAccount + 1,
      );
      return {
        ...state,
        accounts: updatedAccount,
      };
    }
    case "DELETE_ACCOUNTS": {
      const filteredAccounts = state.accounts.filter(
        (record) => record.id !== action.id,
      );
      return {
        ...state,
        accounts: filteredAccounts,
      };
    }
    case "SET_ACTIVE_ACCOUNT_INDEX":
      return {
        ...state,
        activeAccountIndex: action.payload,
      };
    case "SET_SELECTED_ACCOUNT":
      return {
        ...state,
        selectedAccount: action.payload,
      };
    case "SET_RECORDS":
      return {
        ...state,
        records: action.payload,
      };
    case "ADD_RECORDS":
      return {
        ...state,
        records: [...state.records, action.payload],
      };
    case "EDIT_RECORDS": {
      const indexRecord = state.records.findIndex(
        (record) => record.id === action.payload.id,
      );
      const updatedRecord = state.records.fill(
        action.payload,
        indexRecord,
        indexRecord + 1,
      );
      return {
        ...state,
        records: updatedRecord,
      };
    }
    case "DELETE_RECORDS": {
      const filteredRecords = state.records.filter(
        (record) => record.id !== action.id,
      );
      return {
        ...state,
        records: filteredRecords,
      };
    }
    case "SET_HAS_DEMO_LOAD_RECORDS":
      return {
        ...state,
        hasDemoLoadRecords: action.payload,
      };
    default:
      return state;
  }
};
