export const appInitialState = {
  accounts: [],
  activeAccountIndex: 0,
  selectedAccount: {},
  records: [],
  hasDemoLoadRecords: false,
};

export const APP_ACTION_TYPE = {
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
  SET_HAS_DEMO_LOAD_RECORDS: 'SET_HAS_DEMO_LOAD_RECORDS',
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case APP_ACTION_TYPE.SET_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload,
      };
    case APP_ACTION_TYPE.ADD_ACCOUNTS:
      return {
        ...state,
        accounts: [
          ...state.accounts,
          action.payload,
        ],
      };
    case APP_ACTION_TYPE.EDIT_ACCOUNTS: {
      const indexAccount = state.accounts.findIndex((account) => account.id === action.id);
      const updatedAccount = state.accounts.fill(action.payload, indexAccount, indexAccount + 1);
      return {
        ...state,
        accounts: updatedAccount,
      };
    }
    case APP_ACTION_TYPE.DELETE_ACCOUNTS: {
      const filteredAccounts = state.accounts.filter((record) => record.id !== action.id);
      return {
        ...state,
        accounts: filteredAccounts,
      };
    }
    case APP_ACTION_TYPE.SET_ACTIVE_ACCOUNT_INDEX:
      return {
        ...state,
        activeAccountIndex: action.payload,
      };
    case APP_ACTION_TYPE.SET_SELECTED_ACCOUNT:
      return {
        ...state,
        selectedAccount: action.payload,
      };
    case APP_ACTION_TYPE.SET_RECORDS:
      return {
        ...state,
        records: action.payload,
      };
    case APP_ACTION_TYPE.ADD_RECORDS:
      return {
        ...state,
        records: [
          ...state.records,
          action.payload,
        ],
      };
    case APP_ACTION_TYPE.EDIT_RECORDS: {
      const indexRecord = state.records.findIndex((record) => record.id === action.id);
      const updatedRecord = state.records.fill(action.payload, indexRecord, indexRecord + 1);
      return {
        ...state,
        records: updatedRecord,
      };
    }
    case APP_ACTION_TYPE.DELETE_RECORDS: {
      const filteredRecords = state.records.filter((record) => record.id !== action.id);
      return {
        ...state,
        records: filteredRecords,
      };
    }
    case APP_ACTION_TYPE.SET_HAS_DEMO_LOAD_RECORDS:
      return {
        ...state,
        hasDemoLoadRecords: action.payload,
      };
    default:
      return state;
  }
};
