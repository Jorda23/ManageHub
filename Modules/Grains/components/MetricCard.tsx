"use client";

import { type ReactNode } from "react";

import { Box, Card, Typography } from "@mui/material";
import { colors } from "../GrainsWorkspace";

type MetricCardProps = {
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  detail: string;
};

export function MetricCard({ icon, iconBg, iconColor, label, value, detail }: MetricCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        border: `1px solid ${colors.cardBorder}`,
        bgcolor: colors.cardBg,
        boxShadow: "0 8px 22px rgba(15, 23, 42, 0.05)",
      }}
    >
      <Box sx={{ p: 2.25 }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "16px",
              display: "grid",
              placeItems: "center",
              bgcolor: iconBg,
              color: iconColor,
              fontSize: 19,
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                color: colors.text,
                fontSize: 11,
                fontWeight: 900,
                textTransform: "uppercase",
              }}
            >
              {label}
            </Typography>

            <Typography
              sx={{
                mt: 0.25,
                color: colors.text,
                fontSize: 18,
                fontWeight: 950,
                overflowWrap: "anywhere",
              }}
            >
              {value}
            </Typography>

            <Typography
              sx={{
                color: colors.muted,
                fontSize: 12,
              }}
            >
              {detail}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
