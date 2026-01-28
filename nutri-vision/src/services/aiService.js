import api from './api';

const aiService = {
  // Chat with AI nutrition assistant
  chat: async (message, conversationHistory = []) => {
    const response = await api.post('/ai/chat', { message, conversationHistory });
    return response.data;
  },

  // Analyze food image (mock)
  analyzeImage: async (imageBase64, imageName = '') => {
    const response = await api.post('/image/analyze', { 
      image: imageBase64, 
      imageName 
    });
    return response.data;
  },
};

export default aiService;
