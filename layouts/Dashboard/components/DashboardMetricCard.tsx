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
    <Card
      elevation={0}
      sx={{
        ...cardStyles,
        position: "relative",
        overflow: "hidden",
        p: { xs: 1.8, md: 2.1 },
        borderTop: `2px solid ${alpha(accent, 0.72)}`,
        "&:hover": {
          ...cardStyles["&:hover"],
          transform: "translateY(-2px)",
          borderColor: alpha(accent, 0.48),
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 1.45,
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
            maxWidth: "68%",
            "& .MuiChip-label": { px: 1 },
          }}
        />
      </Box>

      <Typography sx={eyebrowStyles}>{label}</Typography>
      <Typography
        sx={{
          color: colors.text,
          fontSize: { xs: 20, md: 22 },
          fontWeight: 950,
          lineHeight: 1.15,
          letterSpacing: "-0.025em",
          fontVariantNumeric: "tabular-nums",
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </Typography>
      <Box
        sx={{
          mt: 1.1,
          height: 3,
          width: 38,
          borderRadius: 2,
          bgcolor: alpha(accent, 0.45),
        }}
      />
    </Card>
  );
}
