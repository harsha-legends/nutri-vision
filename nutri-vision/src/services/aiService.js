import api from './api';

const aiService = {
  // Chat with AI nutrition assistant
  chat: async (message, conversationHistory = []) => {
    const response = await api.post('/ai/chat', { message, conversationHistory });
    return response.data;
  },

  // Analyze food image using Gemini Vision AI
  analyzeImage: async (imageBase64, hint = '') => {
    const response = await api.post('/image/analyze', { 
      image: imageBase64,
      hint: hint,
    });
    
    // The backend now returns data directly in the expected format
    if (response.data.success) {
      return response.data.data;
    }
    
    throw new Error(response.data.message || 'Failed to analyze image');
  },
};

export default aiService;
