"use client";

import { Box, Card, Typography } from "@mui/material";
import { FaChartLine } from "react-icons/fa";

import type {
  CashFlowCardProps,
  ChartBarProps,
  LegendDotProps,
  MiniValueProps,
} from "@/shared/types/dashboard.types";
import { colors } from "@/theme/sharedColors";
import { formatCurrency } from "@/shared";
import { getBestDayLabel } from "../utils/dashboardView";
import { cardStyles } from "./dashboard.styles";
import { PanelHeader } from "./PanelHeader";

type Props = CashFlowCardProps;

export function CashFlowCard({ cashFlow }: Props) {
  const totalIncome = cashFlow.reduce((sum, item) => sum + item.total, 0);
  const averageIncome = cashFlow.length > 0 ? totalIncome / cashFlow.length : 0;
  const bestDay = getBestDayLabel(cashFlow);

  return (
    <Card elevation={0} sx={{ ...cardStyles, p: { xs: 2, md: 2.5 } }}>
      <PanelHeader
        icon={FaChartLine}
        accent={colors.primaryLight}
        title="Flujo de caja - ultimos 7 dias"
        subtitle="Comparacion diaria por linea de negocio"
        action="Ver detalle"
      />

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2.5 }}>
        <LegendDot label="Ferreteria" accent={colors.orange} />
        <LegendDot label="Granos" accent={colors.green} />
        <LegendDot label="Terrenos" accent={colors.primaryLight} />
      </Box>

      <Box
        sx={{
          height: 220,
          display: "grid",
          gridTemplateColumns: `repeat(${Math.max(cashFlow.length, 1)}, minmax(34px, 1fr))`,
          alignItems: "end",
          gap: { xs: 0.7, sm: 1.2 },
          borderBottom: `1px solid ${colors.cardBorder}`,
          pb: 1,
        }}
      >
        {cashFlow.length > 0 ? (
          cashFlow.map((item, index) => (
            <Box
              key={`${item.day}-${index}`}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 0.7,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 58,
                  height: 170,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  gap: "3px",
                }}
              >
                <ChartBar value={item.hardware} accent={colors.orange} />
                <ChartBar value={item.grains} accent={colors.green} />
                <ChartBar value={item.property} accent={colors.primaryLight} />
              </Box>

              <Typography
                sx={{
                  color: item.isToday ? colors.primary : colors.muted,
                  fontSize: 10.5,
                  fontWeight: item.isToday ? 900 : 700,
                }}
              >
                {item.day}
              </Typography>
            </Box>
          ))
        ) : (
          <Box
            sx={{
              gridColumn: "1 / -1",
              height: "100%",
              display: "grid",
              placeItems: "center",
              color: colors.muted,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Sin movimientos
          </Box>
        )}
      </Box>

      <Box
        sx={{
          mt: 2,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
          gap: 1.5,
        }}
      >
        <MiniValue label="Ingresos 7 dias" value={formatCurrency(totalIncome)} />
        <MiniValue label="Promedio diario" value={formatCurrency(averageIncome)} />
        <MiniValue label="Mejor dia" value={bestDay} />
      </Box>
    </Card>
  );
}

function ChartBar({ value, accent }: ChartBarProps) {
  return (
    <Box
      sx={{
        width: "24%",
        minWidth: 5,
        height: `${value}%`,
        minHeight: 8,
        borderRadius: "5px 5px 2px 2px",
        bgcolor: accent,
        opacity: 0.9,
      }}
    />
  );
}

function LegendDot({ label, accent }: LegendDotProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
      <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: accent }} />
      <Typography sx={{ color: colors.muted, fontSize: 10.8, fontWeight: 700 }}>{label}</Typography>
    </Box>
  );
}

function MiniValue({ label, value }: MiniValueProps) {
  return (
    <Box
      sx={{
        p: 1.3,
        borderRadius: "8px",
        bgcolor: colors.tableHead,
        border: `1px solid ${colors.cardBorder}`,
      }}
    >
      <Typography sx={{ color: colors.muted, fontSize: 9.5, fontWeight: 850 }}>
        {label.toUpperCase()}
      </Typography>
      <Typography sx={{ mt: 0.4, color: colors.text, fontSize: 14, fontWeight: 950 }}>
        {value}
      </Typography>
    </Box>
  );
}
