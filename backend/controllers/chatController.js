const chatbotService = require('../services/chatbotService');
const { successResponse, errorResponse } = require('../utils/apiResponse');

exports.generateResponse = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return errorResponse(res, 'Message is required', 400);
    }

    const response = await chatbotService.generateResponse(message);
    return successResponse(res, { response });
  } catch (error) {
    console.error('Chat controller error:', error);
    return errorResponse(res, 'Failed to generate response', 500);
  }
};