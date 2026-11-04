export type Role = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

export type GeminiModel = 'gemini-3.8-flash' | 'gemini-2.5-flash' | 'gemini-1.5-flash' | 'gemini-2.0-flash';

export interface GeminiConfig {
  apiKey: string;
  model: GeminiModel;
  temperature: number;
  maxOutputTokens: number;
}

export interface ApiKeyStatus {
  isValid: boolean | null; // null = not checked, true = valid, false = invalid
  isChecking: boolean;
  message?: string;
}
