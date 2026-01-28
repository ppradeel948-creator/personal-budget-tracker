import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import transactionSlice from './transactionSlice';
import budgetSlice from './budgetSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    transactions: transactionSlice,
    budgets: budgetSlice,
  },
});

export default store;