import { ChatMessage } from '../types';

const responses = {
  greetings: [
    "Hello! How can I help you today?",
    "Hi there! I'm your health assistant.",
    "Welcome! What health concerns can I address for you?"
  ],
  symptoms: [
    "Could you describe your symptoms in more detail?",
    "When did these symptoms first appear?",
    "Are you experiencing any other symptoms?"
  ],
  general: [
    "Please consult a healthcare professional for personalized medical advice.",
    "Remember to maintain a healthy lifestyle with regular exercise and balanced diet.",
    "Stay hydrated and get adequate rest for better health."
  ]
};

function getResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
  }
  
  if (lowerMessage.includes('symptom')) {
    return responses.symptoms[Math.floor(Math.random() * responses.symptoms.length)];
  }
  
  return responses.general[Math.floor(Math.random() * responses.general.length)];
}

export function sendMessage(text: string): ChatMessage {
  const botResponse = getResponse(text);
  
  return {
    id: crypto.randomUUID(),
    text: botResponse,
    sender: 'bot',
    timestamp: new Date().toISOString()
  };
}