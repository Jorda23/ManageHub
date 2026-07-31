
"use client";

import {
  FaLeaf,
} from "react-icons/fa";

import {
  Box,
  Chip,
  Paper,
  Typography,
} from "@mui/material";
import { grainsConfig } from "../GrainsWorkspace";

export function HeroHeader() {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        p: {
          xs: 2.5,
          md: 3,
        },
        borderRadius: "16px",
        color: "#ffffff",
        background:
          "linear-gradient(135deg, #064e3b 0%, #14532d 58%, #1f6f4a 100%)",
        minHeight: 116,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          minWidth: 0,
        }}
      >
        <Chip
          label={grainsConfig.badge}
          size="small"
          sx={{
            mb: 1.25,
            bgcolor: "rgba(255,255,255,0.15)",
            color: "#d1fae5",
            fontWeight: 900,
            fontSize: 11,
          }}
        />

        <Typography
          sx={{
            fontSize: {
              xs: 22,
              sm: 26,
            },
            fontWeight: 950,
            lineHeight: 1.1,
          }}
        >
          {grainsConfig.title}
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            maxWidth: 760,
            color: "#d1fae5",
            fontSize: {
              xs: 12,
              sm: 14,
            },
            lineHeight: 1.5,
          }}
        >
          {grainsConfig.subtitle}
        </Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          right: {
            xs: -16,
            md: 50,
          },
          bottom: -30,
          color: "rgba(255,255,255,0.11)",
          fontSize: {
            xs: 110,
            md: 150,
          },
          transform: "rotate(-8deg)",
        }}
      >
        <FaLeaf />
      </Box>
    </Paper>
  );
}
