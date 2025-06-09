'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = Cookies.get('token');
    if (t) setToken(t);
  }, []);

  const login = (token) => {
    Cookies.set('token', token, { expires: 1 }); // ست در js-cookie
    setToken(token);
  };

  const logout = async () => {
    Cookies.remove('token'); // پاک کردن کوکی سمت کلاینت
    await fetch('/api/auth/logout', { method: 'POST' }); // پاک کردن کوکی سمت سرور (httpOnly)
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}