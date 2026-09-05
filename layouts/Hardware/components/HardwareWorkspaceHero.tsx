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
}: Readonly<HardwareWorkspaceHeroProps>) {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        px: {
          xs: 1.75,
          sm: 2.25,
          md: 2.75,
        },
        py: {
          xs: 1.5,
          sm: 1.75,
          md: 2,
        },
        borderRadius: {
          xs: "14px",
          md: "16px",
        },
        border: "1px solid rgba(255, 237, 213, 0.34)",
        boxShadow: "0 10px 24px rgba(120, 53, 15, 0.13)",
        color: "#ffffff",
        background: "linear-gradient(135deg, #78350f 0%, #f59e0b 58%, #0891b2 100%)",
        minHeight: {
          xs: 104,
          sm: 108,
          md: 112,
        },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          minWidth: 0,
          pr: {
            xs: 5,
            sm: 10,
            md: 16,
          },
        }}
      >
        <Chip
          label={badge}
          size="small"
          sx={{
            height: 22,
            mb: 0.75,
            bgcolor: "rgba(255,255,255,0.16)",
            color: "#fff7ed",
            fontWeight: 800,
            fontSize: 10,
            "& .MuiChip-label": {
              px: 1,
            },
          }}
        />

        <Typography
          sx={{
            fontSize: {
              xs: 20,
              sm: 23,
              md: 28,
            },
            lineHeight: 1.12,
            fontWeight: 900,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            maxWidth: 720,
            color: "rgba(255, 247, 237, 0.92)",
            fontSize: {
              xs: 11.5,
              sm: 12.5,
              md: 13,
            },
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          right: {
            xs: -18,
            sm: 12,
            md: 32,
          },
          bottom: {
            xs: -18,
            sm: -26,
            md: -30,
          },
          color: "rgba(255,255,255,0.11)",
          fontSize: {
            xs: 78,
            sm: 100,
            md: 118,
          },
          lineHeight: 0,
          transform: "rotate(-7deg)",
          pointerEvents: "none",
        }}
      >
        {icon}
      </Box>
    </Paper>
  );
}
