"use client";

import { FaGear } from "react-icons/fa6";

import { Box, Typography } from "@mui/material";

import { BackupSection } from "./components/BackupSection";
import { SystemInformation } from "./components/SystemInformation";
import { contentContainerStyles, headerIconBoxStyles, pageContainerStyles } from "./styles";

export function SettingsWorkspace() {
  return (
    <Box sx={pageContainerStyles}>
      <Box sx={contentContainerStyles}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.25,
          }}
        >
          <Box sx={headerIconBoxStyles}>
            <FaGear size={17} />
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
              Configuración
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
              Ajustes del sistema
            </Typography>
          </Box>
        </Box>

        <BackupSection />

        <SystemInformation />
      </Box>
    </Box>
  );
}