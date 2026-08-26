"use client";

import { alpha, Box, Card, Chip, Typography } from "@mui/material";
import { FaHome } from "react-icons/fa";

import { colors } from "@/theme/sharedColors";

export function DashboardHero() {
  const formattedDate = new Intl.DateTimeFormat("es-NI", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <Card
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "16px",
        p: { xs: 2.25, md: 3 },
        bgcolor: colors.cardBg,
        border: `1px solid ${colors.cardBorder}`,
        boxShadow: "0 18px 45px rgba(15, 23, 42, 0.07)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          right: -80,
          top: -100,
          width: 280,
          height: 280,
          borderRadius: "50%",
          bgcolor: alpha(colors.primary, 0.08),
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          right: 60,
          bottom: -110,
          width: 220,
          height: 220,
          borderRadius: "50%",
          bgcolor: alpha(colors.primaryLight, 0.08),
          display: { xs: "none", lg: "block" },
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) auto" },
          gap: 2.5,
          alignItems: "center",
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Chip
            icon={<FaHome size={11} />}
            label="AssetHub Control Center"
            size="small"
            sx={{
              mb: 1.3,
              height: 25,
              borderRadius: "16px",
              bgcolor: colors.primarySoft,
              color: colors.primary,
              fontSize: 11,
              fontWeight: 900,
            }}
          />

          <Typography
            sx={{
              color: colors.text,
              fontSize: { xs: 28, sm: 32, md: 38 },
              fontWeight: 950,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
            }}
          >
            Bienvenido, Administrador
          </Typography>

          <Typography
            sx={{
              mt: 0.9,
              color: colors.muted,
              fontSize: { xs: 13, md: 14 },
              fontWeight: 600,
              lineHeight: 1.55,
              maxWidth: 720,
              textTransform: "capitalize",
            }}
          >
            {formattedDate}. Consulta el estado general de ventas, inventarios, propiedades y
            proximos compromisos.
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
