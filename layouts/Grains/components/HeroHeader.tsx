"use client";

import { FaLeaf } from "react-icons/fa";

import { Box, Chip, Paper, Typography } from "@mui/material";

import { grainsConfig } from "@/shared";

export function HeroHeader() {
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
        border: "1px solid rgba(187, 247, 208, 0.28)",
        boxShadow: "0 10px 24px rgba(6, 78, 59, 0.13)",
        color: "#ffffff",
        background: "linear-gradient(135deg, #064e3b 0%, #14532d 58%, #1f6f4a 100%)",
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
          label={grainsConfig.badge}
          size="small"
          sx={{
            height: 22,
            mb: 0.75,
            bgcolor: "rgba(255,255,255,0.14)",
            color: "#d1fae5",
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
            fontWeight: 900,
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
          }}
        >
          {grainsConfig.title}
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            maxWidth: 720,
            color: "rgba(209, 250, 229, 0.92)",
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
          {grainsConfig.subtitle}
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
          color: "rgba(255,255,255,0.1)",
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
        <FaLeaf />
      </Box>
    </Paper>
  );
}
