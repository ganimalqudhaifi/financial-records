import { useMemo, useReducer } from 'react';
import { globalReducer, globalInitialState, globalActionType } from './GlobalReducer';
import GlobalContext from './GlobalContext';

export default function GlobalContextProvider(props) {
  const [state, dispatch] = useReducer(globalReducer, globalInitialState);

  const changeIsLoginState = (payload) => {
    dispatch({ type: globalActionType.ISLOGIN, payload });
  };

  const changeUserState = (payload) => {
    dispatch({ type: globalActionType.CHANGE_USER, payload });
  };

  const value = useMemo(() => ({
    state, dispatch, changeIsLoginState, changeUserState,
  }), [state]);
  return (<GlobalContext.Provider value={value} {...props} />);
}
