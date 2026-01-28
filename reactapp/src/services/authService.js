import api, { API_BASE_URL } from './api';

export const authService = {
  login: async (credentials) => {
    try {
      console.log('Attempting login to:', API_BASE_URL + '/auth/simple-login');
      const response = await api.post('/auth/simple-login', credentials);
      return response.data;
    } catch (error) {
      console.error('Login failed:', error.message);
      console.error('Error details:', error.response?.data);
      console.error('Status:', error.response?.status);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/simple-register', userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response?.data);
      throw error;
    }
  },

  logout: async () => {
    await api.post('/auth/signout');
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  refreshToken: async () => {
    const response = await api.post('/auth/refresh');
    return response.data;
  },
};