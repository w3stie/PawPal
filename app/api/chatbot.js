const API_URL = __DEV__ 
  ? 'http://localhost:5000'
  : 'https://your-production-url.com';

export async function getChatbotResponse(message) {
  try {
    const response = await fetch(`${API_URL}/api/chat/generate`, {
      // ... rest of the code
    });
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

function Chatbot() {
    // Your chatbot logic here
}

export default Chatbot;