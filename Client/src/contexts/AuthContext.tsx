import React, { createContext, useContext, useState, useEffect } from 'react';
import authService, { User, LoginData, RegisterData } from '../services/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (name: string, email: string, password: string, walletAddress?: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const response = await authService.getProfile();
      setUser(response.data.user);
    } catch (err) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(data);
      localStorage.setItem('token', response.data.token);
      await loadUser();
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred during login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, walletAddress?: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.register({ name, email, password, walletAddress });
      localStorage.setItem('token', response.data.token);
      await loadUser();
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred during registration');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoading: loading,
        error,
        login,
        register,
        logout,
        clearError,
        refreshProfile: loadUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};