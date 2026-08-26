"use client";

import { alpha, Box, Card, Chip, Typography } from "@mui/material";

import type { MetricCard } from "@/shared/types/dashboard.types";
import { colors } from "@/theme/sharedColors";
import { cardStyles, eyebrowStyles } from "./dashboard.styles";
import { IconBadge } from "./IconBadge";

export function DashboardMetricCard({
  label,
  value,
  detail,
  icon: Icon,
  accent,
  tone,
}: MetricCard) {
  const detailColor =
    tone === "success"
      ? colors.green
      : tone === "danger"
        ? colors.danger
        : tone === "warning"
          ? colors.orange
          : colors.primaryLight;

  return (
    <Card elevation={0} sx={cardStyles}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 2,
          mb: 1.8,
        }}
      >
        <IconBadge accent={accent}>
          <Icon size={18} />
        </IconBadge>

        <Chip
          label={detail}
          size="small"
          sx={{
            height: 23,
            borderRadius: 999,
            bgcolor: alpha(detailColor, 0.1),
            color: detailColor,
            fontSize: 10.5,
            fontWeight: 900,
            "& .MuiChip-label": { px: 1 },
          }}
        />
      </Box>

      <Typography sx={eyebrowStyles}>{label}</Typography>
      <Typography
        sx={{
          color: colors.text,
          fontSize: { xs: 21, md: 24 },
          fontWeight: 950,
          lineHeight: 1.15,
        }}
      >
        {value}
      </Typography>
    </Card>
  );
}
