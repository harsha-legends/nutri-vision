import api from './api';

const authService = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.success && response.data.token) {
      localStorage.setItem('nutriVisionToken', response.data.token);
      localStorage.setItem('nutriVisionUser', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Login user
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success && response.data.token) {
      localStorage.setItem('nutriVisionToken', response.data.token);
      localStorage.setItem('nutriVisionUser', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('nutriVisionToken');
    localStorage.removeItem('nutriVisionUser');
  },

  // Get current user
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Update profile
  updateProfile: async (profileData) => {
    const response = await api.put('/auth/profile', profileData);
    if (response.data.success && response.data.user) {
      localStorage.setItem('nutriVisionUser', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Update password
  updatePassword: async (currentPassword, newPassword) => {
    const response = await api.put('/auth/password', { currentPassword, newPassword });
    if (response.data.success && response.data.token) {
      localStorage.setItem('nutriVisionToken', response.data.token);
    }
    return response.data;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('nutriVisionToken');
  },

  // Get stored user
  getStoredUser: () => {
    const user = localStorage.getItem('nutriVisionUser');
    return user ? JSON.parse(user) : null;
  },

  // Get stored token
  getToken: () => {
    return localStorage.getItem('nutriVisionToken');
  },
};

export default authService;
