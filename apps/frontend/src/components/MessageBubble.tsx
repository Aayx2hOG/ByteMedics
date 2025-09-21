"use client";

import { Message } from '@/types/chat';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { Volume2, VolumeX, User, Bot } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  onSpeak?: (text: string) => void;
  isSpeaking?: boolean;
}

export const MessageBubble = ({ message, onSpeak, isSpeaking }: MessageBubbleProps) => {
  const { colors } = useTheme();

  return (
    <div
      className={cn(
        "flex w-full mb-6 group",
        message.isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn(
        "flex items-start space-x-3 max-w-[85%] sm:max-w-[75%]",
        message.isUser ? "flex-row-reverse space-x-reverse" : "flex-row"
      )}>
        {/* Avatar */}
        <div 
          className={cn(
            "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg",
            "transition-transform duration-200 group-hover:scale-105"
          )}
          style={{ 
            background: message.isUser ? colors.gradients.secondary : colors.gradients.primary 
          }}
        >
          {message.isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </div>

        {/* Message Content */}
        <div
          className={cn(
            "px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm border transition-all duration-200",
            "group-hover:shadow-xl group-hover:scale-[1.02]",
            message.isUser
              ? "rounded-tr-md"
              : "rounded-tl-md"
          )}
          style={{
            backgroundColor: message.isUser 
              ? `${colors.primary[50]}95` 
              : `${colors.background.card}95`,
            borderColor: message.isUser 
              ? `${colors.primary[100]}80` 
              : `${colors.secondary[100]}80`,
            color: colors.text.primary
          }}
        >
          <p className="text-sm md:text-base leading-relaxed break-words">
            {message.text}
          </p>
          
          <div className="flex items-center justify-between mt-2 pt-2 border-t" 
               style={{ borderColor: `${colors.secondary[100]}40` }}>
            <span 
              className="text-xs font-medium"
              style={{ color: colors.text.muted }}
            >
              {message.timestamp.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
            
            {!message.isUser && onSpeak && (
              <button
                onClick={() => onSpeak(message.text)}
                disabled={isSpeaking}
                className={cn(
                  "ml-3 p-1.5 rounded-full transition-all duration-200",
                  "hover:scale-110 active:scale-95",
                  "focus:outline-none focus:ring-2 focus:ring-offset-1",
                  isSpeaking ? "animate-pulse" : "hover:shadow-md"
                )}
                style={{
                  backgroundColor: `${colors.accent[50]}80`,
                  color: colors.accent[600]
                }}
                title={isSpeaking ? "Speaking..." : "Click to hear this message"}
              >
                {isSpeaking ? (
                  <Volume2 className="w-3.5 h-3.5" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};