import { colors } from "./sharedColors";

export const sellButtonBaseSx = {
  minHeight: { xs: 36, sm: 38 },
  minWidth: { xs: "100%", sm: 136 },
  px: { xs: 1.5, sm: 1.75 },
  borderRadius: "16px",
  fontSize: { xs: 10, sm: 11 },
  fontWeight: 900,
  lineHeight: 1,
  textTransform: "uppercase",
  letterSpacing: "0.03em",
  whiteSpace: "nowrap",
  boxShadow: "none",
};

export const sellSecondaryButtonSx = {
  ...sellButtonBaseSx,
  border: `1px solid ${colors.primaryBorder}`,
  bgcolor: colors.primarySoft,
  color: colors.primary,
  textTransform: "none",
  "&:hover": {
    bgcolor: colors.primarySoft,
    boxShadow: "none",
  },
};
