"use client";

import { alpha, Avatar, Box, IconButton, Typography } from "@mui/material";
import { FaBars } from "react-icons/fa";

import { colors } from "@/theme/sharedColors";

type MobileTopbarProps = {
  onOpenMenu: () => void;
};

export function MobileTopbar({ onOpenMenu }: Readonly<MobileTopbarProps>) {
  return (
    <Box
      component="header"
      sx={{
        width: "100%",
        display: {
          xs: "flex",
          lg: "none",
        },
        position: "fixed",
        top: 0,
        zIndex: 20,
        minHeight: 64,
        px: 1.5,
        py: 1.2,
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1.5,
        bgcolor: alpha(colors.cardBg, 0.94),
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${colors.cardBorder}`,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          size="small"
          onClick={onOpenMenu}
          sx={{
            width: 40,
            height: 40,
            borderRadius: "14px",
            border: `1px solid ${colors.cardBorder}`,
            bgcolor: colors.cardBg,
            color: colors.primary,
          }}
        >
          <FaBars size={15} />
        </IconButton>

        <Box>
          <Typography
            sx={{
              color: colors.primary,
              fontSize: 16,
              fontWeight: 950,
              lineHeight: 1,
            }}
          >
            AssetHub
          </Typography>

          <Typography
            sx={{
              color: colors.muted,
              fontSize: 10.5,
              fontWeight: 700,
              mt: 0.35,
            }}
          >
            Business Suite
          </Typography>
        </Box>
      </Box>

      <Avatar
        sx={{
          width: 34,
          height: 34,
          bgcolor: colors.primary,
          color: colors.cardBg,
          fontSize: 12,
          fontWeight: 900,
        }}
      >
        AU
      </Avatar>
    </Box>
  );
}
