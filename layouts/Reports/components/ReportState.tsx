"use client";

import { Box, Button, Typography } from "@mui/material";

import { FaExclamationTriangle } from "react-icons/fa";

import { LoadingState } from "@/components/LoadingState";

import { colors } from "@/theme/sharedColors";

function StateCard({
  children,
  borderColor = colors.cardBorder,
}: Readonly<{
  children: React.ReactNode;
  borderColor?: string;
}>) {
  return (
    <Box
      sx={{
        minHeight: 220,
        display: "grid",
        placeItems: "center",
        px: 2,
        py: 3,
        bgcolor: colors.cardBg,
        border: `1px solid ${borderColor}`,
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.04)",
      }}
    >
      {children}
    </Box>
  );
}

export function ReportLoadingState({
  message = "Cargando reporte...",
}: Readonly<{ message?: string }>) {
  return (
    <StateCard>
      <LoadingState message={message} />
    </StateCard>
  );
}

export function ReportErrorState({
  title = "No se pudo cargar el reporte",
  description = "Hubo un problema al consultar la información. Inténtalo de nuevo.",
  onRetry,
}: Readonly<{
  title?: string;
  description?: string;
  onRetry?: () => void;
}>) {
  return (
    <StateCard borderColor={colors.dangerBorder}>
      <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            mb: 1.5,
            borderRadius: "14px",
            display: "grid",
            placeItems: "center",
            bgcolor: colors.dangerSoft,
            color: colors.danger,
          }}
        >
          <FaExclamationTriangle size={18} />
        </Box>

        <Typography
          sx={{
            color: colors.text,
            fontSize: 14,
            fontWeight: 900,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            color: colors.muted,
            fontSize: 12,
            fontWeight: 600,
            maxWidth: 420,
          }}
        >
          {description}
        </Typography>

        {onRetry && (
          <Button
            type="button"
            onClick={onRetry}
            disableElevation
            sx={{
              mt: 2,
              px: 2,
              py: 1,
              borderRadius: "12px",
              color: colors.primary,
              bgcolor: colors.primarySoft,
              border: `1px solid ${colors.primaryBorder}`,
              fontSize: 12,
              fontWeight: 800,
              textTransform: "none",

              "&:hover": {
                bgcolor: colors.primary,
                color: "#ffffff",
              },
            }}
          >
            Reintentar
          </Button>
        )}
      </Box>
    </StateCard>
  );
}