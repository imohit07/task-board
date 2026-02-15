import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  validateCredentials,
  getStoredAuth,
  setStoredAuth,
  clearStoredAuth,
  getRememberedEmail,
  getRememberMe,
} from '../lib/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const stored = getStoredAuth();
    if (stored?.email) setUser({ email: stored.email });
    setInitialized(true);
  }, []);

  const login = useCallback((email, password, remember) => {
    if (!validateCredentials(email, password)) return false;
    setStoredAuth(remember, email);
    setUser({ email: (email || '').trim().toLowerCase() });
    return true;
  }, []);

  const logout = useCallback(() => {
    clearStoredAuth();
    setUser(null);
  }, []);

  const rememberedEmail = getRememberedEmail();
  const rememberMeDefault = getRememberMe();

  const value = {
    user,
    initialized,
    login,
    logout,
    rememberedEmail,
    rememberMeDefault,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
