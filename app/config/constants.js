// Example constants file
export const API_URL = __DEV__ 
  ? 'http://localhost:5000'  // Development URL
  : 'https://pawpal-api.onrender.com'; // Production URL - You'll need to replace this with your actual production URL

export const SOME_OTHER_CONSTANT = 'someValue'; 

// Other constants
export const CHAT_ENDPOINTS = {
  GENERATE: '/api/chat/generate',
  HISTORY: '/api/chat/history',
};

// Export a default object to satisfy the router requirement
export default {
  API_URL,
  CHAT_ENDPOINTS,
}; 