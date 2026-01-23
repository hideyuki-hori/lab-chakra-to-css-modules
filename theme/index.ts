import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    primary: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3',
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1',
    },
    accent: {
      50: '#e0f2f1',
      100: '#b2dfdb',
      200: '#80cbc4',
      300: '#4db6ac',
      400: '#26a69a',
      500: '#009688',
      600: '#00897b',
      700: '#00796b',
      800: '#00695c',
      900: '#004d40',
    },
    status: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    projectStatus: {
      planning: '#94a3b8',
      active: '#3b82f6',
      completed: '#10b981',
      'on-hold': '#f59e0b',
    },
    taskPriority: {
      low: '#94a3b8',
      medium: '#3b82f6',
      high: '#f59e0b',
      urgent: '#ef4444',
    },
    taskStatus: {
      todo: '#94a3b8',
      'in-progress': '#3b82f6',
      completed: '#10b981',
    },
    userStatus: {
      active: '#10b981',
      away: '#f59e0b',
      offline: '#94a3b8',
    },
  },
  fonts: {
    heading: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans JP", "Yu Gothic Medium", "Meiryo", sans-serif`,
    body: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans JP", "Yu Gothic Medium", "Meiryo", sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'md',
      },
      variants: {
        primary: {
          bg: 'primary.500',
          color: 'white',
          _hover: {
            bg: 'primary.600',
            _disabled: {
              bg: 'primary.500',
            },
          },
          _active: {
            bg: 'primary.700',
          },
        },
        accent: {
          bg: 'accent.500',
          color: 'white',
          _hover: {
            bg: 'accent.600',
            _disabled: {
              bg: 'accent.500',
            },
          },
          _active: {
            bg: 'accent.700',
          },
        },
      },
      defaultProps: {
        colorScheme: 'primary',
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'white',
          borderRadius: 'lg',
          boxShadow: 'sm',
          _hover: {
            boxShadow: 'md',
          },
          transition: 'box-shadow 0.2s',
        },
      },
    },
    Badge: {
      baseStyle: {
        borderRadius: 'md',
        px: 2,
        py: 1,
        fontWeight: 'medium',
      },
    },
  },
  shadows: {
    outline: '0 0 0 3px rgba(33, 150, 243, 0.4)',
  },
});

export default theme;
