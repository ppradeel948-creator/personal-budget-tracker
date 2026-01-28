import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload;
      state.loading = false;
    },
    addTransaction: (state, action) => {
      state.transactions.unshift(action.payload);
    },
    updateTransaction: (state, action) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { 
  setLoading, 
  setTransactions, 
  addTransaction, 
  updateTransaction, 
  deleteTransaction, 
  setError 
} = transactionSlice.actions;

export default transactionSlice.reducer;