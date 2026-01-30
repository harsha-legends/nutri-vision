import api from './api';

const analyticsService = {
  // Get weekly analytics
  getWeeklyAnalytics: async () => {
    const response = await api.get('/analytics/weekly');
    return response.data;
  },

  // Get monthly analytics
  getMonthlyAnalytics: async (month, year) => {
    const params = {};
    if (month) params.month = month;
    if (year) params.year = year;
    const response = await api.get('/analytics/monthly', { params });
    return response.data;
  },

  // Get goal progress analytics
  getGoalAnalytics: async () => {
    const response = await api.get('/analytics/goals');
    return response.data;
  },

  // Get macro breakdown
  getMacroBreakdown: async (days = 7) => {
    const response = await api.get('/analytics/macros', { params: { days } });
    return response.data;
  },
};

export default analyticsService;
