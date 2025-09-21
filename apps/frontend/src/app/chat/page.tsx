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
import { useTheme } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { UserProfile } from '@/components/UserProfile';
import { Toaster } from 'sonner';
import { toast } from 'sonner';
import { MessageCircle, Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function ChatPage() {
  const { user, isLoaded } = useUser();
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
  const [language, setLanguage] = useState('en-US');
  const [isMounted, setIsMounted] = useState(false);
  const { colors } = useTheme();

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (isLoaded && !user) {
      redirect('/sign-in');
    }
  }, [isLoaded, user]);

  const { messages, isConnected, sendMessage, clearMessages } = useChat();
  const { speak, stop, isSpeaking, voices } = useSpeechSynthesis();

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  // Loading state for authentication and mounting
  if (!isMounted || !isLoaded) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ background: colors.gradients.background }}
      >
        <div className="text-center">
          <div 
            className="w-16 h-16 rounded-full mx-auto mb-4 animate-spin border-4 border-t-transparent"
            style={{ borderColor: `${colors.primary[500]}40`, borderTopColor: 'transparent' }}
          ></div>
          <p style={{ color: colors.text.muted }}>
            {!isLoaded ? 'Authenticating...' : 'Loading your health assistant...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div 
        className="min-h-screen flex flex-col relative overflow-hidden"
        style={{ background: colors.gradients.background }}
      >
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10 blur-3xl animate-pulse"
            style={{ background: colors.gradients.primary }}
          ></div>
          <div 
            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10 blur-3xl animate-pulse delay-1000"
            style={{ background: colors.gradients.accent }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5 blur-3xl animate-pulse delay-500"
            style={{ background: colors.gradients.secondary }}
          ></div>
        </div>

        {/* Header */}
        <header 
          className="relative border-b backdrop-blur-xl shadow-lg z-10"
          style={{ 
            backgroundColor: colors.background.card,
            borderColor: `${colors.secondary[100]}80`
          }}
        >
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="hover:scale-105 transition-transform duration-200"
                  style={{ color: colors.text.muted }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                    style={{ background: colors.gradients.primary }}
                  >
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div 
                    className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${isConnected ? 'animate-ping' : ''}`}
                    style={{ backgroundColor: isConnected ? colors.primary[500] : colors.secondary[500] }}
                  ></div>
                  <div 
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full"
                    style={{ backgroundColor: isConnected ? colors.primary[500] : colors.secondary[500] }}
                  ></div>
                </div>
                <div>
                  <h1 
                    className="text-xl font-bold flex items-center"
                    style={{ color: colors.text.primary }}
                  >
                    ByteMedics
                    <Sparkles className="w-4 h-4 ml-2 animate-pulse" style={{ color: colors.primary[500] }} />
                  </h1>
                  <p 
                    className="text-xs"
                    style={{ color: colors.text.muted }}
                  >
                    {isConnected ? 'Connected • Ready to help' : 'Connecting...'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <UserProfile />
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Main Chat Container */}
        <div className="flex-1 container mx-auto px-4 py-6 flex flex-col relative z-10">
          <Card 
            className="flex-1 flex flex-col backdrop-blur-xl border shadow-2xl rounded-3xl overflow-hidden"
            style={{ 
              backgroundColor: `${colors.background.card}95`,
              borderColor: `${colors.secondary[100]}60`
            }}
          >
            <ChatHeader
              isConnected={isConnected}
              isSpeechEnabled={isSpeechEnabled}
              language={language}
              onClearChat={handleClearChat}
              onOpenSettings={handleSettings}
              onToggleSpeech={handleSpeechToggle}
              onLanguageChange={handleLanguageChange}
            />
            
            <ChatWindow
              messages={messages}
              onSpeak={isSpeechEnabled ? speak : undefined}
              isSpeaking={isSpeaking}
              isConnected={isConnected}
              onSendMessage={handleSendMessage}
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
        </div>
        
        <Toaster 
          position="top-center" 
          richColors 
          toastOptions={{
            style: {
              background: colors.background.card,
              border: `1px solid ${colors.secondary[100]}`,
              color: colors.text.primary,
            },
          }}
        />
      </div>
    </TooltipProvider>
  );
}