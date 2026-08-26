"use client";

import { Box, Card, Typography } from "@mui/material";

import { colors } from "@/theme/sharedColors";
import { cardStyles } from "./dashboard.styles";

export function StatusScreen({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "grid",
        placeItems: "center",
        bgcolor: colors.pageBg,
        px: 2,
      }}
    >
      <Card elevation={0} sx={{ ...cardStyles, px: 3, py: 2.5, textAlign: "center" }}>
        <Typography sx={{ color: colors.text, fontSize: 16, fontWeight: 900 }}>{title}</Typography>
        <Typography
          sx={{
            mt: 0.5,
            color: colors.muted,
            fontSize: 12.5,
            fontWeight: 600,
          }}
        >
          {subtitle}
        </Typography>
      </Card>
    </Box>
  );
}
