import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#001f21',
      paper: '#032b2d',
    },
    primary: {
      main: '#19d3d8',
    },
    secondary: {
      main: '#5ee3a7',
    },
    text: {
      primary: '#f4ffff',
      secondary: '#a9c3c5',
    },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    h5: {
      fontWeight: 800,
    },
    h6: {
      fontWeight: 800,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 14,
  },
});