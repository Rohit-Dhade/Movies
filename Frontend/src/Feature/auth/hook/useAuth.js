import { useContext, useEffect, useState } from "react";
import { register, login, getme, logout } from "../services/auth.api";

import { AuthContext } from "../auth.context";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { loading, setLoading, user, setuser } = context;
  const [error, setError] = useState(null);

  async function handleRegister(username, email, password) {
    setLoading(true);
    const data = await register(username, email, password);
    setuser(data);
    setLoading(false);
  }

  async function handleLogin(username, email, password) {
    try {
      setLoading(true);
      const data = await login(username, email, password);
      if (data.success) {
        setuser(data);
        setError(null);
        return true;
      } else {
        setError(data.message);
        return false;
      }
    } catch (err) {
      setError("Login Failed");
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function handlegetme() {
    setLoading(true);
    const data = await getme();
    setuser(data);
    setLoading(false);
  }

  async function handlelogout() {
    setLoading(true);
    const data = await logout();
    setuser(null);
    setLoading(false);
  }

  return {
    user,
    loading,
    error,
    handleRegister,
    handleLogin,
    handlegetme,
    handlelogout,
  };
};
