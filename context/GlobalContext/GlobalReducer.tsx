export const globalInitialState = {
  initialBalance: 0,
  searchKeyword: '',
  sliceShow: 10,
  paginationIndex: 1,
  filterPeriod: '',
  isDemo: false,
  hasLoadData: false,
};

export type ACTION_TYPE =
  | { type: 'HANDLE_SEARCH', payload: string }
  | { type: 'HANDLE_SLICE', payload: string } // need check how to change it to number
  | { type: 'HANDLE_FILTER_PERIOD', payload: string }
  | { type: 'HANDLE_PAGINATION_INDEX', payload: number }
  | { type: 'CHANGE_INITIAL_BALANCE', payload: string } // need check how to change it to number
  | { type: 'SET_ISDEMO', payload: boolean }

// TODO! Cross Check all related to action type on this reducer
export const globalReducer = (state: typeof globalInitialState, action: ACTION_TYPE) => {
  switch (action.type) {
    case 'HANDLE_SEARCH':
      return {
        ...state,
        searchKeyword: action.payload.toLowerCase(),
      };
    case 'HANDLE_SLICE':
      return {
        ...state,
        sliceShow: parseInt(action.payload, 19),
      };
    case 'HANDLE_FILTER_PERIOD':
      return {
        ...state,
        filterPeriod: action.payload,
      };
    case 'HANDLE_PAGINATION_INDEX':
      return {
        ...state,
        paginationIndex: action.payload,
      };
    case 'CHANGE_INITIAL_BALANCE':
      return {
        ...state,
        initialBalance: parseInt(action.payload, 10),
      };
    case 'SET_ISDEMO':
      return {
        ...state,
        isDemo: action.payload,
      };
    default:
      return state;
  }
};
