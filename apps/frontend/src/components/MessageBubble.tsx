"use client";

import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
  onSpeak?: (text: string) => void;
  isSpeaking?: boolean;
}

export const MessageBubble = ({ message, onSpeak, isSpeaking }: MessageBubbleProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4",
        message.isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] sm:max-w-[80%] px-3 py-2 md:px-4 md:py-2 rounded-lg shadow-sm",
          message.isUser
            ? "bg-primary text-primary-foreground ml-2 sm:ml-4"
            : "bg-secondary text-secondary-foreground mr-2 sm:mr-4"
        )}
      >
        <p className="text-sm md:text-base break-words">{message.text}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs opacity-70">
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          {!message.isUser && onSpeak && (
            <button
              onClick={() => onSpeak(message.text)}
              disabled={isSpeaking}
              className="ml-2 text-sm md:text-xs opacity-70 hover:opacity-100 transition-opacity touch-manipulation"
            >
              {isSpeaking ? "🔊" : "🔈"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};