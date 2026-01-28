import api from './api';

const mealService = {
  // Log a new meal
  logMeal: async (mealData) => {
    const response = await api.post('/meals', mealData);
    return response.data;
  },

  // Get meals with filters
  getMeals: async (params = {}) => {
    const response = await api.get('/meals', { params });
    return response.data;
  },

  // Get meals for a specific date
  getMealsByDate: async (date) => {
    const response = await api.get('/meals', { params: { date } });
    return response.data;
  },

  // Get meals for date range
  getMealsByDateRange: async (startDate, endDate) => {
    const response = await api.get('/meals', { params: { startDate, endDate } });
    return response.data;
  },

  // Get today's summary
  getTodaySummary: async () => {
    const response = await api.get('/meals/today/summary');
    return response.data;
  },

  // Get single meal
  getMeal: async (id) => {
    const response = await api.get(`/meals/${id}`);
    return response.data;
  },

  // Update a meal
  updateMeal: async (id, mealData) => {
    const response = await api.put(`/meals/${id}`, mealData);
    return response.data;
  },

  // Delete a meal
  deleteMeal: async (id) => {
    const response = await api.delete(`/meals/${id}`);
    return response.data;
  },

  // Get today's date formatted
  getTodayDate: () => {
    return new Date().toISOString().split('T')[0];
  },
};

export default mealService;
