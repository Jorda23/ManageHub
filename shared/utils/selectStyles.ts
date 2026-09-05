import type { SxProps, Theme } from "@mui/material/styles";

import { colors } from "@/theme/sharedColors";

export const selectMenuSx: SxProps<Theme> = {
  mt: 0.75,

  maxHeight: 280,

  overflowY: "auto",

  borderRadius: "10px",

  bgcolor: "#ffffff",

  border: `1px solid ${colors.cardBorder}`,

  boxShadow: "0 14px 34px rgba(15, 23, 42, 0.16)",

  "& .MuiMenuItem-root": {
    minHeight: 42,

    color: colors.text,

    fontSize: 13,

    fontWeight: 600,

    "&:hover": {
      bgcolor: "#f0fdf4",
    },

    "&.Mui-selected": {
      bgcolor: colors.primarySoft,

      color: colors.primary,

      "&:hover": {
        bgcolor: "#bbf7d0",
      },
    },
  },
};

export const selectChevronSx: SxProps<Theme> = {
  "& .MuiSvgIcon-root": {
    color: colors.muted,
  },
};
