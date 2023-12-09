export const appInitialState = {
  accounts: [] as any[], // change it later
  activeAccountIndex: 0,
  selectedAccount: {},
  records: [] as any[], // change it later
  hasDemoLoadRecords: false,
};

export type ACTION_TYPE =
  | {type: 'SET_ACCOUNTS', payload: any} // neeed to research
  | {type: 'ADD_ACCOUNTS', payload: any} // neeed to research
  | {type: 'EDIT_ACCOUNTS', payload: any, id: any} // neeed to research
  | {type: 'DELETE_ACCOUNTS', id: any} // neeed to research
  | {type: 'SET_ACTIVE_ACCOUNT_INDEX', payload: any} // neeed to research
  | {type: 'SET_SELECTED_ACCOUNT', payload: any} // neeed to research
  | {type: 'SET_RECORDS', payload: any} // neeed to research
  | {type: 'ADD_RECORDS', payload: any} // neeed to research
  | {type: 'EDIT_RECORDS', payload: any, id: any} // neeed to research
  | {type: 'DELETE_RECORDS', id: any} // neeed to research
  | {type: 'SET_HAS_DEMO_LOAD_RECORDS', payload: any} // neeed to research

export const appReducer = (state: typeof appInitialState, action: ACTION_TYPE) => {
  switch (action.type) {
    case 'SET_ACCOUNTS':
      return {
        ...state,
        accounts: action.payload,
      };
    case 'ADD_ACCOUNTS':
      return {
        ...state,
        accounts: [
          ...state.accounts,
          action.payload,
        ],
      };
    case 'EDIT_ACCOUNTS': {
      const indexAccount = state.accounts.findIndex((account) => account.id === action.id);
      const updatedAccount = state.accounts.fill(action.payload, indexAccount, indexAccount + 1);
      return {
        ...state,
        accounts: updatedAccount,
      };
    }
    case 'DELETE_ACCOUNTS': {
      const filteredAccounts = state.accounts.filter((record) => record.id !== action.id);
      return {
        ...state,
        accounts: filteredAccounts,
      };
    }
    case 'SET_ACTIVE_ACCOUNT_INDEX':
      return {
        ...state,
        activeAccountIndex: action.payload,
      };
    case 'SET_SELECTED_ACCOUNT':
      return {
        ...state,
        selectedAccount: action.payload,
      };
    case 'SET_RECORDS':
      return {
        ...state,
        records: action.payload,
      };
    case 'ADD_RECORDS':
      return {
        ...state,
        records: [
          ...state.records,
          action.payload,
        ],
      };
    case 'EDIT_RECORDS': {
      const indexRecord = state.records.findIndex((record) => record.id === action.id);
      const updatedRecord = state.records.fill(action.payload, indexRecord, indexRecord + 1);
      return {
        ...state,
        records: updatedRecord,
      };
    }
    case 'DELETE_RECORDS': {
      const filteredRecords = state.records.filter((record) => record.id !== action.id);
      return {
        ...state,
        records: filteredRecords,
      };
    }
    case 'SET_HAS_DEMO_LOAD_RECORDS':
      return {
        ...state,
        hasDemoLoadRecords: action.payload,
      };
    default:
      return state;
  }
};
