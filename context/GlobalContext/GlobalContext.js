import { createContext, useContext } from 'react';

const GlobalContext = createContext();

// custom hook to check whether we're in a provider
export const useGlobalContext = () => {
  const contextValue = useContext(GlobalContext);

  if (!contextValue) {
    throw new Error('useGlobalContext must be called from within a GlobalContextProvider');
  }

  return contextValue;
};

export default GlobalContext;
