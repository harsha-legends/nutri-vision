import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode
          primary: {
            main: '#6366f1',
            light: '#818cf8',
            dark: '#4f46e5',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#10b981',
            light: '#34d399',
            dark: '#059669',
            contrastText: '#ffffff',
          },
          error: {
            main: '#ef4444',
            light: '#f87171',
            dark: '#dc2626',
          },
          warning: {
            main: '#f59e0b',
            light: '#fbbf24',
            dark: '#d97706',
          },
          success: {
            main: '#22c55e',
            light: '#4ade80',
            dark: '#16a34a',
          },
          background: {
            default: '#f8fafc',
            paper: '#ffffff',
          },
          text: {
            primary: '#1e293b',
            secondary: '#64748b',
          },
        }
      : {
          // Dark mode
          primary: {
            main: '#818cf8',
            light: '#a5b4fc',
            dark: '#6366f1',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#34d399',
            light: '#6ee7b7',
            dark: '#10b981',
            contrastText: '#ffffff',
          },
          error: {
            main: '#f87171',
            light: '#fca5a5',
            dark: '#ef4444',
          },
          warning: {
            main: '#fbbf24',
            light: '#fcd34d',
            dark: '#f59e0b',
          },
          success: {
            main: '#4ade80',
            light: '#86efac',
            dark: '#22c55e',
          },
          background: {
            default: '#0f172a',
            paper: '#1e293b',
          },
          text: {
            primary: '#f1f5f9',
            secondary: '#94a3b8',
          },
        }),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 24px',
          fontSize: '0.95rem',
        },
        contained: {
          boxShadow: '0px 4px 14px rgba(99, 102, 241, 0.4)',
          '&:hover': {
            boxShadow: '0px 6px 20px rgba(99, 102, 241, 0.5)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none',
        },
      },
    },
  },
});

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));

export const gradients = {
  primary: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  secondary: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
  warm: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
  cool: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
  pink: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
  dark: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
  veg: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
  nonVeg: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
  juice: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
  packed: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
};

export const chartColors = {
  calories: '#ef4444',
  protein: '#3b82f6',
  carbs: '#f59e0b',
  fats: '#8b5cf6',
  fiber: '#22c55e',
  sugar: '#ec4899',
  vitamins: '#06b6d4',
  minerals: '#14b8a6',
};

// Default export for backward compatibility
const theme = createAppTheme('light');
export default theme;
