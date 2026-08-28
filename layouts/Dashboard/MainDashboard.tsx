"use client";

import { Box } from "@mui/material";

import { useDashboard } from "@/hook/useDashboard";
import { modules } from "@/shared/data/dashboard.data";
import { colors } from "@/theme/sharedColors";

import { AppShell } from "@/components/AppShell";
import { buildDashboardView } from "./utils/dashboardView";
import {
  StatusScreen,
  DashboardHero,
  DashboardMetricCard,
  SectionHeading,
  SectorModuleCard,
  CashFlowCard,
  AlertsCard,
  ActivityCard,
} from "./components";

export default function MainDashboard() {
  const { data, isLoading, isError } = useDashboard();
  const dashboardView = buildDashboardView(data);

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

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                xl: "repeat(4, minmax(0, 1fr))",
              },
              gap: 2,
            }}
          >
            {dashboardView.metrics.map((metric) => (
              <DashboardMetricCard key={metric.label} {...metric} />
            ))}
          </Box>

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

          <Box>
            <SectionHeading
              title="Modulos del negocio"
              subtitle="Accede directamente a ventas, inventarios y gestion de propiedades."
            />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(2, minmax(0, 1fr))",
                  xl: "repeat(3, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              {modules.map((module) => (
                <SectorModuleCard key={module.title} {...module} />
              ))}
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
