export const appInitialState = { accounts: [] };

export const appActionType = {
  SET_ACCOUNTS: 'SET_ACCOUNTS',
  ADD_ACCOUNTS: 'ADD_ACCOUNTS',
  EDIT_ACCOUNTS: 'EDIT_ACCOUNTS',
  DELETE_ACCOUNTS: 'DELETE_ACCOUNTS',

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
    default:
      return state;
  }
};
