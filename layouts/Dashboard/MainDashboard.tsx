"use client";

import { useMemo, useState } from "react";

import { Box } from "@mui/material";

import { useDashboard } from "@/hook/useDashboard";
import { colors } from "@/theme/sharedColors";

import { AppShell } from "@/components/AppShell";
import { buildDashboardView } from "./utils/dashboardView";
import {
  StatusScreen,
  DashboardHero,
  DashboardMetricCard,
  CashFlowCard,
  AlertsCard,
  ActivityCard,
  SectionHeading,
  CategoryTotalsSection,
} from "./components";

export default function MainDashboard() {
  const [categoryPeriod, setCategoryPeriod] = useState<"month" | "year">("month");
  const { data, isLoading, isError } = useDashboard(categoryPeriod);
  const dashboardView = useMemo(() => buildDashboardView(data), [data]);

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

  if (isError || !data) {
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
            gap: { xs: 2, md: 3 },
            minWidth: 0,
          }}
        >
          <DashboardHero />

          <Box>
            <SectionHeading
              eyebrow="Vista general"
              title="Resumen del negocio"
              subtitle="Una lectura rápida de ventas, ingresos, cuentas abiertas y alertas."
            />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                  xl: "repeat(4, minmax(0, 1fr))",
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

          <Box>
            <SectionHeading
              eyebrow="Operación"
              title="Seguimiento operativo"
              subtitle="Revisa el movimiento semanal y atiende los pendientes prioritarios."
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  xl: "minmax(0, 1.7fr) minmax(320px, 0.7fr)",
                },
                gap: 2,
                alignItems: "stretch",
              }}
            >
              <CashFlowCard cashFlow={dashboardView.cashFlow} />
              <AlertsCard alerts={dashboardView.alerts} />
            </Box>
          </Box>

          <Box>
            <ActivityCard activities={dashboardView.activities} />
          </Box>
        </Box>
      </Box>
    </AppShell>
  );
}
