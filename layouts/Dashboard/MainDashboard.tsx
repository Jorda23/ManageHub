"use client";

import { useMemo, useState } from "react";

import { Box, Button } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";

import { useDashboard } from "@/hook/useDashboard";
import { colors } from "@/theme/sharedColors";

import { AppShell } from "@/components/AppShell";
import { buildDashboardView, buildLegacyWeeklySalesChart } from "./utils/dashboardView";
import {
  StatusScreen,
  DashboardHero,
  DashboardMetricCard,
  CashFlowCard,
  SectionHeading,
  CategoryTotalsSection,
  ActivityCard,
} from "./components";
import type { DashboardSalesPeriod } from "@/shared/types/api.types";

export default function MainDashboard() {
  const [categoryPeriod, setCategoryPeriod] = useState<"month" | "year">("month");
  const [salesPeriod, setSalesPeriod] = useState<DashboardSalesPeriod>("week");
  const [salesFrom, setSalesFrom] = useState("");
  const [salesTo, setSalesTo] = useState("");
  const { data, isLoading, isError, isFetching, error } = useDashboard({
    period: categoryPeriod,
    salesPeriod,
    ...(salesPeriod === "custom" ? { from: salesFrom, to: salesTo } : {}),
  });
  const dashboardView = useMemo(() => buildDashboardView(data), [data]);
  const salesChart = useMemo(() => {
    if (data?.salesChart) return data.salesChart;
    if (salesPeriod === "week" && data?.cashFlow7Days) {
      return buildLegacyWeeklySalesChart(data.cashFlow7Days);
    }
    return undefined;
  }, [data, salesPeriod]);

  if (isLoading) {
    return (
      <AppShell active="dashboard">
        <StatusScreen
          title="Cargando tablero..."
          subtitle="Estamos preparando la informacion mas reciente."
        />
      </AppShell>
    );
  }

  if (!data) {
    return (
      <AppShell active="dashboard">
        <StatusScreen
          title="No se pudo cargar el tablero"
          subtitle="Intenta recargar la pagina en unos segundos."
        />
      </AppShell>
    );
  }

  return (
    <AppShell active="dashboard">
      <Box
        sx={{
          width: "100%",
          minHeight: "calc(100vh - 64px)",
          overflowX: "hidden",
          bgcolor: colors.pageBg,
          px: { xs: 1.5, sm: 2, md: 3 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1440,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, md: 2.25 },
            minWidth: 0,
          }}
        >
          <DashboardHero />

          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
                gap: 1.5,
                mb: { xs: 1.25, md: 1.5 },
              }}
            >
              <SectionHeading
                eyebrow="Vista general"
                title="Resumen del negocio"
                subtitle="Ventas, ingresos, cuentas abiertas y alertas en un solo lugar."
              />
              <Button
                href="/reports"
                endIcon={<FaArrowRight size={10} />}
                sx={{
                  flexShrink: 0,
                  mt: { xs: 0.3, sm: 0 },
                  color: colors.primary,
                  fontSize: 11,
                  fontWeight: 900,
                  textTransform: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Exportar informe
              </Button>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                  lg: "repeat(4, minmax(0, 1fr))",
                },
                gap: { xs: 1.5, md: 2 },
              }}
            >
              {dashboardView.metrics.map((metric) => (
                <DashboardMetricCard key={metric.label} {...metric} />
              ))}
            </Box>
          </Box>

          <CategoryTotalsSection
            categories={data.categories ?? []}
            period={categoryPeriod}
            onPeriodChange={setCategoryPeriod}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 1.5, md: 2 },
            }}
          >
            <CashFlowCard
              salesChart={salesChart}
              period={salesPeriod}
              from={salesFrom}
              to={salesTo}
              isFetching={isFetching}
              error={isError ? error?.message : undefined}
              onPeriodChange={setSalesPeriod}
              onFromChange={setSalesFrom}
              onToChange={setSalesTo}
            />
            <ActivityCard activities={dashboardView.activities} />
          </Box>
        </Box>
      </Box>
    </AppShell>
  );
}
