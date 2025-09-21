"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeName = 'natural-wellness' | 'holistic-health';

export interface ThemeColors {
  primary: {
    50: string;
    100: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  secondary: {
    50: string;
    100: string;
    500: string;
    600: string;
    700: string;
  };
  accent: {
    50: string;
    100: string;
    500: string;
    600: string;
    700: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  background: {
    primary: string;
    secondary: string;
    card: string;
    cardHover: string;
  };
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    cta: string;
  };
}

const themes: Record<ThemeName, ThemeColors> = {
  'natural-wellness': {
    primary: {
      50: 'rgb(240, 253, 244)',
      100: 'rgb(220, 252, 231)',
      500: 'rgb(34, 197, 94)',
      600: 'rgb(22, 163, 74)',
      700: 'rgb(21, 128, 61)',
      800: 'rgb(22, 101, 52)',
      900: 'rgb(20, 83, 45)',
    },
    secondary: {
      50: 'rgb(250, 250, 249)',
      100: 'rgb(245, 245, 244)',
      500: 'rgb(120, 113, 108)',
      600: 'rgb(87, 83, 78)',
      700: 'rgb(68, 64, 60)',
    },
    accent: {
      50: 'rgb(240, 249, 255)',
      100: 'rgb(224, 242, 254)',
      500: 'rgb(14, 165, 233)',
      600: 'rgb(2, 132, 199)',
      700: 'rgb(3, 105, 161)',
    },
    text: {
      primary: 'rgb(31, 41, 55)',
      secondary: 'rgb(55, 65, 81)',
      muted: 'rgb(107, 114, 128)',
    },
    background: {
      primary: 'rgb(249, 250, 251)',
      secondary: 'rgb(243, 244, 246)',
      card: 'rgba(250, 250, 249, 0.8)',
      cardHover: 'rgba(245, 245, 244, 0.9)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, rgb(22, 163, 74), rgb(21, 128, 61))',
      secondary: 'linear-gradient(135deg, rgb(14, 165, 233), rgb(2, 132, 199))',
      accent: 'linear-gradient(135deg, rgb(217, 119, 6), rgb(180, 83, 9))',
      background: 'linear-gradient(135deg, rgb(249, 250, 251), rgba(250, 250, 249, 1), rgb(243, 244, 246))',
      cta: 'linear-gradient(135deg, rgb(22, 163, 74), rgb(21, 128, 61), rgb(14, 165, 233))',
    },
  },
  'holistic-health': {
    primary: {
      50: 'rgb(247, 254, 231)',
      100: 'rgb(236, 252, 203)',
      500: 'rgb(132, 204, 22)',
      600: 'rgb(101, 163, 13)',
      700: 'rgb(77, 124, 15)',
      800: 'rgb(63, 98, 18)',
      900: 'rgb(54, 83, 20)',
    },
    secondary: {
      50: 'rgb(250, 245, 255)',
      100: 'rgb(243, 232, 255)',
      500: 'rgb(168, 85, 247)',
      600: 'rgb(147, 51, 234)',
      700: 'rgb(126, 34, 206)',
    },
    accent: {
      50: 'rgb(255, 251, 235)',
      100: 'rgb(254, 243, 199)',
      500: 'rgb(251, 146, 60)',
      600: 'rgb(234, 88, 12)',
      700: 'rgb(194, 65, 12)',
    },
    text: {
      primary: 'rgb(17, 24, 39)',
      secondary: 'rgb(31, 41, 55)',
      muted: 'rgb(75, 85, 99)',
    },
    background: {
      primary: 'rgb(254, 252, 232)',
      secondary: 'rgb(253, 246, 178)',
      card: 'rgba(254, 252, 232, 0.8)',
      cardHover: 'rgba(253, 246, 178, 0.9)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, rgb(101, 163, 13), rgb(77, 124, 15))',
      secondary: 'linear-gradient(135deg, rgb(147, 51, 234), rgb(126, 34, 206))',
      accent: 'linear-gradient(135deg, rgb(251, 146, 60), rgb(234, 88, 12))',
      background: 'linear-gradient(135deg, rgb(254, 252, 232), rgba(253, 246, 178, 1), rgb(252, 233, 106))',
      cta: 'linear-gradient(135deg, rgb(101, 163, 13), rgb(147, 51, 234), rgb(251, 146, 60))',
    },
  },
};

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('natural-wellness');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Mark as hydrated and load theme from localStorage
    setIsHydrated(true);
    const savedTheme = localStorage.getItem('bytemedics-theme') as ThemeName;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const setTheme = (theme: ThemeName) => {
    setCurrentTheme(theme);
    if (isHydrated) {
      localStorage.setItem('bytemedics-theme', theme);
    }
  };

  const colors = themes[currentTheme];

  // Prevent hydration mismatch by not rendering until hydrated
  if (!isHydrated) {
    return (
      <ThemeContext.Provider value={{ currentTheme: 'natural-wellness', setTheme, colors: themes['natural-wellness'] }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};