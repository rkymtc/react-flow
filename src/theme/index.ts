import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
      contrastText: '#f1f5f9',
    },
    secondary: {
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#7c3aed',
      contrastText: '#f1f5f9',
    },
    background: {
      default: '#171717',
      paper: '#171717',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
    },
    divider: '#414141',
    action: {
      hover: 'rgba(59, 130, 246, 0.08)',
      selected: 'rgba(59, 130, 246, 0.12)',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#171717',
          scrollbarColor: "#414141 #171717",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            width: 8,
            height: 8,
            backgroundColor: '#171717',
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: '#414141',
            border: '2px solid 414141',
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: '#334155',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#171717',
          borderRadius: 16,
          border: '1px solid  #414141',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: 'none',
          backgroundImage: 'none',
          backgroundColor: '#171717',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#171717',
          borderBottom: '1px solid  #414141',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
          padding: '10px 16px',
          '&.Mui-selected': {
            backgroundColor: 'rgba(59, 130, 246, 0.12)',
            '&:hover': {
              backgroundColor: 'rgba(59, 130, 246, 0.16)',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#171717',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#171717',
          borderRadius: 12,
          border: '1px solid #414141',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(59, 130, 246, 0.08)',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#171717',
          border: '1px solid #414141',
          color: '#94a3b8',
        },
      },
    },
  },
}); 