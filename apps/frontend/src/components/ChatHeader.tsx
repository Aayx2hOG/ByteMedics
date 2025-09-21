"use client";

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { LanguageSelector } from './LanguageSelector';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Volume2, 
  VolumeX, 
  Trash2,
  Settings,
  RefreshCw
} from 'lucide-react';

interface ChatHeaderProps {
  isSpeechEnabled: boolean;
  onToggleSpeech: () => void;
  onClearChat: () => void;
  onOpenSettings: () => void;
  isConnected: boolean;
  language: string;
  onLanguageChange: (language: string) => void;
}

export const ChatHeader = ({
  isSpeechEnabled,
  onToggleSpeech,
  onClearChat,
  onOpenSettings,
  isConnected,
  language,
  onLanguageChange,
}: ChatHeaderProps) => {
  const { colors } = useTheme();

  return (
    <header 
      className="flex items-center justify-between p-4 border-b backdrop-blur-sm"
      style={{ 
        backgroundColor: `${colors.background.card}90`,
        borderColor: `${colors.secondary[100]}60`
      }}
    >
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div 
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              isConnected ? 'animate-pulse' : 'animate-bounce'
            }`}
            style={{ 
              backgroundColor: isConnected ? colors.primary[500] : colors.accent[500] 
            }}
          />
          <span 
            className="text-sm font-medium"
            style={{ color: colors.text.secondary }}
          >
            {isConnected ? 'Connected & Ready' : 'Reconnecting...'}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {/* Language Selector - Hidden on mobile */}
        <div className="hidden md:block">
          <LanguageSelector value={language} onValueChange={onLanguageChange} />
        </div>

        {/* Speech Toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg"
                 style={{ backgroundColor: `${colors.secondary[50]}80` }}>
              <VolumeX className="w-4 h-4" style={{ color: colors.text.muted }} />
              <Switch
                checked={isSpeechEnabled}
                onCheckedChange={onToggleSpeech}
                className="scale-75"
              />
              <Volume2 className="w-4 h-4" style={{ color: colors.text.muted }} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {isSpeechEnabled ? 'Disable' : 'Enable'} text-to-speech
          </TooltipContent>
        </Tooltip>

        {/* Mobile Speech Toggle */}
        <div className="sm:hidden">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleSpeech}
                className="h-9 w-9 rounded-xl transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: isSpeechEnabled 
                    ? `${colors.primary[50]}80` 
                    : `${colors.secondary[50]}80`,
                  color: isSpeechEnabled ? colors.primary[600] : colors.text.muted
                }}
              >
                {isSpeechEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isSpeechEnabled ? 'Disable' : 'Enable'} text-to-speech
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Settings - Hidden on mobile */}
        <div className="hidden lg:block">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onOpenSettings}
                className="h-9 w-9 rounded-xl transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: `${colors.secondary[50]}80`,
                  color: colors.text.muted
                }}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Settings</TooltipContent>
          </Tooltip>
        </div>

        {/* Clear Chat */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClearChat}
              className="h-9 w-9 rounded-xl transition-all duration-200 hover:scale-105 hover:bg-red-50"
              style={{
                backgroundColor: `${colors.secondary[50]}80`,
                color: colors.text.muted
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Clear conversation</TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
};
