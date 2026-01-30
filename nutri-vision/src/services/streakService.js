import api from './api';

const streakService = {
  // Get user's meal tracking streak
  getStreak: async () => {
    const response = await api.get('/streak');
    return response.data;
  },
};

export default streakService;
