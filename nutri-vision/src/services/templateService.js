import api from './api';

const templateService = {
  // Get all templates
  getTemplates: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.mealType) params.append('mealType', filters.mealType);
      if (filters.favorite) params.append('favorite', 'true');
      
      const queryString = params.toString();
      const url = `/templates${queryString ? `?${queryString}` : ''}`;
      
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching templates:', error);
      throw error;
    }
  },

  // Get single template
  getTemplate: async (id) => {
    try {
      const response = await api.get(`/templates/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching template:', error);
      throw error;
    }
  },

  // Create new template
  createTemplate: async (templateData) => {
    try {
      const response = await api.post('/templates', templateData);
      return response.data;
    } catch (error) {
      console.error('Error creating template:', error);
      throw error;
    }
  },

  // Update template
  updateTemplate: async (id, updates) => {
    try {
      const response = await api.put(`/templates/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating template:', error);
      throw error;
    }
  },

  // Delete template
  deleteTemplate: async (id) => {
    try {
      const response = await api.delete(`/templates/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting template:', error);
      throw error;
    }
  },

  // Duplicate template
  duplicateTemplate: async (id) => {
    try {
      const response = await api.post(`/templates/${id}/duplicate`);
      return response.data;
    } catch (error) {
      console.error('Error duplicating template:', error);
      throw error;
    }
  },

  // Use template (logs usage)
  useTemplate: async (id) => {
    try {
      const response = await api.post(`/templates/${id}/use`);
      return response.data;
    } catch (error) {
      console.error('Error using template:', error);
      throw error;
    }
  },

  // Toggle favorite
  toggleFavorite: async (id) => {
    try {
      const response = await api.patch(`/templates/${id}/favorite`);
      return response.data;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  },
};

export default templateService;
