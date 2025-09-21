"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Mic, MicOff, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onStartListening: () => void;
  onStopListening: () => void;
  isListening: boolean;
  isConnected: boolean;
  disabled?: boolean;
}

export const ChatInput = ({
  onSendMessage,
  onStartListening,
  onStopListening,
  isListening,
  isConnected,
  disabled = false,
}: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isListening && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isListening]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && isConnected && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      onStopListening();
    } else {
      onStartListening();
    }
  };

  const handleVoiceResult = (transcript: string) => {
    setMessage(transcript);
    if (transcript.trim()) {
      onSendMessage(transcript);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 p-3 md:p-4 border-t bg-background">
      <div className="flex-1 relative">
        <Input
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            isListening 
              ? "Listening..." 
              : isConnected 
                ? "Type your message..." 
                : "Connecting..."
          }
          disabled={disabled || !isConnected || isListening}
          className={cn(
            "text-base md:text-sm", // Larger text on mobile
            isListening && "border-red-500 bg-red-50 dark:bg-red-950"
          )}
        />
      </div>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant={isListening ? "destructive" : "outline"}
            size="icon"
            onClick={handleMicClick}
            disabled={disabled || !isConnected}
            className={cn(
              "h-10 w-10 md:h-9 md:w-9", // Larger on mobile
              isListening && "animate-pulse"
            )}
          >
            {isListening ? <MicOff className="h-5 w-5 md:h-4 md:w-4" /> : <Mic className="h-5 w-5 md:h-4 md:w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isListening ? "Stop listening" : "Start voice input"}
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="submit"
            disabled={!message.trim() || disabled || !isConnected}
            size="icon"
            className="h-10 w-10 md:h-9 md:w-9" // Larger on mobile
          >
            <Send className="h-5 w-5 md:h-4 md:w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Send message</TooltipContent>
      </Tooltip>
    </form>
  );
};