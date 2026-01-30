import api from './api';

const waterService = {
  // Log or update water intake for a day
  logWater: async (date, glasses) => {
    const response = await api.post('/water', { date, glasses });
    return response.data;
  },

  // Get water intake for a specific date
  getWaterByDate: async (date) => {
    const response = await api.get('/water', { params: { date } });
    return response.data;
  },

  // Get water intake for date range
  getWaterByDateRange: async (startDate, endDate) => {
    const response = await api.get('/water', { params: { startDate, endDate } });
    return response.data;
  },

  // Get today's water intake
  getTodayWater: async () => {
    const today = new Date().toISOString().split('T')[0];
    const response = await api.get('/water', { params: { date: today } });
    return response.data;
  },

  // Increment water glasses for today
  addGlass: async () => {
    const today = new Date().toISOString().split('T')[0];
    // First get current value
    const current = await waterService.getTodayWater();
    const currentGlasses = current.data?.[0]?.glasses || 0;
    // Then update with incremented value
    return waterService.logWater(today, currentGlasses + 1);
  },

  // Decrement water glasses for today
  removeGlass: async () => {
    const today = new Date().toISOString().split('T')[0];
    const current = await waterService.getTodayWater();
    const currentGlasses = current.data?.[0]?.glasses || 0;
    if (currentGlasses > 0) {
      return waterService.logWater(today, currentGlasses - 1);
    }
    return current;
  },
};

export default waterService;
