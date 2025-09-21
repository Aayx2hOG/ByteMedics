"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Palette, Leaf, Sparkles } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { currentTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = currentTheme === 'natural-wellness' ? 'holistic-health' : 'natural-wellness';
    setTheme(newTheme);
  };

  const themeConfig = {
    'natural-wellness': {
      name: 'Natural Wellness',
      icon: Leaf,
      color: 'text-green-600',
      bgColor: 'bg-green-50 hover:bg-green-100',
    },
    'holistic-health': {
      name: 'Holistic Health',
      icon: Sparkles,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
    },
  };

  const config = themeConfig[currentTheme];
  const IconComponent = config.icon;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className={`${config.bgColor} border-2 transition-all duration-300 hover:scale-105 group`}
      title={`Switch to ${currentTheme === 'natural-wellness' ? 'Holistic Health' : 'Natural Wellness'} theme`}
    >
      <Palette className="w-4 h-4 mr-2 text-gray-600" />
      <IconComponent className={`w-4 h-4 mr-2 ${config.color} group-hover:animate-pulse`} />
      <span className="hidden sm:inline text-gray-700 font-medium">
        {config.name}
      </span>
    </Button>
  );
};