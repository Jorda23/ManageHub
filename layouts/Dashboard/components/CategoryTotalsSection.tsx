"use client";

import { Box, Card, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { FaBuilding, FaStore, FaTractor } from "react-icons/fa";

import type { DashboardCategory, DashboardCategoryKey } from "@/shared/types/api.types";
import { formatCurrency } from "@/shared";
import { colors } from "@/theme/sharedColors";
import { cardStyles, eyebrowStyles } from "./dashboard.styles";
import { IconBadge } from "./IconBadge";

type Period = "month" | "year";

const categoryPresentation: Record<
  DashboardCategoryKey,
  { label: string; icon: typeof FaTractor; accent: string; soft: string }
> = {
  grains: { label: "Granos", icon: FaTractor, accent: colors.green, soft: colors.greenSoft },
  hardware: { label: "Ferretería", icon: FaStore, accent: colors.orange, soft: colors.orangeSoft },
  properties: {
    label: "Propiedades",
    icon: FaBuilding,
    accent: colors.primaryLight,
    soft: colors.primarySoft,
  },
};

export function CategoryTotalsSection({
  categories,
  period,
  onPeriodChange,
}: {
  categories: DashboardCategory[];
  period: Period;
  onPeriodChange: (period: Period) => void;
}) {
  const orderedCategories = (["grains", "hardware", "properties"] as const)
    .map((key) => categories.find((category) => category.category === key))
    .filter((category): category is DashboardCategory => Boolean(category));

  return (
    <Box>
      <Box
        sx={{
          mb: { xs: 1.25, md: 1.5 },
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 1.5,
        }}
      >
        <Box>
          <Typography sx={{ color: colors.text, fontSize: { xs: 18, md: 20 }, fontWeight: 950 }}>
            Totales por categoría
          </Typography>
          <Typography sx={{ mt: 0.45, color: colors.muted, fontSize: 12, fontWeight: 600 }}>
            Consulta ingresos, ventas e inventario de cada línea de negocio.
          </Typography>
        </Box>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={period}
          aria-label="Período de ventas por categoría"
          onChange={(_, value: Period | null) => value && onPeriodChange(value)}
          sx={{
            flexShrink: 0,
            p: 0.35,
            bgcolor: "#edf1f6",
            borderRadius: "10px",
            "& .MuiToggleButtonGroup-grouped": { border: 0, borderRadius: "8px !important" },
          }}
        >
          <ToggleButton value="month" sx={periodButtonSx}>
            Este mes
          </ToggleButton>
          <ToggleButton value="year" sx={periodButtonSx}>
            Este año
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" },
          gap: { xs: 1.5, md: 2 },
        }}
      >
        {orderedCategories.map((category) => {
          const presentation = categoryPresentation[category.category];
          const Icon = presentation.icon;
          return (
            <Card
              key={category.category}
              elevation={0}
              sx={{ ...cardStyles, p: { xs: 1.8, md: 2.1 } }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.6 }}>
                <IconBadge accent={presentation.accent}>
                  <Icon size={17} />
                </IconBadge>
                <Typography sx={{ ...eyebrowStyles, mb: 0, color: presentation.accent }}>
                  {presentation.label}
                </Typography>
              </Box>

              <Typography
                sx={{
                  color: colors.text,
                  fontSize: { xs: 21, md: 23 },
                  fontWeight: 950,
                  lineHeight: 1.15,
                  fontVariantNumeric: "tabular-nums",
                  overflowWrap: "anywhere",
                }}
              >
                {formatCurrency(category.totalValue)}
              </Typography>

              <Box
                sx={{
                  mt: 1.45,
                  pt: 1.25,
                  borderTop: `1px solid ${colors.cardBorder}`,
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: 1,
                }}
              >
                <CategoryStat label={period === "month" ? "Ventas del mes" : "Ventas del año"} value={formatCurrency(category.periodSales)} />
                <CategoryStat
                  label="Inventario"
                  value={`${category.inventoryCount} ${category.inventoryUnit === "assets" ? "activos" : "productos"}`}
                />
              </Box>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}

function CategoryStat({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography sx={{ color: colors.muted, fontSize: 9.5, fontWeight: 700 }}>{label}</Typography>
      <Typography sx={{ mt: 0.55, color: colors.primary, fontSize: 11.5, fontWeight: 900 }}>
        {value}
      </Typography>
    </Box>
  );
}

const periodButtonSx = {
  px: 1.4,
  py: 0.7,
  color: colors.muted,
  fontSize: 10,
  fontWeight: 800,
  textTransform: "none",
  "&.Mui-selected": {
    color: colors.primary,
    bgcolor: colors.cardBg,
    boxShadow: "0 2px 7px rgba(15, 36, 66, 0.08)",
    "&:hover": { bgcolor: colors.cardBg },
  },
} as const;
