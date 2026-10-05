import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { rahulDemoProfile } from '../demo/rahulDemoData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!authService.getCurrentUser());
  const [loading, setLoading] = useState(false);

  const login = async (identifier, password) => {
    setLoading(true);
    try {
      const result = await authService.login(identifier, password);
      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  // Helper to pre-populate or login automatically as demo user if needed
  const loginAsDemo = async () => {
    return await login('Rahul', 'Rahul 123');
  };

  return (
    <AuthContext.Provider
      value={{
        user: user || rahulDemoProfile,
        isAuthenticated,
        loading,
        login,
        logout,
        loginAsDemo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
