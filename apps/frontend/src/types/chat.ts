export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isConnected: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  language: string;
  isDarkMode: boolean;
}

export interface VoiceSettings {
  rate: number;
  pitch: number;
  volume: number;
  voice: SpeechSynthesisVoice | null;
}