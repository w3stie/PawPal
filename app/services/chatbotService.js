import { API_URL, CHAT_ENDPOINTS } from '../config/constants';

const chatbotService = {
  sendMessage: async (message) => {
    try {
      const response = await fetch(`${API_URL}${CHAT_ENDPOINTS.GENERATE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error in chatbotService:', error);
      throw error;
    }
  },

  getChatHistory: async (userId) => {
    try {
      const response = await fetch(`${API_URL}${CHAT_ENDPOINTS.HISTORY}/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch chat history');
      return await response.json();
    } catch (error) {
      console.error('Error fetching chat history:', error);
      throw error;
    }
  }
};

// Add default export to satisfy the router requirement
export default chatbotService; 