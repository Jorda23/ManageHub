"use client";

import type { ReactNode } from "react";

import { FaDatabase, FaInfoCircle } from "react-icons/fa";

import { Box, CircularProgress, Divider, Typography } from "@mui/material";

import { SectionCard } from "@/components";
import { colors } from "@/theme/sharedColors";

import { useSystemInfo } from "../hooks/useSystemInfo";

function InfoRow({ label, children }: Readonly<{ label: string; children: ReactNode }>) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        py: 1.15,
      }}
    >
      <Typography
        sx={{
          color: colors.muted,
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        {label}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          textAlign: "right",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

function DatabaseBadge({ connected }: Readonly<{ connected: boolean }>) {
  const isConnected = connected;

  return (
    <Box
      role="status"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.6,
        borderRadius: "999px",
        px: 1.1,
        py: 0.45,
        fontSize: 11,
        fontWeight: 800,
        whiteSpace: "nowrap",
        bgcolor: isConnected ? colors.greenSoft : colors.dangerSoft,
        color: isConnected ? colors.green : colors.danger,
        border: `1px solid ${isConnected ? colors.greenBorder : colors.dangerBorder}`,
      }}
    >
      <FaDatabase size={10} />
      {isConnected ? "Conectada" : "Desconectada"}
    </Box>
  );
}

export function SystemInformation() {
  const { data, isLoading, isError } = useSystemInfo();

  return (
    <SectionCard>
      <Box
        sx={{
          p: {
            xs: 2,
            md: 2.5,
          },
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1.25,
          }}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              flexShrink: 0,
              borderRadius: "10px",
              display: "grid",
              placeItems: "center",
              bgcolor: colors.primarySoft,
              color: colors.primaryLight,
            }}
          >
            <FaInfoCircle size={15} />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                color: colors.text,
                fontSize: 14,
                lineHeight: 1.2,
                fontWeight: 850,
              }}
            >
              Información del sistema
            </Typography>

            <Typography
              sx={{
                mt: 0.3,
                color: colors.muted,
                fontSize: 11,
                fontWeight: 500,
              }}
            >
              Detalles sobre la aplicación.
            </Typography>
          </Box>
        </Box>

        <Divider />

        {isLoading ? (
          <Box
            sx={{
              display: "grid",
              placeItems: "center",
              py: 3,
            }}
          >
            <CircularProgress size={24} thickness={4} aria-label="Cargando información del sistema" />
          </Box>
        ) : isError || !data ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
              py: 3,
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                color: colors.text,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              No disponible
            </Typography>

            <Typography
              sx={{
                color: colors.muted,
                fontSize: 11,
                fontWeight: 500,
              }}
            >
              No se pudo obtener la información del sistema.
            </Typography>
          </Box>
        ) : (
          <Box>
            <InfoRow label="Aplicación">
              <Typography sx={{ color: colors.text, fontSize: 13, fontWeight: 700 }}>
                {data.application}
              </Typography>
            </InfoRow>

            <Divider />

            <InfoRow label="Versión">
              <Typography sx={{ color: colors.text, fontSize: 13, fontWeight: 700 }}>
                {data.version}
              </Typography>
            </InfoRow>

            <Divider />

            <InfoRow label="Base de datos">
              <DatabaseBadge connected={data.databaseConnected} />
            </InfoRow>

            <Divider />

            <InfoRow label="Módulos">
              <Typography
                sx={{
                  color: colors.text,
                  fontSize: 13,
                  fontWeight: 700,
                  maxWidth: { xs: 180, sm: 260 },
                }}
              >
                {data.modules.join(", ")}
              </Typography>
            </InfoRow>
          </Box>
        )}
      </Box>
    </SectionCard>
  );
}