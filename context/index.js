import {
  createContext, useContext, useMemo, useReducer,
} from 'react';
import { globalReducer, initialState } from './reducer';

export const RootContext = createContext(); // TODO: change instance to GlobalContext

// custom hook to check whether we're in a provider
export const useGlobalContext = () => {
  const contextValue = useContext(RootContext);

  if (!contextValue) {
    throw new Error(
      'useGlobalContext must be called from within a GlobalContextProvider',
    );
  }

  return contextValue;
};

export function GlobalContextProvider(props) {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <RootContext.Provider value={value} {...props} />;
}
