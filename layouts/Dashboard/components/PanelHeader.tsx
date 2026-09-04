"use client";

import { Box, Button, Typography } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";

import type { PanelHeaderProps } from "@/shared/types/dashboard.types";
import { colors } from "@/theme/sharedColors";
import { IconBadge } from "./IconBadge";

export function PanelHeader({
  icon: Icon,
  accent,
  title,
  subtitle,
  action,
  href,
}: PanelHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 2,
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 1.25, minWidth: 0 }}>
        <IconBadge accent={accent} compact>
          <Icon size={14} />
        </IconBadge>

        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ color: colors.text, fontSize: 16, fontWeight: 950 }}>
            {title}
          </Typography>
          <Typography sx={{ mt: 0.25, color: colors.muted, fontSize: 11.5, fontWeight: 600 }}>
            {subtitle}
          </Typography>
        </Box>
      </Box>

      {action && (
        <Button
          href={href ?? undefined}
          size="small"
          endIcon={<FaArrowRight size={10} />}
          sx={{
            color: colors.primary,
            fontSize: 10.5,
            fontWeight: 900,
            textTransform: "none",
            whiteSpace: "nowrap",
          }}
        >
          {action}
        </Button>
      )}
    </Box>
  );
}
