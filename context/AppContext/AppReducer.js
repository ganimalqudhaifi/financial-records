export const appInitialState = {
  accounts: [],
  activeAccountIndex: 0,
  selectedAccount: {},
  records: [],
};

export const appActionType = {
  SET_ACCOUNTS: 'SET_ACCOUNTS',
  ADD_ACCOUNTS: 'ADD_ACCOUNTS',
  EDIT_ACCOUNTS: 'EDIT_ACCOUNTS',
  DELETE_ACCOUNTS: 'DELETE_ACCOUNTS',
  SET_ACTIVE_ACCOUNT_INDEX: 'SET_ACTIVE_ACCOUNT_INDEX',
  SET_SELECTED_ACCOUNT: 'SET_SELECTED_ACCOUNT',
  SET_RECORDS: 'SET_RECORDS',
  ADD_RECORDS: 'ADD_RECORDS',
  EDIT_RECORDS: 'EDIT_RECORDS',
  DELETE_RECORDS: 'DELETE_RECORDS',
  RESET_STATE: 'RESET_STATE',
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case appActionType.SET_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload,
      };
    case appActionType.ADD_ACCOUNTS:
      return {
        ...state,
        accounts: [
          ...state.accounts,
          action.payload,
        ],
      };
    case appActionType.EDIT_ACCOUNTS: {
      const indexAccount = state.accounts.findIndex((account) => account.id === action.id);
      const updatedAccount = state.accounts.fill(action.payload, indexAccount, indexAccount + 1);
      return {
        ...state,
        accounts: updatedAccount,
      };
    }
    case appActionType.DELETE_ACCOUNTS: {
      const filteredAccounts = state.accounts.filter((record) => record.id !== action.id);
      return {
        ...state,
        accounts: filteredAccounts,
      };
    }
    case appActionType.SET_ACTIVE_ACCOUNT_INDEX:
      return {
        ...state,
        activeAccountIndex: action.payload,
      };
    case appActionType.SET_SELECTED_ACCOUNT:
      return {
        ...state,
        selectedAccount: action.payload,
      };
    case appActionType.SET_RECORDS:
      return {
        ...state,
        records: action.payload,
      };
    case appActionType.ADD_RECORDS:
      return {
        ...state,
        records: [
          ...state.records,
          action.payload,
        ],
      };
    case appActionType.EDIT_RECORDS: {
      const indexRecord = state.records.findIndex((record) => record.id === action.id);
      const updatedRecord = state.records.fill(action.payload, indexRecord, indexRecord + 1);
      return {
        ...state,
        records: updatedRecord,
      };
    }
    case appActionType.DELETE_RECORDS: {
      const filteredRecords = state.records.filter((record) => record.id !== action.id);
      return {
        ...state,
        records: filteredRecords,
      };
    }
    case appActionType.RESET_STATE: {
      return {
        ...state,
        accounts: appInitialState.accounts,
        records: appInitialState.records,
      };
    }
    default:
      return state;
  }
};
