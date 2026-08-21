"use client";

import type { ReactNode } from "react";

import { Box, Chip, Paper, Typography } from "@mui/material";

import { FaTools } from "react-icons/fa";

type HardwareWorkspaceHeroProps = {
  badge: string;
  title: string;
  subtitle: string;
  icon?: ReactNode;
};

export function HardwareWorkspaceHero({
  badge,
  title,
  subtitle,
  icon = <FaTools />,
}: HardwareWorkspaceHeroProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        p: {
          xs: 2,
          sm: 2.5,
          md: 3,
        },
        borderRadius: "16px",
        color: "#ffffff",
        background: "linear-gradient(135deg, #78350f 0%, #f59e0b 55%, #0891b2 100%)",
        minHeight: {
          xs: 130,
          md: 118,
        },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: "100%",
          minWidth: 0,
        }}
      >
        <Chip
          label={badge}
          size="small"
          sx={{
            mb: 1.25,
            bgcolor: "rgba(255,255,255,0.18)",
            color: "#fff7ed",
            fontWeight: 900,
            fontSize: 11,
          }}
        />

        <Typography
          sx={{
            fontSize: {
              xs: 22,
              sm: 26,
              md: 34,
            },
            lineHeight: 1.1,
            fontWeight: 950,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            mt: 0.75,
            maxWidth: 760,
            color: "#fff7ed",
            fontSize: {
              xs: 12.5,
              sm: 14,
            },
            lineHeight: 1.45,
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          right: {
            xs: -28,
            md: 48,
          },
          bottom: {
            xs: -26,
            md: -34,
          },
          color: "rgba(255,255,255,0.15)",
          fontSize: {
            xs: 94,
            md: 150,
          },
          transform: "rotate(-8deg)",
        }}
      >
        {icon}
      </Box>
    </Paper>
  );
}
