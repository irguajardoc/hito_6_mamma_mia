import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { API_URL } from "../src/utils/config";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // HITO 8
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (email) localStorage.setItem("email", email);
    else localStorage.removeItem("email");
  }, [email]);

  
  const fetchProfile = async () => {
    if (!token) {
      setProfile(null);
      return null;
    }
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("No se pudo obtener el perfil.");
      const data = await res.json();
      setProfile(data);
      
      if (data?.email && data.email !== email) setEmail(data.email);
      return data;
    } catch (e) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  
  const login = async ({ email, password }) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Credenciales inválidas.");
      }
      const data = await res.json(); 
      setToken(data.token);
      setEmail(data.email);
      await fetchProfile(); 
      return { ok: true };
    } catch (e) {
      setToken("");
      setEmail("");
      setProfile(null);
      setError(e.message);
      return { ok: false, error: e.message };
    } finally {
      setLoading(false);
    }
  };

  
  const register = async ({ email, password }) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "No fue posible registrar.");
      }
      const data = await res.json(); 
      setToken(data.token);
      setEmail(data.email);
      await fetchProfile();
      return { ok: true };
    } catch (e) {
      setToken("");
      setEmail("");
      setProfile(null);
      setError(e.message);
      return { ok: false, error: e.message };
    } finally {
      setLoading(false);
    }
  };

  
  const logout = () => {
    setToken("");
    setEmail("");
    setProfile(null);
    setError("");
  };

  
  const value = useMemo(
    () => ({
      token,
      email,
      profile,
      loading,
      error,
      login,
      register,
      logout,
      fetchProfile,
      isAuth: Boolean(token),
    }),
    [token, email, profile, loading, error]
  );

  useEffect(() => {
    if (token) fetchProfile();
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser debe usarse dentro de <UserProvider>");
  return ctx;
};
