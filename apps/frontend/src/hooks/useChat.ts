"use client";

import { useState, useEffect } from 'react';
import { socketService } from '@/lib/socket';
import { Message } from '@/types/chat';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = socketService.connect();

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
    
    socket.on('chat_response', (data: { message: string }) => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: data.message,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, newMessage]);
    });

    return () => {
      socketService.disconnect();
    };
  }, []);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    // Send to server
    socketService.emit('chat_message', { message: text.trim() });
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    isConnected,
    sendMessage,
    clearMessages,
  };
};