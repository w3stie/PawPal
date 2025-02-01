const { GoogleGenerativeAI } = require('@google/generative-ai');

class ChatbotService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  async generateResponse(message) {
    try {
      const chat = this.model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 100,
        },
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Chatbot service error:', error);
      throw new Error('Failed to generate response');
    }
  }
}

module.exports = new ChatbotService();