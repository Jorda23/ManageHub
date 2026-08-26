export const palette = {
  background: {
    page: "#f3f6f8",
    surface: "#ffffff",
    subtle: "#f1f5f9",
  },

  border: {
    default: "#dce5e1",
  },

  text: {
    primary: "#0f172a",
    secondary: "#64748b",
    muted: "#94a3b8",
  },

  amber: {
    50: "#ffedd5",
    500: "#f59e0b",
    800: "#92400e",
    900: "#78350f",
  },

  blue: {
    100: "#dbeafe",
    200: "#bfdbfe",
    600: "#2563eb",
    900: "#1e3a8a",
  },

  cyan: {
    100: "#cffafe",
    600: "#0891b2",
  },

  emerald: {
    100: "#dcfce7",
    200: "#bbf7d0",
    700: "#0f766e",
    900: "#064e3b",
  },

  orange: {
    100: "#ffedd5",
    200: "#fed7aa",
    500: "#f97316",
  },

  red: {
    100: "#fee2e2",
    200: "#fecaca",
    500: "#ef4444",
    600: "#dc2626",
  },

  violet: {
    100: "#ede9fe",
    600: "#7c3aed",
  },
} as const;

export const colors = {
  pageBg: palette.background.page,

  cardBg: palette.background.surface,
  cardBorder: palette.border.default,

  text: palette.text.primary,
  muted: palette.text.secondary,
  softMuted: palette.text.muted,
  tableHead: palette.background.subtle,

  primary: palette.blue[900],
  primaryLight: palette.blue[600],
  primarySoft: palette.blue[100],
  primaryBorder: palette.blue[200],

  green: palette.emerald[700],
  greenSoft: palette.emerald[100],
  greenBorder: palette.emerald[200],

  orange: palette.orange[500],
  orangeSoft: palette.orange[100],
  orangeBorder: palette.orange[200],

  danger: palette.red[600],
  dangerSoft: palette.red[100],
  dangerBorder: palette.red[200],

  purple: palette.violet[600],
  purpleSoft: palette.violet[100],
} as const;
