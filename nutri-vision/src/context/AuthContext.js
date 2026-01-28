import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user on mount if token exists
  const fetchUser = useCallback(async () => {
    try {
      if (authService.isAuthenticated()) {
        const storedUser = authService.getStoredUser();
        if (storedUser) {
          setUser(storedUser);
        }
        // Optionally verify with server
        try {
          const response = await authService.getMe();
          if (response.success && response.user) {
            setUser(response.user);
            localStorage.setItem('nutriVisionUser', JSON.stringify(response.user));
          }
        } catch {
          // Token might be expired, keep stored user or clear
        }
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      if (response.success && response.user) {
        setUser(response.user);
        return { success: true };
      }
      return { success: false, error: response.message || 'Login failed' };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      return { success: false, error: message };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await authService.register(userData);
      if (response.success && response.user) {
        setUser(response.user);
        return { success: true };
      }
      return { success: false, error: response.message || 'Registration failed' };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      return { success: false, error: message };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUser = async (updates) => {
    try {
      const response = await authService.updateProfile(updates);
      if (response.success && response.user) {
        setUser(response.user);
        return { success: true };
      }
      return { success: false, error: response.message || 'Update failed' };
    } catch (error) {
      const message = error.response?.data?.message || 'Update failed. Please try again.';
      // Still update locally for optimistic UI
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('nutriVisionUser', JSON.stringify(updatedUser));
      return { success: false, error: message };
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
