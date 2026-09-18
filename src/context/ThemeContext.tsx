import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeType } from '../types';

interface ThemeMetadata {
  id: ThemeType;
  name: string;
  tagline: string;
  icon: string;
  accentColor: string;
  secondaryColor: string;
  bgColor: string;
  surfaceColor: string;
  description: string;
  badge: string;
}

export const THEMES: Record<ThemeType, ThemeMetadata> = {
  trust: {
    id: 'trust',
    name: 'Trust Blue',
    tagline: 'Enterprise Compliance',
    icon: '🔵',
    accentColor: '#2563EB',
    secondaryColor: '#06B6D4',
    bgColor: '#F7F9FC',
    surfaceColor: '#FFFFFF',
    description: 'Clean, corporate enterprise palette with electric blue accents and soft shadows.',
    badge: 'Default Corporate',
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Cyber',
    tagline: 'Futuristic AI Security',
    icon: '🌙',
    accentColor: '#22D3EE',
    secondaryColor: '#8B5CF6',
    bgColor: '#080B14',
    surfaceColor: '#111827',
    description: 'Dark cyber-security interface with neon edge highlights and ambient glowing panels.',
    badge: 'Dark AI Aesthetic',
  },
  aurora: {
    id: 'aurora',
    name: 'Aurora Executive',
    tagline: 'Modern Executive Suite',
    icon: '✨',
    accentColor: '#6366F1',
    secondaryColor: '#14B8A6',
    bgColor: '#FAFAF9',
    surfaceColor: '#FFFFFF',
    description: 'Refined executive SaaS styling with subtle indigo-teal gradients and soft depth.',
    badge: 'Executive Suite',
  },
};

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  themes: typeof THEMES;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeType>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('complyx_theme') as ThemeType;
      if (saved && (saved === 'trust' || saved === 'midnight' || saved === 'aurora')) {
        return saved;
      }
    }
    return 'trust';
  });

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('complyx_theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      document.body.setAttribute('data-theme', newTheme);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
