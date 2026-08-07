import { useEffect, useState } from "react";

import {
  TOKEN_KEY,
  USER_KEY,
  type AuthContextType,
  type User,
} from "@/context/auth-constants";
import { AuthContext } from "@/context/auth-context";
import { default as cookie } from "../lib/token";

export const AuthProvider: React.FC<{
  children: React.ReactNode;
  persist?: boolean;
}> = ({ children, persist = true }) => {
  const [token, setTokenState] = useState<string | null>(() => {
    return cookie.get(TOKEN_KEY) || null;
  });

  const [user, setUserState] = useState<User | null>(() => {
    if (!persist) return null;

    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });

  const setToken = (newToken: string | null, expiry?: Date) => {
    if (newToken && expiry) {
      cookie.set(TOKEN_KEY, newToken, expiry);
      setTokenState(newToken);
    } else {
      cookie.remove(TOKEN_KEY);
      setTokenState(null);
    }
  };

  useEffect(() => {
    if (!persist) return;

    try {
      if (user === null) {
        localStorage.removeItem(USER_KEY);
      } else {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      }
    } catch {
      // ignore
    }
  }, [user, persist]);

  const setUser = (u: User | null) => {
    setUserState(u);
  };

  const logout = () => {
    cookie.remove(TOKEN_KEY);

    if (persist) {
      try {
        localStorage.removeItem(USER_KEY);
      } catch {
        // ignore
      }
    }

    setTokenState(null);
    setUserState(null);

    window.location.href = "/";
  };

  const isAuthenticated = !!token;

  const value: AuthContextType = {
    user,
    setUser,
    logout,
    token,
    setToken,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
