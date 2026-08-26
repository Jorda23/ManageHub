"use client";

import { FaHistory } from "react-icons/fa";

import { Box, Typography } from "@mui/material";

import { History } from "@/components/History";

export function HistoryWorkspace() {
  return (
    <Box
      sx={{
        width: "100%",
        px: {
          xs: 2,
          md: 4,
        },
        py: {
          xs: 2.5,
          md: 3,
        },
      }}
    >
      <Box
        sx={{
          mb: {
            xs: 2,
            md: 2.5,
          },
          display: "flex",
          alignItems: "center",
          gap: 1.25,
        }}
      >
        <Box
          sx={{
            width: {
              xs: 38,
              md: 42,
            },
            height: {
              xs: 38,
              md: 42,
            },
            borderRadius: 2.5,
            display: "grid",
            placeItems: "center",
            bgcolor: "#eef4ff",
            color: "#315ccf",
            flexShrink: 0,
          }}
        >
          <FaHistory size={17} />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              color: "#172033",
              fontSize: {
                xs: 18,
                md: 20,
              },
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Historial
          </Typography>

          <Typography
            sx={{
              mt: 0.35,
              color: "#64748b",
              fontSize: {
                xs: 11.5,
                md: 12,
              },
              fontWeight: 500,
            }}
          >
            Consulta y filtra todas las operaciones realizadas.
          </Typography>
        </Box>
      </Box>

      <History />
    </Box>
  );
}
