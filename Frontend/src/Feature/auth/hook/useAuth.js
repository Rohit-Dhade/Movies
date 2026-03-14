import { useContext, useEffect } from "react";
import { register, login, getme, logout } from "../services/auth.api";

import { AuthContext } from "../auth.context";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { loading, setLoading, user, setuser } = context;

  async function handleRegister(username, email, password) {
    setLoading(true);
    const data = await register(username, email, password);
    setuser(data);
    setLoading(false);
  }

  async function handleLogin(username, email, password) {
    setLoading(true);
    const data = await login(username, email, password);
    setuser(data);
    setLoading(false);
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
    handleRegister,
    handleLogin,
    handlegetme,
    handlelogout,
  };
};