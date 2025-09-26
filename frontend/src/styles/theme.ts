export interface Theme {
  colors: {
    primary: string
    secondary: string
    accent: string
    highlight: string
    spaceGradient: string
    nebulaGradient: string
    starGradient: string
    textPrimary: string
    textSecondary: string
    textMuted: string
    success: string
    warning: string
    error: string
    info: string
    background: string
    surface: string
    surfaceHover: string
    border: string
    overlay: string
    glass: string
    glassHover: string
  }
  fonts: {
    primary: string
    secondary: string
  }
  fontSizes: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
    '4xl': string
    '5xl': string
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
    xl: string
    full: string
  }
  shadows: {
    sm: string
    md: string
    lg: string
    xl: string
    glow: string
    space: string
  }
  breakpoints: {
    mobile: string
    tablet: string
    desktop: string
    wide: string
  }
  animations: {
    fast: string
    normal: string
    slow: string
    bounce: string
  }
}

export const theme: Theme = {
  colors: {
    // Основные космические цвета
    primary: '#1a1a2e',      // Темно-синий космос
    secondary: '#16213e',    // Глубокий синий
    accent: '#0f3460',       // Синий акцент
    highlight: '#e94560',    // Красный марс
    
    // Градиенты
    spaceGradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    nebulaGradient: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
    starGradient: 'linear-gradient(180deg, #ffd700 0%, #ffed4e 100%)',
    
    // Текст
    textPrimary: '#ffffff',
    textSecondary: '#b8c5d6',
    textMuted: '#8a9ba8',
    
    // Статусы
    success: '#4ade80',
    warning: '#fbbf24',
    error: '#ef4444',
    info: '#3b82f6',
    
    // Фоны
    background: '#0a0a0a',
    surface: '#1a1a2e',
    surfaceHover: '#2a2a3e',
    border: '#374151',
    
    // Прозрачности
    overlay: 'rgba(0, 0, 0, 0.8)',
    glass: 'rgba(255, 255, 255, 0.1)',
    glassHover: 'rgba(255, 255, 255, 0.2)',
  },
  
  fonts: {
    primary: '"Orbitron", sans-serif',
    secondary: '"Inter", sans-serif',
  },
  
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(102, 126, 234, 0.3)',
    space: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  },
  
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
  
  animations: {
    fast: '0.15s ease-in-out',
    normal: '0.3s ease-in-out',
    slow: '0.5s ease-in-out',
    bounce: '0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
}
