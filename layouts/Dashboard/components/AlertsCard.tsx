"use client";

import Link from "next/link";

import {
  alpha,
  Box,
  Card,
  Divider,
  Typography,
} from "@mui/material";

import {
  FaArrowRight,
  FaExclamationTriangle,
} from "react-icons/fa";

import type {
  AlertsCardProps,
  AlertItem,
} from "@/shared/types/dashboard.types";

import { colors } from "@/theme/sharedColors";

import { cardStyles } from "./dashboard.styles";

import { PanelHeader } from "./PanelHeader";

export function AlertsCard({
  alerts,
}: AlertsCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        ...cardStyles,
        p: { xs: 2, md: 2.5 },
      }}
    >
      <PanelHeader
        icon={FaExclamationTriangle}
        accent={colors.danger}
        title="Alertas y pendientes"
        subtitle="Situaciones que requieren seguimiento"
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxHeight: 320,
          overflowY: "auto",
          pr: 0.75,

          scrollbarWidth: "thin",
          scrollbarColor: `${colors.cardBorder} transparent`,

          "&::-webkit-scrollbar": {
            width: 6,
          },

          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: colors.cardBorder,
            borderRadius: 999,
          },

          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: colors.muted,
          },
        }}
      >
        {alerts.length > 0 ? (
          alerts.map((alert, index) => {
            const accent = alertToneColor(alert);

            return (
              <Box key={alert.title}>
                <Link
                  href={alert.href}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.4,
                      py: 1.55,
                      borderRadius: 2,
                      transition: "0.18s ease",

                      "&:hover": {
                        bgcolor: alpha(
                          accent,
                          0.05,
                        ),
                        px: 1,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 9,
                        height: 9,
                        mt: 0.65,
                        borderRadius: "50%",
                        bgcolor: accent,
                        boxShadow: `0 0 0 5px ${alpha(
                          accent,
                          0.1,
                        )}`,
                        flexShrink: 0,
                      }}
                    />

                    <Box
                      sx={{
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <Typography
                        sx={{
                          color: colors.text,
                          fontSize: 12.5,
                          fontWeight: 900,
                        }}
                      >
                        {alert.title}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.35,
                          color: colors.muted,
                          fontSize: 11.5,
                          fontWeight: 600,
                        }}
                      >
                        {alert.detail}
                      </Typography>
                    </Box>

                    <FaArrowRight
                      size={11}
                      color={colors.muted}
                    />
                  </Box>
                </Link>

                {index <
                  alerts.length - 1 && (
                  <Divider
                    sx={{
                      borderColor:
                        colors.cardBorder,
                    }}
                  />
                )}
              </Box>
            );
          })
        ) : (
          <Box
            sx={{
              py: 2,
              color: colors.muted,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            No hay alertas activas.
          </Box>
        )}
      </Box>
    </Card>
  );
}

function alertToneColor(
  alert: AlertItem,
) {
  return alert.tone === "danger"
    ? colors.danger
    : alert.tone === "warning"
      ? colors.orange
      : colors.primaryLight;
}