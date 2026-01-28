import api from './api';

export const transactionService = {
  getTransactions: async () => {
    const response = await api.get('/transactions');
    return response.data;
  },

  createTransaction: async (transaction) => {
    const response = await api.post('/transactions', transaction);
    return response.data;
  },

  updateTransaction: async (id, transaction) => {
    const response = await api.put(`/transactions/${id}`, transaction);
    return response.data;
  },

  deleteTransaction: async (id) => {
    await api.delete(`/transactions/${id}`);
  },

  getTransactionById: async (id) => {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  },
};