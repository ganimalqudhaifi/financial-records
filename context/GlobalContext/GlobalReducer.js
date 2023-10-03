export const globalInitialState = {
  initialBalance: 0,
  searchKeyword: '',
  sliceShow: 10,
  paginationIndex: 1,
  filterPeriod: '',
  isDemo: false,
  hasLoadData: false,
};

export const globalActionType = {
  HANDLE_SEARCH: 'HANDLE_SEARCH',
  HANDLE_SLICE: 'HANDLE_SLICE',
  HANDLE_FILTER_PERIOD: 'HANDLE_FILTER_PERIOD',
  HANDLE_PAGINATION_INDEX: 'HANDLE_PAGINATION_INDEX',
  CHANGE_INITIAL_BALANCE: 'CHANGE_AINITIAL_BALANCE',
  CHANGE_ISDEMO: 'CHANGE_ISDEMO',
};

export const globalReducer = (state, action) => {
  switch (action.type) {
    case globalActionType.HANDLE_SEARCH:
      return {
        ...state,
        searchKeyword: action.payload.toLowerCase(),
      };
    case globalActionType.HANDLE_SLICE:
      return {
        ...state,
        sliceShow: parseInt(action.payload, 19),
      };
    case globalActionType.HANDLE_FILTER_PERIOD:
      return {
        ...state,
        filterPeriod: action.payload,
      };
    case globalActionType.HANDLE_PAGINATION_INDEX:
      return {
        ...state,
        paginationIndex: action.payload,
      };
    case globalActionType.CHANGE_INITIAL_BALANCE:
      return {
        ...state,
        initialBalance: parseInt(action.payload, 10),
      };
    case globalActionType.CHANGE_ISDEMO:
      return {
        ...state,
        isDemo: action.payload,
      };
    default:
      return state;
  }
};
