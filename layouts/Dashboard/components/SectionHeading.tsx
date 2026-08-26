"use client";

import { Box, Typography } from "@mui/material";

import { colors } from "@/theme/sharedColors";

export function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Box sx={{ mb: 1.5 }}>
      <Typography
        sx={{
          color: colors.text,
          fontSize: { xs: 17, md: 19 },
          fontWeight: 950,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          mt: 0.35,
          color: colors.muted,
          fontSize: 12.5,
          fontWeight: 600,
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}
