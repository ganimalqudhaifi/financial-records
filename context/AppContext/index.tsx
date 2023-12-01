import { createContext, useContext, useMemo, useReducer } from 'react';
import { appInitialState, appReducer } from './AppReducer';

// Create context
export const AppContext = createContext(null);

// Hook
export function useAppContext() {
  const contextValue = useContext(AppContext);

  if (!contextValue) {
    throw new Error('useAppContext must be called from within a AppContextProvider');
  }

  const { state, dispatch } = contextValue;

  return { state, dispatch };
}

// Provider
export default function AppContextProvider(props) {
  const [state, dispatch] = useReducer(appReducer, appInitialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return (<AppContext.Provider value={value} {...props} />);
}

export * from './AppReducer';
