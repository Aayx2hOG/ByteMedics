"use client";

import React, { useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Palette, Leaf, Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { baseTheme, setBaseTheme, isDarkMode, toggleDarkMode, colors } = useTheme();

  const toggleBaseTheme = useCallback(() => {
    const newBaseTheme = baseTheme === 'natural-wellness' ? 'holistic-health' : 'natural-wellness';
    setBaseTheme(newBaseTheme);
  }, [baseTheme, setBaseTheme]);

  // Keyboard shortcuts for theme switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + T for theme toggle (try both cases)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'T' || e.key === 't')) {
        e.preventDefault();
        toggleBaseTheme();
      }
      
      // Ctrl/Cmd + Shift + D for dark mode toggle (try both cases)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault();
        toggleDarkMode();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleDarkMode, toggleBaseTheme]);

  const themeConfig = {
    'natural-wellness': {
      name: 'Natural Wellness',
      icon: Leaf,
      color: colors.primary[600],
    },
    'holistic-health': {
      name: 'Holistic Health', 
      icon: Sparkles,
      color: colors.primary[600],
    },
  };

  const config = themeConfig[baseTheme];
  const IconComponent = config.icon;

  return (
    <div className="flex items-center space-x-2">
      {/* Base Theme Toggle */}
      <Button
        variant="outline"
        size="sm"
        onClick={toggleBaseTheme}
        className="transition-all duration-300 hover:scale-105 group border-2"
        style={{
          backgroundColor: colors.background.card,
          borderColor: colors.secondary[100],
          color: colors.text.primary
        }}
        title={`Switch to ${baseTheme === 'natural-wellness' ? 'Holistic Health' : 'Natural Wellness'} theme (Ctrl+Shift+T)`}
        aria-label={`Current theme: ${config.name}. Switch to ${baseTheme === 'natural-wellness' ? 'Holistic Health' : 'Natural Wellness'} theme`}
        tabIndex={0}
      >
        <Palette className="w-4 h-4 mr-2" style={{ color: colors.text.muted }} />
        <IconComponent 
          className="w-4 h-4 mr-2 group-hover:animate-pulse" 
          style={{ color: config.color }}
        />
        <span className="hidden sm:inline font-medium">
          {config.name}
        </span>
      </Button>

      {/* Dark Mode Toggle */}
      <Button
        variant="outline"
        size="sm"
        onClick={toggleDarkMode}
        className="transition-all duration-300 hover:scale-105 group border-2"
        style={{
          backgroundColor: colors.background.card,
          borderColor: isDarkMode 
            ? colors.primary[100] 
            : colors.secondary[100],
          color: colors.text.primary
        }}
        title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode (Ctrl+Shift+D)`}
        aria-label={`Current mode: ${isDarkMode ? 'Dark' : 'Light'}. Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        aria-pressed={isDarkMode}
        tabIndex={0}
      >
        {isDarkMode ? (
          <Sun className="w-4 h-4 group-hover:animate-spin" style={{ color: colors.accent[600] }} />
        ) : (
          <Moon className="w-4 h-4 group-hover:animate-pulse" style={{ color: colors.primary[600] }} />
        )}
        <span className="hidden md:inline ml-2 font-medium">
          {isDarkMode ? 'Light' : 'Dark'}
        </span>
      </Button>
    </div>
  );
};