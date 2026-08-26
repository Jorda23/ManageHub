import { colors } from "@/theme/sharedColors";

export const cardStyles = {
  p: 2.2,
  borderRadius: "16px",
  bgcolor: colors.cardBg,
  border: `1px solid ${colors.cardBorder}`,
  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)",
  transition: "all 0.18s ease",
  "&:hover": {
    boxShadow: "0 16px 36px rgba(15, 23, 42, 0.08)",
  },
} as const;

export const eyebrowStyles = {
  color: colors.muted,
  fontSize: 10.5,
  fontWeight: 850,
  mb: 0.6,
  textTransform: "uppercase",
  letterSpacing: "0.035em",
} as const;

export function buttonStyles(variant: "outlined" | "contained") {
  return {
    borderRadius: 2.25,
    px: 2,
    py: 1.05,
    fontSize: 11.5,
    fontWeight: 900,
    textTransform: "none",
    ...(variant === "contained"
      ? {
          bgcolor: colors.primary,
          color: colors.cardBg,
          boxShadow: "0 12px 24px rgba(18, 63, 99, 0.22)",
          "&:hover": { bgcolor: colors.primary },
        }
      : {
          color: colors.primary,
          borderColor: colors.cardBorder,
          bgcolor: colors.cardBg,
          "&:hover": {
            borderColor: colors.primary,
            bgcolor: colors.primarySoft,
          },
        }),
  };
}
