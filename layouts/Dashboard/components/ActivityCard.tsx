"use client";

import { Box, Card, Divider, Typography } from "@mui/material";
import { FaReceipt } from "react-icons/fa";

import type { ActivityCardProps } from "@/shared/types/dashboard.types";
import { colors } from "@/theme/sharedColors";
import { cardStyles } from "./dashboard.styles";
import { IconBadge } from "./IconBadge";
import { PanelHeader } from "./PanelHeader";

export function ActivityCard({ activities }: ActivityCardProps) {
  return (
    <Card elevation={0} sx={{ ...cardStyles, p: { xs: 2, md: 2.5 } }}>
      <PanelHeader
        icon={FaReceipt}
        accent={colors.green}
        title="Actividad reciente"
        subtitle="Ultimos movimientos realizados en todos los modulos"
        action="Ver historial"
        href="/history"
      />

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {activities.length > 0 ? (
          activities.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <Box key={`${activity.title}-${activity.time}-${index}`}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1.45 }}>
                  <IconBadge accent={activity.accent} compact>
                    <Icon size={13} />
                  </IconBadge>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ color: colors.text, fontSize: 12.5, fontWeight: 900 }}>
                      {activity.title}
                    </Typography>
                    <Typography
                      sx={{
                        mt: 0.25,
                        color: colors.muted,
                        fontSize: 11.3,
                        fontWeight: 600,
                      }}
                    >
                      {activity.subtitle}
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                    {activity.amount && (
                      <Typography sx={{ color: colors.green, fontSize: 12.5, fontWeight: 950 }}>
                        {activity.amount}
                      </Typography>
                    )}

                    <Typography
                      sx={{
                        mt: 0.2,
                        color: colors.muted,
                        fontSize: 10.5,
                        fontWeight: 700,
                      }}
                    >
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>

                {index < activities.length - 1 && (
                  <Divider sx={{ borderColor: colors.cardBorder }} />
                )}
              </Box>
            );
          })
        ) : (
          <Box sx={{ py: 2, color: colors.muted, fontSize: 12, fontWeight: 600 }}>
            No hay actividad reciente.
          </Box>
        )}
      </Box>
    </Card>
  );
}
