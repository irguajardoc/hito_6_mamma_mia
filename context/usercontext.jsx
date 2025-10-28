import { createContext, useContext, useEffect, useMemo, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem("token") || "demo-token-h7";
    } catch {
      return "demo-token-h7";
    }
  });
  useEffect(() => {
    try {
      if (token) localStorage.setItem("token", token);
      else localStorage.removeItem("token");
    } catch {}
  }, [token]);

  const login = async (email, password) => {
    if (email && password) setToken("demo-token-h7");
    return true;
  };

  const logout = () => setToken("");

  const value = useMemo(() => ({ token, login, logout }), [token]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser debe usarse dentro de <UserProvider>");
  return ctx;
};
