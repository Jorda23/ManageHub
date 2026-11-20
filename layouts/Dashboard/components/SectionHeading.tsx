"use client";

import { Box, Typography } from "@mui/material";

import { colors } from "@/theme/sharedColors";

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle: string;
  eyebrow?: string;
}) {
  return (
    <Box sx={{ mb: { xs: 1.25, md: 1.5 } }}>
      {eyebrow && (
        <Typography
          sx={{
            mb: 0.45,
            color: colors.primaryLight,
            fontSize: 9,
            fontWeight: 900,
            letterSpacing: ".12em",
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </Typography>
      )}
      <Typography
        sx={{
          color: colors.text,
          fontSize: { xs: 18, md: 20 },
          fontWeight: 950,
          letterSpacing: "-.025em",
          lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          mt: 0.45,
          color: colors.muted,
          fontSize: { xs: 11.5, md: 12 },
          fontWeight: 600,
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}
