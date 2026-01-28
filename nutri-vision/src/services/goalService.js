import api from './api';

const goalService = {
  // Create a new goal
  createGoal: async (goalData) => {
    const response = await api.post('/goals', goalData);
    return response.data;
  },

  // Get all user goals
  getGoals: async () => {
    const response = await api.get('/goals');
    return response.data;
  },

  // Get active goal
  getActiveGoal: async () => {
    const response = await api.get('/goals/active');
    return response.data;
  },

  // Update a goal
  updateGoal: async (id, goalData) => {
    const response = await api.put(`/goals/${id}`, goalData);
    return response.data;
  },

  // Delete a goal
  deleteGoal: async (id) => {
    const response = await api.delete(`/goals/${id}`);
    return response.data;
  },

  // Log progress for a goal
  logProgress: async (id, progressData) => {
    const response = await api.post(`/goals/${id}/progress`, progressData);
    return response.data;
  },
};

export default goalService;
