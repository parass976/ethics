import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type ThemeType = 'matrix-green' | 'cyberpunk-blue' | 'neon-purple' | 'stealth-dark';

interface ThemeConfig {
  name: ThemeType;
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  background: string;
}

const themes: Record<ThemeType, ThemeConfig> = {
  'matrix-green': {
    name: 'matrix-green',
    primary: '#00ff41',
    secondary: '#00d4ff',
    accent: '#ff4444',
    glow: 'from-green-600 to-green-400',
    background: '#060608',
  },
  'cyberpunk-blue': {
    name: 'cyberpunk-blue',
    primary: '#00d4ff',
    secondary: '#00a8ff',
    accent: '#ff006e',
    glow: 'from-cyan-600 to-cyan-400',
    background: '#0a0e27',
  },
  'neon-purple': {
    name: 'neon-purple',
    primary: '#c84aff',
    secondary: '#ff006e',
    accent: '#ffbe0b',
    glow: 'from-purple-600 to-purple-400',
    background: '#1a0033',
  },
  'stealth-dark': {
    name: 'stealth-dark',
    primary: '#ffffff',
    secondary: '#a0aec0',
    accent: '#f56565',
    glow: 'from-gray-600 to-gray-400',
    background: '#0f0f0f',
  },
};

interface ThemeContextType {
  theme: ThemeConfig;
  setTheme: (theme: ThemeType) => void;
  brightness: number;
  setBrightness: (brightness: number) => void;
  animationIntensity: 'low' | 'medium' | 'high';
  setAnimationIntensity: (intensity: 'low' | 'medium' | 'high') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return (saved as ThemeType) || 'matrix-green';
  });

  const [brightness, setBrightness] = useState(() => {
    const saved = localStorage.getItem('portfolio-brightness');
    return saved ? parseInt(saved) : 100;
  });

  const [animationIntensity, setAnimationIntensity] = useState<'low' | 'medium' | 'high'>(() => {
    const saved = localStorage.getItem('portfolio-animation');
    return (saved as 'low' | 'medium' | 'high') || 'high';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('portfolio-brightness', brightness.toString());
    document.documentElement.style.filter = `brightness(${brightness / 100})`;
  }, [brightness]);

  useEffect(() => {
    localStorage.setItem('portfolio-animation', animationIntensity);
  }, [animationIntensity]);

  const themeConfig = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme: themeConfig, setTheme, brightness, setBrightness, animationIntensity, setAnimationIntensity }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
