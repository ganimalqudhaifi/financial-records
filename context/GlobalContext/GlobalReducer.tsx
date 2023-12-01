export const globalInitialState = {
  initialBalance: 0,
  searchKeyword: '',
  sliceShow: 10,
  paginationIndex: 1,
  filterPeriod: '',
  isDemo: false,
  hasLoadData: false,
};

export const GLOBAL_ACTION_TYPE = {
  HANDLE_SEARCH: 'HANDLE_SEARCH',
  HANDLE_SLICE: 'HANDLE_SLICE',
  HANDLE_FILTER_PERIOD: 'HANDLE_FILTER_PERIOD',
  HANDLE_PAGINATION_INDEX: 'HANDLE_PAGINATION_INDEX',
  CHANGE_INITIAL_BALANCE: 'CHANGE_AINITIAL_BALANCE',
  SET_ISDEMO: 'SET_ISDEMO',
};

export const globalReducer = (state, action) => {
  switch (action.type) {
    case GLOBAL_ACTION_TYPE.HANDLE_SEARCH:
      return {
        ...state,
        searchKeyword: action.payload.toLowerCase(),
      };
    case GLOBAL_ACTION_TYPE.HANDLE_SLICE:
      return {
        ...state,
        sliceShow: parseInt(action.payload, 19),
      };
    case GLOBAL_ACTION_TYPE.HANDLE_FILTER_PERIOD:
      return {
        ...state,
        filterPeriod: action.payload,
      };
    case GLOBAL_ACTION_TYPE.HANDLE_PAGINATION_INDEX:
      return {
        ...state,
        paginationIndex: action.payload,
      };
    case GLOBAL_ACTION_TYPE.CHANGE_INITIAL_BALANCE:
      return {
        ...state,
        initialBalance: parseInt(action.payload, 10),
      };
    case GLOBAL_ACTION_TYPE.SET_ISDEMO:
      return {
        ...state,
        isDemo: action.payload,
      };
    default:
      return state;
  }
};
