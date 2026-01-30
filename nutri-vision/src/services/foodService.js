import api from './api';

const foodService = {
  // Get all foods with filters and pagination
  getFoods: async (params = {}) => {
    const response = await api.get('/foods', { params });
    return response.data;
  },

  // Get single food by ID
  getFood: async (id) => {
    const response = await api.get(`/foods/${id}`);
    return response.data;
  },

  // Get all food categories
  getCategories: async () => {
    const response = await api.get('/foods/categories');
    return response.data;
  },

  // Get popular foods
  getPopularFoods: async (limit = 10) => {
    const response = await api.get('/foods/popular', { params: { limit } });
    return response.data;
  },

  // Search foods by query
  searchFoods: async (query, limit = 20) => {
    const response = await api.get('/foods/search', { params: { q: query, limit } });
    return response.data;
  },

  // Get food by barcode
  getFoodByBarcode: async (barcode) => {
    const response = await api.get(`/foods/barcode/${barcode}`);
    return response.data;
  },

  // Get foods by category
  getFoodsByCategory: async (category, params = {}) => {
    const response = await api.get('/foods', { 
      params: { category, ...params } 
    });
    return response.data;
  },
};

export default foodService;
