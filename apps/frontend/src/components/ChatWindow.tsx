"use client";

import { useEffect, useRef } from 'react';
import { Message } from '@/types/chat';
import { MessageBubble } from './MessageBubble';
import { cn } from '@/lib/utils';

interface ChatWindowProps {
  messages: Message[];
  onSpeak?: (text: string) => void;
  isSpeaking?: boolean;
  isConnected: boolean;
}

export const ChatWindow = ({ 
  messages, 
  onSpeak, 
  isSpeaking, 
  isConnected 
}: ChatWindowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      ref={scrollRef}
      className={cn(
        "flex-1 overflow-y-auto p-4 space-y-4",
        "scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
      )}
    >
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-center">
          <div className="space-y-2">
            <div className="text-4xl">💬</div>
            <h3 className="text-lg font-medium text-muted-foreground">
              Welcome to ByteMedics Chat
            </h3>
            <p className="text-sm text-muted-foreground">
              {isConnected 
                ? "Start a conversation by typing a message or using voice input"
                : "Connecting to chat server..."
              }
            </p>
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
          <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm">
            Connection lost. Trying to reconnect...
          </div>
        </div>
      )}
    </div>
  );
};