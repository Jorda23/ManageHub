"use client";

import { Box, Typography } from "@mui/material";

import { colors } from "@/theme/sharedColors";

export function SidebarHeader() {
  return (
    <Box sx={{ px: 3, py: 3 }}>
      <Typography
        sx={{
          color: colors.primary,
          fontSize: 20,
          fontWeight: 950,
          lineHeight: 1,
        }}
      >
        AssetHub
      </Typography>

      <Typography
        sx={{
          mt: 0.6,
          color: colors.muted,
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        Business Management Suite
      </Typography>
    </Box>
  );
}
