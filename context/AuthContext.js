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

  const { user, setUser, isLogin } = contextValue;

  return { user, setUser, isLogin };
}

// Provider
export default function AuthContextProvider(props) {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLogin(true);
      } else {
        setUser(null);
        setIsLogin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(() => ({ user, setUser, isLogin }), [user, isLogin]);

  return (<AuthContext.Provider value={value} {...props} />);
}
