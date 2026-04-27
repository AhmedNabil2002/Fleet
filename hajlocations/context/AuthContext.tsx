import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/api/axiosInstance';
import { registerDeviceToken, unregisterDeviceToken } from '@/services/notificationService';

interface User {
  id: string;
  username: string;
  role: string;
  isActive: boolean;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('auth_token').then(async (savedToken) => {
      if (savedToken) {
        setToken(savedToken);
        await fetchCurrentUser();
      }
      setIsLoading(false);
    });
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const { data } = await api.get('/auth/me');
      setUser(data.data);
    } catch {
      // token may be expired — clear it
      await AsyncStorage.removeItem('auth_token');
      setToken(null);
    }
  };

  const login = async (username: string, password: string) => {
    const { data } = await api.post('/auth/login', { username, password });
    const accessToken = data.data.access_token;
    await AsyncStorage.setItem('auth_token', accessToken);
    setToken(accessToken);
    await fetchCurrentUser();
    registerDeviceToken();
  };

  const logout = async () => {
    unregisterDeviceToken();
    await AsyncStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
