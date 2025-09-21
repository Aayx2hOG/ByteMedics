"use client";

import { useState, useEffect, useRef } from 'react';

// Type definitions for Speech Recognition API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognition, ev: any) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

interface SpeechRecognitionConstructor {
  new(): SpeechRecognition;
}

// Extend Window interface for Speech Recognition
declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }
}

export const useSpeechRecognition = (
  language: string = 'en-US',
  onResult?: (text: string) => void
) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      setIsSupported(!!SpeechRecognition);

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        const recognition = recognitionRef.current;

        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = language;

        recognition.onstart = () => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Speech recognition started');
          }
          setIsListening(true);
        };
        
        recognition.onend = () => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Speech recognition ended');
          }
          setIsListening(false);
        };
        
        recognition.onerror = (event: any) => {
          // Handle speech recognition errors gracefully
          const errorMessage = event?.error || 'Speech recognition failed';
          if (process.env.NODE_ENV === 'development') {
            console.warn('Speech recognition error:', errorMessage);
          }
          setIsListening(false);
        };
        
        recognition.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript;
          if (process.env.NODE_ENV === 'development') {
            console.log('Speech recognition result:', transcript);
          }
          onResult?.(transcript);
          // Auto-stop after getting result
          if (recognition) {
            recognition.stop();
          }
        };
      }
    }

    // Cleanup function
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    };
  }, [language, onResult]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Error starting speech recognition:', error);
        }
        setIsListening(false);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        setIsListening(false);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Error stopping speech recognition:', error);
        }
      }
    }
  };

  return {
    isListening,
    isSupported,
    startListening,
    stopListening,
  };
};