"use client";

import type { ReactNode } from "react";
import { alpha, Box } from "@mui/material";

export function IconBadge({
  accent,
  compact = false,
  children,
}: {
  accent: string;
  compact?: boolean;
  children: ReactNode;
}) {
  return (
    <Box
      sx={{
        width: compact ? 36 : 44,
        height: compact ? 36 : 44,
        borderRadius: "14px",
        display: "grid",
        placeItems: "center",
        bgcolor: alpha(accent, 0.12),
        color: accent,
        flexShrink: 0,
      }}
    >
      {children}
    </Box>
  );
}
