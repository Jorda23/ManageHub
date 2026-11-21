"use client";

import {
  Box,
  Button,
  Card,
  CircularProgress,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import type { ReactNode } from "react";
import { FaChartLine, FaCalendarWeek } from "react-icons/fa";

import type {
  CashFlowCardProps,
  ChartBarProps,
  LegendDotProps,
  MiniValueProps,
} from "@/shared/types/dashboard.types";
import type { DashboardSalesPeriod } from "@/shared/types/api.types";
import { colors } from "@/theme/sharedColors";
import { formatCurrency } from "@/shared";
import { cardStyles } from "./dashboard.styles";

export function CashFlowCard({
  salesChart,
  period,
  from,
  to,
  isFetching = false,
  error,
  onPeriodChange,
  onFromChange,
  onToChange,
}: CashFlowCardProps) {
  const customRangeValid = Boolean(from && to && from <= to);
  const chartMatchesSelection =
    salesChart?.period === period &&
    (period !== "custom" || (salesChart.from === from && salesChart.to === to));
  const waitingForRange = period === "custom" && !customRangeValid;
  const waitingForChart = !waitingForRange && !chartMatchesSelection && isFetching;
  const chartItems = chartMatchesSelection ? (salesChart?.series ?? []) : [];
  const chartCurrency = salesChart?.currency ?? "NIO";
  const maxTotal = Math.max(...chartItems.map((item) => item.total), 0);
  const totalIncome = chartItems.reduce((sum, item) => sum + item.total, 0);
  const averageIncome = chartItems.length > 0 ? totalIncome / chartItems.length : 0;
  const peak = chartItems.reduce<(typeof chartItems)[number] | undefined>(
    (best, item) => (!best || item.total > best.total ? item : best),
    undefined,
  );
  const totalLabel: Record<DashboardSalesPeriod, string> = {
    day: "Total del día",
    week: "Total de la semana",
    month: "Total del mes",
    custom: "Total del rango",
  };
  const averageLabel: Record<DashboardSalesPeriod, string> = {
    day: "Promedio por hora",
    week: "Promedio diario",
    month: "Promedio semanal",
    custom: "Promedio diario",
  };
  const peakLabel: Record<DashboardSalesPeriod, string> = {
    day: "Hora con más ventas",
    week: "Día con más ventas",
    month: "Semana con más ventas",
    custom: "Día con más ventas",
  };
  const headingSubtitle =
    period === "custom" && customRangeValid
      ? `${from} – ${to}`
      : `Ventas agrupadas por ${period === "day" ? "hora" : period === "week" ? "día" : "semana del mes"}`;

  return (
    <Card elevation={0} sx={{ ...cardStyles, p: { xs: 2, md: 2.5 }, minWidth: 0 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          gap: 1.5,
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, minWidth: 0 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              flexShrink: 0,
              borderRadius: "10px",
              display: "grid",
              placeItems: "center",
              color: colors.primaryLight,
              bgcolor: colors.primarySoft,
            }}
          >
            <FaChartLine size={14} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ color: colors.text, fontSize: 14, fontWeight: 950 }}>
              Ventas por período
            </Typography>
            <Typography sx={{ mt: 0.2, color: colors.muted, fontSize: 10.5, fontWeight: 600 }}>
              {headingSubtitle}
            </Typography>
          </Box>
        </Box>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={period}
          aria-label="Período del gráfico de ventas"
          onChange={(_, value: DashboardSalesPeriod | null) => value && onPeriodChange(value)}
          sx={{
            flexShrink: 0,
            width: { xs: "100%", sm: "auto" },
            p: 0.3,
            bgcolor: "#edf1f6",
            borderRadius: "9px",
            "& .MuiToggleButtonGroup-grouped": { border: 0, borderRadius: "7px !important" },
          }}
        >
          {(["day", "week", "month", "custom"] as const).map((value) => (
            <ToggleButton
              key={value}
              value={value}
              sx={{ ...periodButtonSx, flex: { xs: 1, sm: "initial" } }}
            >
              {value === "day" ? "Día" : value === "week" ? "Semana" : value === "month" ? "Mes" : "Fecha"}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {period === "custom" && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(2, minmax(140px, 190px))" },
            gap: 1,
            mb: 1.5,
          }}
        >
          <TextField
            size="small"
            type="date"
            label="Desde"
            value={from}
            onChange={(event) => onFromChange(event.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
            error={Boolean(from && to && from > to)}
          />
          <TextField
            size="small"
            type="date"
            label="Hasta"
            value={to}
            onChange={(event) => onToChange(event.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
            error={Boolean(from && to && from > to)}
          />
        </Box>
      )}

      <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mb: 1.5 }}>
        <LegendDot label="Granos" accent={colors.green} />
        <LegendDot label="Ferretería" accent={colors.orange} />
        <LegendDot label="Propiedades" accent={colors.primaryLight} />
      </Box>

      <Box sx={{ overflowX: "auto", scrollbarWidth: "thin" }}>
        <Box
          sx={{
            minWidth: chartItems.length > 16 ? `${chartItems.length * 34}px` : "100%",
            height: { xs: 190, md: 205 },
            position: "relative",
            display: "grid",
            gridTemplateColumns: `repeat(${Math.max(chartItems.length, 1)}, minmax(24px, 1fr))`,
            alignItems: "end",
            gap: { xs: 0.7, sm: 1.2 },
            borderBottom: `1px solid ${colors.cardBorder}`,
            backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent calc(25% - 1px), ${colors.cardBorder} 25%)`,
            pb: 1,
          }}
        >
          {waitingForRange ? (
            <ChartMessage>Selecciona las fechas inicial y final del rango.</ChartMessage>
          ) : waitingForChart ? (
            <ChartMessage>
              <CircularProgress size={18} />
            </ChartMessage>
          ) : period === "custom" && from && to && from > to ? (
            <ChartMessage>La fecha inicial debe ser anterior o igual a la fecha final.</ChartMessage>
          ) : error ? (
            <ChartMessage>No se pudieron cargar las ventas para este período.</ChartMessage>
          ) : !chartMatchesSelection ? (
            <ChartMessage>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                <Typography sx={{ color: colors.muted, fontSize: 12, textAlign: "center" }}>
                  {period === "week"
                    ? "El servidor no devolvió datos para el gráfico semanal."
                    : "La respuesta del servidor no incluye salesChart para este período."}
                </Typography>
                {period !== "week" && (
                  <Button
                    size="small"
                    startIcon={<FaCalendarWeek size={12} />}
                    onClick={() => onPeriodChange("week")}
                    sx={{ color: colors.primary, textTransform: "none", fontWeight: 800 }}
                  >
                    Ver semana disponible
                  </Button>
                )}
              </Box>
            </ChartMessage>
          ) : chartItems.length > 0 ? (
            chartItems.map((item) => (
              <Box
                key={item.bucket}
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
                  aria-label={`${item.label}: ${formatCurrency(item.total, chartCurrency)}`}
                  sx={{
                    width: "100%",
                    maxWidth: 58,
                    height: { xs: 145, md: 158 },
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    gap: "3px",
                  }}
                >
                  <ChartBar
                    value={maxTotal ? (item.hardware / maxTotal) * 100 : 0}
                    accent={colors.orange}
                    title={`Ferretería: ${formatCurrency(item.hardware, chartCurrency)}`}
                  />
                  <ChartBar
                    value={maxTotal ? (item.grains / maxTotal) * 100 : 0}
                    accent={colors.green}
                    title={`Granos: ${formatCurrency(item.grains, chartCurrency)}`}
                  />
                  <ChartBar
                    value={maxTotal ? (item.properties / maxTotal) * 100 : 0}
                    accent={colors.primaryLight}
                    title={`Propiedades: ${formatCurrency(item.properties, chartCurrency)}`}
                  />
                </Box>

                <Typography
                  sx={{
                    color: colors.muted,
                    fontSize: chartItems.length > 16 ? 8 : 10.5,
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            ))
          ) : (
            <ChartMessage>Sin movimientos</ChartMessage>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          mt: 2,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
          gap: 1,
        }}
      >
        <MiniValue
          label={totalLabel[period]}
          value={chartMatchesSelection ? formatCurrency(totalIncome, chartCurrency) : "—"}
        />
        <MiniValue
          label={averageLabel[period]}
          value={chartMatchesSelection ? formatCurrency(averageIncome, chartCurrency) : "—"}
        />
        <MiniValue
          label={peakLabel[period]}
          value={chartMatchesSelection ? (peak?.total ? peak.label : "Sin datos") : "—"}
        />
      </Box>
    </Card>
  );
}

function ChartMessage({ children }: { children: ReactNode }) {
  return (
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
      {children}
    </Box>
  );
}

function ChartBar({ value, accent, title }: ChartBarProps) {
  return (
    <Box
      title={title}
      aria-label={title}
      sx={{
        width: "min(9px, 28%)",
        minWidth: 4,
        height: `${value}%`,
        minHeight: value > 0 ? 4 : 0,
        borderRadius: "4px 4px 1px 1px",
        bgcolor: accent,
        opacity: 0.9,
      }}
    />
  );
}

const periodButtonSx = {
  px: { xs: 0.75, sm: 1.1 },
  py: 0.65,
  color: colors.muted,
  fontSize: 9.5,
  fontWeight: 800,
  textTransform: "none",
  "&.Mui-selected": {
    color: colors.primary,
    bgcolor: colors.cardBg,
    boxShadow: "0 2px 7px rgba(15, 36, 66, 0.08)",
    "&:hover": { bgcolor: colors.cardBg },
  },
} as const;

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
