export interface GlobalState {
  initialBalance: number;
  searchKeyword: string;
  sliceShow: number;
  paginationIndex: number;
  filterPeriod: string;
  isDemo: boolean;
  hasLoadData: boolean;
}

export type ActionType =
  | { type: "HANDLE_SEARCH"; payload: string }
  | { type: "HANDLE_SLICE"; payload: number }
  | { type: "HANDLE_FILTER_PERIOD"; payload: string }
  | { type: "HANDLE_PAGINATION_INDEX"; payload: number }
  | { type: "CHANGE_INITIAL_BALANCE"; payload: number }
  | { type: "SET_ISDEMO"; payload: boolean };

// TODO! Cross Check all related to action type on this reducer
export const globalReducer = (state: GlobalState, action: ActionType) => {
  switch (action.type) {
    case "HANDLE_SEARCH":
      return {
        ...state,
        searchKeyword: action.payload.toLowerCase(),
      };
    case "HANDLE_SLICE":
      return {
        ...state,
        sliceShow: action.payload,
      };
    case "HANDLE_FILTER_PERIOD":
      return {
        ...state,
        filterPeriod: action.payload,
      };
    case "HANDLE_PAGINATION_INDEX":
      return {
        ...state,
        paginationIndex: action.payload,
      };
    case "CHANGE_INITIAL_BALANCE":
      return {
        ...state,
        initialBalance: action.payload,
      };
    case "SET_ISDEMO":
      return {
        ...state,
        isDemo: action.payload,
      };
    default:
      return state;
  }
};
