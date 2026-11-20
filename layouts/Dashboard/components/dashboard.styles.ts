import { colors } from "@/theme/sharedColors";

export const cardStyles = {
  p: { xs: 1.8, md: 2.2 },
  borderRadius: "18px",
  bgcolor: colors.cardBg,
  border: `1px solid ${colors.cardBorder}`,
  boxShadow: "0 7px 22px rgba(15, 36, 66, 0.045)",
  transition: "box-shadow 0.18s ease, transform 0.18s ease, border-color 0.18s ease",
  "&:hover": {
    boxShadow: "0 12px 28px rgba(15, 36, 66, 0.075)",
  },
} as const;

export const eyebrowStyles = {
  color: colors.muted,
  fontSize: 9.5,
  fontWeight: 900,
  mb: 0.55,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
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
