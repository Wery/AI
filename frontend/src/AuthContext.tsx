import React, { createContext, useContext, useState } from 'react';
import { msalInstance } from './msalInstance';
import { loginRequest } from './authConfig';

interface AuthContextProps {
  account: string | null;
  login: () => Promise<void>;
  logout: () => void;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextProps>(null!);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);

  const login = async () => {
    const result = await msalInstance.loginPopup(loginRequest).catch(() => undefined);
    if (result && result.account) {
      setAccount(result.account.username);
    }
  };

  const logout = () => {
    msalInstance.logoutPopup();
    setAccount(null);
  };

  const getToken = async () => {
    const active = msalInstance.getActiveAccount();
    if (!active) return null;
    const result = await msalInstance.acquireTokenSilent({ ...loginRequest, account: active }).catch(() => undefined);
    return result?.accessToken || null;
  };

  return (
    <AuthContext.Provider value={{ account, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
