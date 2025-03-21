export interface Symptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
}

export interface Diagnosis {
  id: string;
  timestamp: string;
  symptoms: Symptom[];
  prediction: {
    condition: string;
    confidence: number;
    recommendations: string[];
  };
}

export interface SymptomOption {
  value: string;
  label: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  preferences: {
    darkMode: boolean;
    notifications: boolean;
    language: string;
  };
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}