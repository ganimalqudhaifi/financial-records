import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth, onAuthStateChanged } from '../config/firebase';

// Create context
export const AuthContext = createContext();

// Hook
export function useAuthContext() {
  const contextValue = useContext(AuthContext);

  if (!contextValue) {
    throw new Error('useAuthContext must be called from within a AppContextProvider');
  }

  const { user, setUser } = contextValue;

  return { user, setUser };
}

// Provider
export default function AuthContextProvider(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return (<AuthContext.Provider value={value} {...props} />);
}
