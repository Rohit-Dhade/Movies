import { createContext, useState } from "react";
import { useEffect } from "react";
import {getme} from './services/auth.api'

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getme();
        setuser(data);
      } catch {
        setuser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setuser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
