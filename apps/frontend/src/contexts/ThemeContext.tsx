"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeName = 'natural-wellness' | 'holistic-health' | 'natural-wellness-dark' | 'holistic-health-dark';

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
  'natural-wellness-dark': {
    primary: {
      50: 'rgb(20, 83, 45)',
      100: 'rgb(22, 101, 52)',
      500: 'rgb(34, 197, 94)',
      600: 'rgb(22, 163, 74)',
      700: 'rgb(21, 128, 61)',
      800: 'rgb(22, 101, 52)',
      900: 'rgb(20, 83, 45)',
    },
    secondary: {
      50: 'rgb(68, 64, 60)',
      100: 'rgb(87, 83, 78)',
      500: 'rgb(168, 162, 158)',
      600: 'rgb(214, 211, 209)',
      700: 'rgb(245, 245, 244)',
    },
    accent: {
      50: 'rgb(3, 105, 161)',
      100: 'rgb(2, 132, 199)',
      500: 'rgb(14, 165, 233)',
      600: 'rgb(56, 189, 248)',
      700: 'rgb(125, 211, 252)',
    },
    text: {
      primary: 'rgb(249, 250, 251)',
      secondary: 'rgb(229, 231, 235)',
      muted: 'rgb(156, 163, 175)',
    },
    background: {
      primary: 'rgb(17, 24, 39)',
      secondary: 'rgb(31, 41, 55)',
      card: 'rgba(31, 41, 55, 0.8)',
      cardHover: 'rgba(55, 65, 81, 0.9)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74))',
      secondary: 'linear-gradient(135deg, rgb(14, 165, 233), rgb(2, 132, 199))',
      accent: 'linear-gradient(135deg, rgb(217, 119, 6), rgb(180, 83, 9))',
      background: 'linear-gradient(135deg, rgb(17, 24, 39), rgba(31, 41, 55, 1), rgb(55, 65, 81))',
      cta: 'linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74), rgb(14, 165, 233))',
    },
  },
  'holistic-health-dark': {
    primary: {
      50: 'rgb(54, 83, 20)',
      100: 'rgb(63, 98, 18)',
      500: 'rgb(132, 204, 22)',
      600: 'rgb(101, 163, 13)',
      700: 'rgb(77, 124, 15)',
      800: 'rgb(63, 98, 18)',
      900: 'rgb(54, 83, 20)',
    },
    secondary: {
      50: 'rgb(126, 34, 206)',
      100: 'rgb(147, 51, 234)',
      500: 'rgb(196, 181, 253)',
      600: 'rgb(221, 214, 254)',
      700: 'rgb(243, 232, 255)',
    },
    accent: {
      50: 'rgb(194, 65, 12)',
      100: 'rgb(234, 88, 12)',
      500: 'rgb(251, 146, 60)',
      600: 'rgb(253, 186, 116)',
      700: 'rgb(254, 215, 170)',
    },
    text: {
      primary: 'rgb(249, 250, 251)',
      secondary: 'rgb(229, 231, 235)',
      muted: 'rgb(156, 163, 175)',
    },
    background: {
      primary: 'rgb(17, 24, 39)',
      secondary: 'rgb(31, 41, 55)',
      card: 'rgba(31, 41, 55, 0.8)',
      cardHover: 'rgba(55, 65, 81, 0.9)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, rgb(132, 204, 22), rgb(101, 163, 13))',
      secondary: 'linear-gradient(135deg, rgb(168, 85, 247), rgb(147, 51, 234))',
      accent: 'linear-gradient(135deg, rgb(251, 146, 60), rgb(234, 88, 12))',
      background: 'linear-gradient(135deg, rgb(17, 24, 39), rgba(31, 41, 55, 1), rgb(55, 65, 81))',
      cta: 'linear-gradient(135deg, rgb(132, 204, 22), rgb(168, 85, 247), rgb(251, 146, 60))',
    },
  },
};

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  colors: ThemeColors;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  baseTheme: 'natural-wellness' | 'holistic-health';
  setBaseTheme: (theme: 'natural-wellness' | 'holistic-health') => void;
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
  const [baseTheme, setBaseTheme] = useState<'natural-wellness' | 'holistic-health'>('natural-wellness');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Compute current theme based on base theme and dark mode
  const currentTheme: ThemeName = isDarkMode 
    ? (baseTheme === 'natural-wellness' ? 'natural-wellness-dark' : 'holistic-health-dark')
    : baseTheme;

  useEffect(() => {
    // Mark as hydrated and load theme from localStorage
    setIsHydrated(true);
    const savedBaseTheme = localStorage.getItem('bytemedics-base-theme') as 'natural-wellness' | 'holistic-health';
    const savedDarkMode = localStorage.getItem('bytemedics-dark-mode') === 'true';
    
    if (savedBaseTheme && (savedBaseTheme === 'natural-wellness' || savedBaseTheme === 'holistic-health')) {
      setBaseTheme(savedBaseTheme);
    }
    setIsDarkMode(savedDarkMode);
  }, []);

  const setTheme = (theme: ThemeName) => {
    // Extract base theme and dark mode from the theme name
    if (theme.endsWith('-dark')) {
      const base = theme.replace('-dark', '') as 'natural-wellness' | 'holistic-health';
      setBaseTheme(base);
      setIsDarkMode(true);
      if (isHydrated) {
        localStorage.setItem('bytemedics-base-theme', base);
        localStorage.setItem('bytemedics-dark-mode', 'true');
      }
    } else {
      setBaseTheme(theme as 'natural-wellness' | 'holistic-health');
      setIsDarkMode(false);
      if (isHydrated) {
        localStorage.setItem('bytemedics-base-theme', theme);
        localStorage.setItem('bytemedics-dark-mode', 'false');
      }
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (isHydrated) {
      localStorage.setItem('bytemedics-dark-mode', newDarkMode.toString());
    }
  };

  const handleSetBaseTheme = (theme: 'natural-wellness' | 'holistic-health') => {
    setBaseTheme(theme);
    if (isHydrated) {
      localStorage.setItem('bytemedics-base-theme', theme);
    }
  };

  const colors = themes[currentTheme];

  // Prevent hydration mismatch by not rendering until hydrated
  if (!isHydrated) {
    return (
      <ThemeContext.Provider value={{ 
        currentTheme: 'natural-wellness', 
        setTheme, 
        colors: themes['natural-wellness'],
        isDarkMode: false,
        toggleDarkMode: () => {},
        baseTheme: 'natural-wellness',
        setBaseTheme: () => {}
      }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ 
      currentTheme, 
      setTheme, 
      colors,
      isDarkMode,
      toggleDarkMode,
      baseTheme,
      setBaseTheme: handleSetBaseTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};