import { createContext, useContext } from 'react';

const AppContext = createContext();

export function useAppContext() {
  const contextValue = useContext(AppContext);

  if (!contextValue) {
    throw new Error('useAppContext must be called from within a AppContextProvider');
  }

  return contextValue;
}

export default AppContext;
