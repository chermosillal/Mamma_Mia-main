import { useContext, useState } from "react";
import { UserContext } from "./UserContextDef";

export const UserProvider = ({ children }) => {
  // Recupera token y email de localStorage si existen
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");

  // Login: POST /api/auth/login
  const login = async (email, password) => {
    try {
  const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setToken(data.token);
        setEmail(data.email);
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        return { success: true };
      } else {
        return { success: false, error: data.error || "Login failed" };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Register: POST /api/auth/register
  const register = async (email, password) => {
    try {
  const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setToken(data.token);
        setEmail(data.email);
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        return { success: true };
      } else {
        return { success: false, error: data.error || "Register failed" };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Logout: elimina token y email
  const logout = () => {
    setToken("");
    setEmail("");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  // Get profile: GET /api/auth/me
  const getProfile = async () => {
    try {
  const res = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        return { success: true, profile: data };
      } else {
        return { success: false, error: data.error || "Profile fetch failed" };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return (
    <UserContext.Provider value={{ token, email, login, register, logout, getProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);