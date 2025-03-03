import React, { createContext, useState, useEffect, useContext } from 'react';
import { User } from '../types/User';
import axios from 'axios';

interface AuthContextType {
  authUser: User | null;
  accessToken: string;
  login: (token: string) => void;
  logout: () => void;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({
  authUser: null,
  accessToken: '',
  login: () => {},
  logout: () => {},
  isLogin: false,
  setIsLogin: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');

    if (storedToken) {
      setAccessToken(storedToken);
      fetchUser(storedToken);
      setIsLogin(true);
    }
  }, []);

  const fetchUser = async (token: string) => {
    await axios
      .get('http://localhost:5000/api/v1/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAuthUser(response.data);
      })
      .catch((error) => {
        console.log(error);

        logout();
      });
  };

  const login = (token: string) => {
    localStorage.setItem('accessToken', token);

    setAccessToken(token);
    fetchUser(token);
    setIsLogin(true);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAccessToken('');
    setAuthUser(null);
    setIsLogin(false);
  };

  const value = {
    authUser,
    accessToken,
    login,
    logout,
    isLogin,
    setIsLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
