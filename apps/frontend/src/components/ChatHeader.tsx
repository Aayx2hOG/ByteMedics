"use client";

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { LanguageSelector } from './LanguageSelector';
import { 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  Trash2,
  Settings,
  Globe
} from 'lucide-react';

interface ChatHeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isSpeechEnabled: boolean;
  onToggleSpeech: () => void;
  onClearChat: () => void;
  onOpenSettings: () => void;
  isConnected: boolean;
  language: string;
  onLanguageChange: (language: string) => void;
}

export const ChatHeader = ({
  isDarkMode,
  onToggleDarkMode,
  isSpeechEnabled,
  onToggleSpeech,
  onClearChat,
  onOpenSettings,
  isConnected,
  language,
  onLanguageChange,
}: ChatHeaderProps) => {
  return (
    <header className="flex items-center justify-between p-3 md:p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center space-x-2 md:space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">BM</span>
          </div>
          <div>
            <h1 className="font-semibold text-base md:text-lg">ByteMedics Chat</h1>
            <div className="flex items-center space-x-2 text-xs">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-muted-foreground">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-1 md:space-x-2">
        <div className="hidden sm:block">
          <LanguageSelector value={language} onValueChange={onLanguageChange} />
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="hidden sm:flex items-center space-x-2">
              <VolumeX className="w-4 h-4" />
              <Switch
                checked={isSpeechEnabled}
                onCheckedChange={onToggleSpeech}
              />
              <Volume2 className="w-4 h-4" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {isSpeechEnabled ? 'Disable' : 'Enable'} text-to-speech
          </TooltipContent>
        </Tooltip>

        {/* Mobile-friendly speech toggle */}
        <div className="sm:hidden">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleSpeech}
                className="h-8 w-8"
              >
                {isSpeechEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isSpeechEnabled ? 'Disable' : 'Enable'} text-to-speech
            </TooltipContent>
          </Tooltip>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleDarkMode}
              className="h-8 w-8 md:h-10 md:w-10"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Switch to {isDarkMode ? 'light' : 'dark'} mode
          </TooltipContent>
        </Tooltip>

        <div className="hidden sm:block">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onOpenSettings}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Settings</TooltipContent>
          </Tooltip>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClearChat}
              className="h-8 w-8 md:h-10 md:w-10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Clear chat</TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
};
