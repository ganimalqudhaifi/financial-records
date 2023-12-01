import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth, onAuthStateChanged } from '../config/firebase';

// Create context
export const AuthContext = createContext(null);

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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const dataUser = {
          displayName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          uid: user.uid,
        };
        await fetch('/api/cookie', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user: JSON.stringify(dataUser) }),
        });
        setUser(dataUser);
      } else {
        await fetch('/api/cookie', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return (<AuthContext.Provider value={value} {...props} />);
}
