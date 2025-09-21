"use client";

import { useEffect, useRef } from 'react';
import { Message } from '@/types/chat';
import { MessageBubble } from './MessageBubble';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { MessageCircle, Sparkles, Activity } from 'lucide-react';

interface ChatWindowProps {
  messages: Message[];
  onSpeak?: (text: string) => void;
  isSpeaking?: boolean;
  isConnected: boolean;
  onSendMessage?: (message: string) => void;
}

export const ChatWindow = ({ 
  messages, 
  onSpeak, 
  isSpeaking, 
  isConnected,
  onSendMessage
}: ChatWindowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { colors } = useTheme();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      ref={scrollRef}
      className={cn(
        "flex-1 overflow-y-auto p-6 space-y-6 rounded-lg border transition-all duration-300",
        "scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
      )}
      style={{ 
        backgroundColor: colors.background.card,
        borderColor: colors.secondary[100]
      }}
    >
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-center">
          <div className="space-y-6 max-w-md">
            {/* Animated Icon */}
            <div className="relative mx-auto w-20 h-20">
              <div 
                className="absolute inset-0 rounded-full animate-ping opacity-20"
                style={{ backgroundColor: colors.primary[500] }}
              ></div>
              <div 
                className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
                style={{ background: colors.gradients.primary }}
              >
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <Sparkles 
                className="absolute -top-2 -right-2 w-6 h-6 animate-bounce"
                style={{ color: colors.accent[500] }}
              />
            </div>

            {/* Welcome Message */}
            <div className="space-y-3">
              <h3 
                className="text-2xl font-bold"
                style={{ color: colors.text.primary }}
              >
                Welcome to Your Health Assistant
              </h3>
              <p 
                className="text-lg leading-relaxed"
                style={{ color: colors.text.secondary }}
              >
                {isConnected 
                  ? "I'm here to help with your health questions. Start by typing a message or use voice input to begin our conversation."
                  : "Connecting to your health assistant..."
                }
              </p>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center justify-center space-x-2">
              <div 
                className={`w-3 h-3 rounded-full ${isConnected ? 'animate-pulse' : 'animate-spin'}`}
                style={{ backgroundColor: isConnected ? colors.primary[500] : colors.accent[500] }}
              ></div>
              <span 
                className="text-sm font-medium"
                style={{ color: colors.text.muted }}
              >
                {isConnected ? 'Ready to assist' : 'Establishing connection...'}
              </span>
            </div>

            {/* Quick suggestions */}
            {isConnected && (
              <div className="space-y-3">
                <p 
                  className="text-sm font-medium"
                  style={{ color: colors.text.muted }}
                >
                  Try asking me about:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: '💊', text: 'Medication info', query: 'Can you tell me about common pain medications?' },
                    { icon: '🤒', text: 'Symptom checker', query: 'I have a headache and feel tired. What could this be?' },
                    { icon: '🏥', text: 'Health tips', query: 'What are some daily health tips for better wellness?' },
                    { icon: '🩺', text: 'General wellness', query: 'How can I improve my overall health and fitness?' }
                  ].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => onSendMessage?.(suggestion.query)}
                      className="px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200 hover:scale-105 hover:shadow-md text-left"
                      style={{
                        backgroundColor: colors.secondary[50],
                        color: colors.text.secondary,
                        borderColor: colors.secondary[100]
                      }}
                    >
                      <span className="block">{suggestion.icon} {suggestion.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            onSpeak={onSpeak}
            isSpeaking={isSpeaking}
          />
        ))
      )}
      
      {!isConnected && messages.length > 0 && (
        <div className="flex justify-center">
          <div 
            className="px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 border"
            style={{
              backgroundColor: `${colors.accent[50]}`,
              color: colors.text.secondary,
              borderColor: colors.accent[100]
            }}
          >
            <Activity className="w-4 h-4 animate-pulse" />
            <span>Connection lost. Trying to reconnect...</span>
          </div>
        </div>
      )}
    </div>
  );
};