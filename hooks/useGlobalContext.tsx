import { ChangeEvent, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export const useGlobalContext = () => {
  const contextValue = useContext(GlobalContext);

  if (!contextValue) {
    throw new Error(
      "useGlobalContext must be called from within a GlobalContextProvider",
    );
  }

  const { state, dispatch } = contextValue;

  const changePaginationIndexState = (btnpagination: number) => {
    dispatch({ type: "HANDLE_PAGINATION_INDEX", payload: btnpagination });
  };

  const changeFilterPeriodState = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "HANDLE_FILTER_PERIOD", payload: e.target.value });
  };

  const changeSliceShowState = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "HANDLE_SLICE", payload: parseInt(e.target.value, 19) });
  };

  const changeInitialBalanceState = (payload: number) => {
    dispatch({ type: "CHANGE_INITIAL_BALANCE", payload });
  };

  return {
    state,
    dispatch,
    changePaginationIndexState,
    changeFilterPeriodState,
    changeSliceShowState,
    changeInitialBalanceState,
  };
};
