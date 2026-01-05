import React, { createContext, useContext, useEffect, useState } from 'react';
import { setAuthGetter } from '../api/client';
import BackendService from '../api/services';

type User = { id: string; name: string } | null;

interface AuthContextType {
  user: User;
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
  login: (token: string, role?: string, user?: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    try { return localStorage.getItem('auth.token'); } catch { return null; }
  });
  const [role, setRole] = useState<string | null>(() => {
    try { return localStorage.getItem('auth.role'); } catch { return null; }
  });
  const [user, setUser] = useState<User>(() => {
    try { const raw = localStorage.getItem('auth.user'); return raw ? JSON.parse(raw) : null; } catch { return null; }
  });

  useEffect(() => {
    try {
      if (token) localStorage.setItem('auth.token', token); else localStorage.removeItem('auth.token');
    } catch {}
    // Inform api client how to obtain the current token from React state
    try { setAuthGetter(() => token); } catch (e) {}
  }, [token]);

  useEffect(() => {
    try {
      if (role) localStorage.setItem('auth.role', role); else localStorage.removeItem('auth.role');
    } catch {}
  }, [role]);

  // On mount, if we have a token, validate it silently with backend ping
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (token) {
          await BackendService.ping();
        }
      } catch (err) {
        if (!mounted) return;
        // token invalid or backend unreachable; clear auth to force re-auth
        setToken(null);
        setRole(null);
        setUser(null);
      }
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    try {
      if (user) localStorage.setItem('auth.user', JSON.stringify(user)); else localStorage.removeItem('auth.user');
    } catch {}
  }, [user]);

  function login(t: string, r: string = 'OPERATOR', u: User = null) {
    setToken(t);
    setRole(r);
    setUser(u);
  }

  function logout() {
    setToken(null);
    setRole(null);
    setUser(null);
    try {
      localStorage.removeItem('auth.token');
      localStorage.removeItem('auth.role');
      localStorage.removeItem('auth.user');
    } catch {}
    if (typeof window !== 'undefined') window.location.href = '/login';
  }

  const value: AuthContextType = {
    user,
    token,
    role,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
