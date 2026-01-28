import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import authSlice from '../store/authSlice';
import transactionSlice from '../store/transactionSlice';
import budgetSlice from '../store/budgetSlice';

// Mock store for testing
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authSlice,
      transactions: transactionSlice,
      budgets: budgetSlice,
    },
    preloadedState: initialState,
  });
};

// Mock AuthContext
jest.mock('../context/AuthContext', () => ({
  AuthProvider: ({ children }) => children,
  useAuth: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }),
}));

describe('App Component', () => {
  test('renders without crashing', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Budget Tracker')).toBeInTheDocument();
  });

  test('shows login and register links when not authenticated', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });
});

describe('Redux Store', () => {
  test('auth slice initial state', () => {
    const store = createMockStore();
    const state = store.getState();
    
    expect(state.auth.user).toBeNull();
    expect(state.auth.isAuthenticated).toBe(false);
    expect(state.auth.loading).toBe(false);
  });

  test('transactions slice initial state', () => {
    const store = createMockStore();
    const state = store.getState();
    
    expect(state.transactions.transactions).toEqual([]);
    expect(state.transactions.loading).toBe(false);
  });

  test('budgets slice initial state', () => {
    const store = createMockStore();
    const state = store.getState();
    
    expect(state.budgets.budgets).toEqual([]);
    expect(state.budgets.loading).toBe(false);
  });
});