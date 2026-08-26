import { createTheme } from "@mui/material/styles";
import { colors } from "./sharedColors";

export const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: colors.pageBg,
      paper: colors.cardBg,
    },
    primary: {
      main: "#0f766e",
    },
    secondary: {
      main: "#2563eb",
    },
    text: {
      primary: colors.text,
      secondary: colors.muted,
    },
  },
  typography: {
    fontFamily: "Arial, Helvetica, sans-serif",
    h5: {
      fontWeight: 800,
    },
    h6: {
      fontWeight: 800,
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 14,
  },
});
