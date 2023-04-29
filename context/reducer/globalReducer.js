export const initialState = {
  records: [],
  saldoAwal: 0,
  searchKeyword: '',
  sliceShow: 10,
  paginationIndex: 1,
  filterPeriod: '',
  isLogin: false,
  isDemo: false,
  user: {},
  personalInformation: {
    firstName: 'New',
    lastName: 'User',
    phone: '',
    bio: '',
  },
  socialMediaLinks: {
    facebook: '',
    instagram: '',
    twitter: '',
  },
  socialMediaAttachment: {
    facebook: false,
    instagram: false,
    twitter: false,
  },
};

export const globalActionType = {
  SHOW_MODAL: 'SHOW_MODAL',
  HIDE_MODAL: 'HIDE_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  HANDLE_SEARCH: 'HANDLE_SEARCH',
  HANDLE_SLICE: 'HANDLE_SLICE',
  HANDLE_FILTER_PERIOD: 'HANDLE_FILTER_PERIOD',
  CHANGE_PAGINATION_INDEX: 'CHANGE_PAGINATION_INDEX',
  CHANGE_SALDO_AWAL: 'CHANGE_SALDO_AWAL',
  CHANGE_PERSONAL_INFORMATION: 'CHANGE_PERSONAL_INFORMATION',
  CHANGE_SOCIAL_MEDIA_LINKS: 'CHANGE_SOCIAL_MEDIA_LINKS',
  CHANGE_SOCIAL_MEDIA_ATTACHMENT: 'CHANGE_SOCIAL_MEDIA_ATTACHMENT',
  CREATE_RECORD: 'CREATE_RECORD',
  GET_RECORDS: 'GET_RECORDS',
  UPDATE_RECORD: 'UPDATE_RECORD',
  DELETE_RECORD: 'DELETE_RECORD',
  CHANGE_USER: 'CHANGE_USER',
  ISLOGIN: 'ISLOGIN',
  ISDEMO: 'ISDEMO',
};

export const globalReducer = (state, action) => {
  switch (action.type) {
    case globalActionType.SHOW_MODAL:
      document.getElementById(action.action).style.display = 'block';
      return state;
    case globalActionType.HIDE_MODAL:
      document.getElementById(action.action).style.display = 'none';
      return state;
    case globalActionType.CLOSE_MODAL:
      if (action.event.target === document.getElementById(action.action)) {
        document.getElementById(action.action).style.display = 'none';
      }
      return state;
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
    case globalActionType.CHANGE_PAGINATION_INDEX:
      return {
        ...state,
        paginationIndex: action.payload,
      };
    case globalActionType.CHANGE_SALDO_AWAL:
      return {
        ...state,
        saldoAwal: parseInt(action.payload, 10),
      };
    case globalActionType.CHANGE_SOCIAL_MEDIA_LINKS:
      return {
        ...state,
        socialMediaLinks: action.payload,
      };
    case globalActionType.CHANGE_SOCIAL_MEDIA_ATTACHMENT:
      return {
        ...state,
        socialMediaAttachment: action.payload,
      };
    case globalActionType.CHANGE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case globalActionType.CHANGE_PERSONAL_INFORMATION:
      return {
        ...state,
        personalInformation: action.payload,
      };
    case globalActionType.ISLOGIN:
      return {
        ...state,
        isLogin: action.payload,
      };
    case globalActionType.ISDEMO:
      return {
        ...state,
        isDemo: action.payload,
      };
    case globalActionType.CREATE_RECORD:
      return {
        ...state,
        records: [
          ...state.records,
          {
            ...action.payload,
          },
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
