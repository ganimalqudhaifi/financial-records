export const globalInitialState = {
  records: [],
  initialBalance: 0,
  searchKeyword: '',
  sliceShow: 10,
  paginationIndex: 1,
  filterPeriod: '',
  isLogin: false,
  isDemo: false,
  user: {},
  hasLoadData: false,
};

export const globalActionType = {
  HANDLE_SEARCH: 'HANDLE_SEARCH',
  HANDLE_SLICE: 'HANDLE_SLICE',
  HANDLE_FILTER_PERIOD: 'HANDLE_FILTER_PERIOD',
  HANDLE_PAGINATION_INDEX: 'HANDLE_PAGINATION_INDEX',
  CHANGE_INITIAL_BALANCE: 'CHANGE_AINITIAL_BALANCE',
  CREATE_RECORD: 'CREATE_RECORD',
  GET_RECORDS: 'GET_RECORDS',
  UPDATE_RECORD: 'UPDATE_RECORD',
  DELETE_RECORD: 'DELETE_RECORD',
  CHANGE_USER: 'CHANGE_USER',
  CHANGE_ISLOGIN: 'CHANGE_ISLOGIN',
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
    case globalActionType.CHANGE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case globalActionType.CHANGE_ISLOGIN:
      return {
        ...state,
        isLogin: action.payload,
      };
    case globalActionType.CHANGE_ISDEMO:
      return {
        ...state,
        isDemo: action.payload,
      };
    case globalActionType.CREATE_RECORD:
      return {
        ...state,
        records: [
          ...state.records,
          action.payload,
        ],
      };
    case globalActionType.GET_RECORDS:
      return {
        ...state,
        records: action.payload,
      };
    case globalActionType.UPDATE_RECORD: {
      const indexRecord = state.records.findIndex((record) => record.id === action.payload.id);
      const updatedRecords = state.records.fill(action.payload, indexRecord, indexRecord + 1);
      return {
        ...state,
        records: updatedRecords,
      };
    }
    case globalActionType.DELETE_RECORD: {
      const records = state.records.filter((record) => record.id !== action.id);
      return {
        ...state,
        records,
      };
    }
    default:
      return state;
  }
};
