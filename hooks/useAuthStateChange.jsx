import { useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from '../config/firebase';

export default function useAuthStateChange(nullCallback) {
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = () => onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLogin(true);
      } else {
        setIsLogin(false);
        nullCallback && nullCallback();
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    user,
    isLogin,
  };
}
