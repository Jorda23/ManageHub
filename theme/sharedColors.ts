export const sharedColors = {
  pageBg: "#f3f6f8",
  cardBg: "#ffffff",
  cardBorder: "#dce5e1",
  text: "#0f172a",
  muted: "#64748b",
  softMuted: "#94a3b8",
  tableHead: "#f1f5f9",
} as const;

export const hardwareColors = {
  ...sharedColors,
  primary: "#92400e",
  primaryDark: "#78350f",
  primaryLight: "#f59e0b",
  primarySoft: "#ffedd5",
  blue: "#0891b2",
  blueSoft: "#cffafe",
  green: "#0f766e",
  greenSoft: "#dcfce7",
  danger: "#dc2626",
  dangerSoft: "#fee2e2",
} as const;

export const grainsColors = {
  ...sharedColors,
  pageBg: "#f3f6f4",
  primary: "#064e3b",
  primaryLight: "#0f766e",
  primarySoft: "#dcfce7",
  orange: "#f97316",
  orangeSoft: "#ffedd5",
  danger: "#ef4444",
} as const;

export const propertyColors = {
  ...sharedColors,
  primary: "#1e3a8a",
  primaryLight: "#2563eb",
  primarySoft: "#dbeafe",
  green: "#0f766e",
  greenSoft: "#dcfce7",
  orange: "#f97316",
  orangeSoft: "#ffedd5",
  danger: "#dc2626",
  dangerSoft: "#fee2e2",
  purple: "#7c3aed",
  purpleSoft: "#ede9fe",
} as const;
