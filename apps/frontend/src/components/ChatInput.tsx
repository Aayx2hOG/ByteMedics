"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useTheme } from '@/contexts/ThemeContext';
import { Mic, MicOff, Send, Sparkles } from 'lucide-react';
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
  const { colors } = useTheme();

  useEffect(() => {
    if (!isListening && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isListening]);

  const handleMicClick = useCallback(() => {
    if (isListening) {
      onStopListening();
    } else {
      onStartListening();
    }
  }, [isListening, onStopListening, onStartListening]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + M for voice input toggle (try both lowercase and uppercase)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'm' || e.key === 'M')) {
        e.preventDefault();
        if (!disabled && isConnected) {
          handleMicClick();
        }
      }
      
      // Ctrl/Cmd + Enter for sending message
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (message.trim() && isConnected && !disabled) {
          onSendMessage(message);
          setMessage('');
        }
      }
      
      // Escape to stop voice input
      if (e.key === 'Escape' && isListening) {
        e.preventDefault();
        onStopListening();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [message, isListening, isConnected, disabled, onSendMessage, onStopListening, handleMicClick]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && isConnected && !disabled) {
      onSendMessage(message);
      setMessage('');
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
    <div 
      className="border-t backdrop-blur-sm"
      style={{ 
        backgroundColor: `${colors.background.card}95`,
        borderColor: `${colors.secondary[100]}60`
      }}
    >
      <form onSubmit={handleSubmit} className="flex items-center space-x-3 p-4 md:p-6">
        <div className="flex-1 relative">
          <Input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              isListening 
                ? "🎤 Listening..." 
                : isConnected 
                  ? "Ask me anything about your health... (Ctrl+M for voice)" 
                  : "Connecting to health assistant..."
            }
            disabled={disabled || !isConnected || isListening}
            className={cn(
              "text-base h-12 px-6 rounded-2xl border-2 transition-all duration-200",
              "focus:ring-4 focus:ring-opacity-20",
              isListening && "animate-pulse"
            )}
            style={{
              backgroundColor: isListening 
                ? `${colors.accent[50]}80` 
                : colors.background.secondary,
              borderColor: isListening 
                ? colors.accent[500] 
                : `${colors.secondary[100]}80`,
              color: colors.text.primary
            }}
            aria-label="Health question input"
            aria-describedby="input-help"
            role="textbox"
            aria-multiline="false"
          />
          <div id="input-help" className="sr-only">
            Type your health question here. Press Ctrl+M to toggle voice input, Ctrl+Enter to send, or Escape to stop voice input.
          </div>
          {/* Screen reader announcements */}
          <div 
            className="sr-only" 
            aria-live="polite" 
            aria-atomic="true"
          >
            {isListening ? "Voice input is active. Speak now." : ""}
            {!isConnected ? "Connecting to health assistant..." : ""}
          </div>
          {isListening && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="flex space-x-1">
                <div 
                  className="w-1 h-4 rounded-full animate-pulse"
                  style={{ backgroundColor: colors.accent[500] }}
                ></div>
                <div 
                  className="w-1 h-6 rounded-full animate-pulse delay-75"
                  style={{ backgroundColor: colors.accent[500] }}
                ></div>
                <div 
                  className="w-1 h-4 rounded-full animate-pulse delay-150"
                  style={{ backgroundColor: colors.accent[500] }}
                ></div>
              </div>
            </div>
          )}
        </div>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleMicClick}
              disabled={disabled || !isConnected}
              className={cn(
                "h-12 w-12 rounded-xl transition-all duration-200 hover:scale-105",
                isListening && "animate-pulse"
              )}
              style={{
                backgroundColor: isListening 
                  ? `${colors.accent[500]}20` 
                  : `${colors.secondary[50]}80`,
                color: isListening ? colors.accent[600] : colors.text.muted,
                borderColor: isListening ? colors.accent[500] : 'transparent'
              }}
              aria-label={isListening ? "Stop voice input (Escape)" : "Start voice input (Ctrl+M)"}
              aria-pressed={isListening}
              tabIndex={0}
            >
              {isListening ? (
                <MicOff className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isListening ? "Stop listening (Escape)" : "Start voice input (Ctrl+M)"}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="submit"
              disabled={!message.trim() || disabled || !isConnected}
              size="icon"
              className={cn(
                "h-12 w-12 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              )}
              style={{
                background: message.trim() && isConnected && !disabled
                  ? colors.gradients.primary
                  : `${colors.secondary[100]}80`,
                color: message.trim() && isConnected && !disabled
                  ? 'white'
                  : colors.text.muted
              }}
              aria-label={message.trim() ? "Send message (Enter or Ctrl+Enter)" : "Type a message to send"}
              tabIndex={0}
            >
              {message.trim() && isConnected && !disabled ? (
                <Send className="h-5 w-5" />
              ) : (
                <Sparkles className="h-5 w-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {message.trim() ? "Send message (Enter or Ctrl+Enter)" : "Type a message to send"}
          </TooltipContent>
        </Tooltip>
      </form>
    </div>
  );
};