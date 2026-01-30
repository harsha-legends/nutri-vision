import api from './api';

const scanHistoryService = {
  // Save a new scan to history
  saveScan: async ({ image, analysis, hint = '' }) => {
    // Create a smaller thumbnail (compress the image)
    const thumbnail = image; // For now, use same image. Could add compression later.
    
    const response = await api.post('/scan-history', {
      image,
      thumbnail,
      analysis,
      hint,
    });
    return response.data;
  },

  // Get scan history with pagination
  getHistory: async (page = 1, limit = 20, startDate = null, endDate = null) => {
    const params = { page, limit };
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    
    const response = await api.get('/scan-history', { params });
    return response.data;
  },

  // Get a single scan by ID (includes full image)
  getScanById: async (id) => {
    const response = await api.get(`/scan-history/${id}`);
    return response.data;
  },

  // Delete a scan
  deleteScan: async (id) => {
    const response = await api.delete(`/scan-history/${id}`);
    return response.data;
  },

  // Update scan (e.g., mark as added to meal)
  updateScan: async (id, updates) => {
    const response = await api.patch(`/scan-history/${id}`, updates);
    return response.data;
  },

  // Get scan statistics
  getStats: async () => {
    const response = await api.get('/scan-history/stats');
    return response.data;
  },
};

export default scanHistoryService;
