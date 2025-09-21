"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ChatHeader } from '@/components/ChatHeader';
import { ChatWindow } from '@/components/ChatWindow';
import { ChatInput } from '@/components/ChatInput';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useChat } from '@/hooks/useChat';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { Toaster } from 'sonner';
import { toast } from 'sonner';

export default function ChatPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
  const [language, setLanguage] = useState('en-US');

  const { messages, isConnected, sendMessage, clearMessages } = useChat();
  const { speak, stop, isSpeaking, voices } = useSpeechSynthesis();

  const handleVoiceResult = (transcript: string) => {
    if (transcript.trim()) {
      sendMessage(transcript);
      toast.success('Voice message sent!');
    }
  };

  const {
    isListening,
    isSupported: isVoiceSupported,
    startListening,
    stopListening,
  } = useSpeechRecognition(language, handleVoiceResult);

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Auto-speak bot responses
  useEffect(() => {
    if (isSpeechEnabled && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.isUser && lastMessage.text) {
        speak(lastMessage.text);
      }
    }
  }, [messages, isSpeechEnabled, speak]);

  const handleClearChat = () => {
    clearMessages();
    stop();
    toast.success('Chat cleared');
  };

  const handleSettings = () => {
    toast.info('Settings panel coming soon!');
  };

  const handleSendMessage = (message: string) => {
    sendMessage(message);
  };

  const handleSpeechToggle = () => {
    setIsSpeechEnabled(!isSpeechEnabled);
    if (isSpeaking) stop();
    toast.success(`Text-to-speech ${!isSpeechEnabled ? 'enabled' : 'disabled'}`);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    toast.success(`Switched to ${!isDarkMode ? 'dark' : 'light'} mode`);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    toast.success(`Language changed to ${newLanguage}`);
  };

  // Show voice input warning only once and less intrusively
  useEffect(() => {
    if (!isVoiceSupported) {
      console.log('Voice input not supported in this browser - microphone button will be disabled');
    }
  }, [isVoiceSupported]);

  return (
    <TooltipProvider>
      <div className={`h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
        <Card className="flex-1 flex flex-col h-full border-0 rounded-none shadow-none">
          <ChatHeader
            isConnected={isConnected}
            isDarkMode={isDarkMode}
            isSpeechEnabled={isSpeechEnabled}
            language={language}
            onClearChat={handleClearChat}
            onOpenSettings={handleSettings}
            onToggleSpeech={handleSpeechToggle}
            onToggleDarkMode={handleThemeToggle}
            onLanguageChange={handleLanguageChange}
          />
          
          <ChatWindow
            messages={messages}
            onSpeak={isSpeechEnabled ? speak : undefined}
            isSpeaking={isSpeaking}
            isConnected={isConnected}
          />
          
          <ChatInput
            onSendMessage={handleSendMessage}
            onStartListening={startListening}
            onStopListening={stopListening}
            isListening={isListening}
            isConnected={isConnected}
            disabled={!isConnected}
          />
        </Card>
        
        <Toaster position="top-center" richColors />
      </div>
    </TooltipProvider>
  );
}