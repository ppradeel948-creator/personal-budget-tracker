import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../store/authSlice';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const user = await authService.getCurrentUser();
          dispatch(loginSuccess({ user, token }));
        } catch (error) {
          dispatch(logout());
        }
      }
    };
    initAuth();
  }, [dispatch]);

  const value = {
    user,
    token,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};