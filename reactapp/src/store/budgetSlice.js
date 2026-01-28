import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  budgets: [],
  loading: false,
  error: null,
};

const budgetSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setBudgets: (state, action) => {
      state.budgets = action.payload;
      state.loading = false;
    },
    addBudget: (state, action) => {
      state.budgets.push(action.payload);
    },
    updateBudget: (state, action) => {
      const index = state.budgets.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.budgets[index] = action.payload;
      }
    },
    deleteBudget: (state, action) => {
      state.budgets = state.budgets.filter(b => b.id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { 
  setLoading, 
  setBudgets, 
  addBudget, 
  updateBudget, 
  deleteBudget, 
  setError 
} = budgetSlice.actions;

export default budgetSlice.reducer;