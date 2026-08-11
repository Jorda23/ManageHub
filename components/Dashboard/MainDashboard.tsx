"use client";

import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { alpha, Box, Button, Card, Chip, Divider, Typography } from "@mui/material";
import {
  FaArrowRight,
  FaBell,
  FaBuilding,
  FaCashRegister,
  FaChartLine,
  FaCheckCircle,
  FaExclamationTriangle,
  FaHome,
  FaReceipt,
  FaTools,
  FaTractor,
  FaWallet,
} from "react-icons/fa";

import { useDashboard } from "@/hook/useDashboard";

import type {
  DashboardAlert,
  DashboardCashFlowDay,
  DashboardRecentActivity,
  DashboardResponse,
  DashboardSummary,
} from "@/types/api.types";

import AppShell from "../AppShell/AppShell";

type MetricTone = "success" | "danger" | "warning" | "info";

type MetricCard = {
  label: string;
  value: string;
  detail: string;
  icon: ComponentType<{ size?: number }>;
  accent: string;
  tone: MetricTone;
};

type ModuleCard = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  href: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
};

type ActivityItem = {
  icon: ComponentType<{ size?: number }>;
  title: string;
  subtitle: string;
  time: string;
  amount?: string;
  accent: string;
};

type AlertItem = {
  title: string;
  detail: string;
  href: string;
  tone: "danger" | "warning" | "info";
};

type CashFlowViewItem = {
  day: string;
  isToday: boolean;
  hardware: number;
  grains: number;
  property: number;
  total: number;
};

type DashboardView = {
  metrics: MetricCard[];
  cashFlow: CashFlowViewItem[];
  alerts: AlertItem[];
  activities: ActivityItem[];
};

const colors = {
  pageBg: "#f3f7fa",
  cardBg: "#ffffff",
  border: "#dbe6ed",
  borderSoft: "#edf2f6",
  text: "#0f172a",
  textDark: "#002b45",
  muted: "#64748b",
  mutedDark: "#40576a",
  primary: "#123f63",
  primaryDark: "#002b45",
  primarySoft: "#e8f2f7",
  success: "#16a34a",
  warning: "#f97316",
  danger: "#dc2626",
  info: "#2563eb",
  teal: "#0f8b7f",
  purple: "#7c3aed",
};

const modules: ModuleCard[] = [
  {
    eyebrow: "FERRETERIA",
    title: "Ventas de ferreteria",
    description: "Administra productos, existencias, precios y ventas del negocio de ferreteria.",
    image:
      "https://images.unsplash.com/photo-1519520104014-df63821cb6f9?q=80&w=1170&auto=format&fit=crop",
    href: "/sell/hardware",
    stats: [
      { value: "$106.90", label: "VENTAS HOY" },
      { value: "216", label: "EN STOCK" },
      { value: "4", label: "PRODUCTOS" },
    ],
  },
  {
    eyebrow: "GRANOS BASICOS",
    title: "Ventas de granos",
    description: "Controla inventario y ventas por libra, saco, quintal o kilogramo.",
    image:
      "https://images.unsplash.com/photo-1645331465778-eb409d112198?q=80&w=687&auto=format&fit=crop",
    href: "/sell/grains",
    stats: [
      { value: "$38.25", label: "VENTAS HOY" },
      { value: "324", label: "UNIDADES" },
      { value: "4", label: "PRODUCTOS" },
    ],
  },
  {
    eyebrow: "TERRENOS",
    title: "Propiedades y abonos",
    description: "Consulta propiedades vendidas, clientes, cuotas, saldos y pagos pendientes.",
    image:
      "https://images.unsplash.com/photo-1672861847378-e15e90cc25ca?q=80&w=1332&auto=format&fit=crop",
    href: "/sell/property",
    stats: [
      { value: "4", label: "PROPIEDADES" },
      { value: "$41.1k", label: "ABONADO" },
      { value: "$73.7k", label: "PENDIENTE" },
    ],
  },
];

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

function DashboardHero() {
  const formattedDate = new Intl.DateTimeFormat("es-NI", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <Card
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "16px",
        p: { xs: 2.25, md: 3 },
        bgcolor: colors.cardBg,
        border: `1px solid ${colors.border}`,
        boxShadow: "0 18px 45px rgba(15, 23, 42, 0.07)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          right: -80,
          top: -100,
          width: 280,
          height: 280,
          borderRadius: "50%",
          bgcolor: alpha(colors.primary, 0.08),
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          right: 60,
          bottom: -110,
          width: 220,
          height: 220,
          borderRadius: "50%",
          bgcolor: alpha("#0ea5e9", 0.08),
          display: { xs: "none", lg: "block" },
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) auto" },
          gap: 2.5,
          alignItems: "center",
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Chip
            icon={<FaHome size={11} />}
            label="AssetHub Control Center"
            size="small"
            sx={{
              mb: 1.3,
              height: 25,
              borderRadius: "16px",
              bgcolor: colors.primarySoft,
              color: colors.primary,
              fontSize: 11,
              fontWeight: 900,
            }}
          />

          <Typography
            sx={{
              color: colors.text,
              fontSize: { xs: 28, sm: 32, md: 38 },
              fontWeight: 950,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
            }}
          >
            Bienvenido, Administrador
          </Typography>

          <Typography
            sx={{
              mt: 0.9,
              color: colors.muted,
              fontSize: { xs: 13, md: 14 },
              fontWeight: 600,
              lineHeight: 1.55,
              maxWidth: 720,
              textTransform: "capitalize",
            }}
          >
            {formattedDate}. Consulta el estado general de ventas, inventarios, propiedades y
            proximos compromisos.
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

function DashboardMetricCard({ label, value, detail, icon: Icon, accent, tone }: MetricCard) {
  const detailColor =
    tone === "success"
      ? colors.success
      : tone === "danger"
        ? colors.danger
        : tone === "warning"
          ? colors.warning
          : colors.info;

  return (
    <Card elevation={0} sx={cardStyles}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 2,
          mb: 1.8,
        }}
      >
        <IconBadge accent={accent}>
          <Icon size={18} />
        </IconBadge>
        <Chip
          label={detail}
          size="small"
          sx={{
            height: 23,
            borderRadius: 999,
            bgcolor: alpha(detailColor, 0.1),
            color: detailColor,
            fontSize: 10.5,
            fontWeight: 900,
            "& .MuiChip-label": { px: 1 },
          }}
        />
      </Box>

      <Typography sx={eyebrowStyles}>{label}</Typography>
      <Typography
        sx={{
          color: colors.text,
          fontSize: { xs: 21, md: 24 },
          fontWeight: 950,
          lineHeight: 1.15,
        }}
      >
        {value}
      </Typography>
    </Card>
  );
}

function CashFlowCard({ cashFlow }: { cashFlow: CashFlowViewItem[] }) {
  const totalIncome = cashFlow.reduce((sum, item) => sum + item.total, 0);
  const averageIncome = cashFlow.length > 0 ? totalIncome / cashFlow.length : 0;
  const bestDay = getBestDayLabel(cashFlow);

  return (
    <Card elevation={0} sx={{ ...cardStyles, p: { xs: 2, md: 2.5 } }}>
      <PanelHeader
        icon={FaChartLine}
        accent={colors.info}
        title="Flujo de caja - ultimos 7 dias"
        subtitle="Comparacion diaria por linea de negocio"
        action="Ver detalle"
      />

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2.5 }}>
        <LegendDot label="Ferreteria" accent={colors.warning} />
        <LegendDot label="Granos" accent={colors.teal} />
        <LegendDot label="Terrenos" accent={colors.info} />
      </Box>

      <Box
        sx={{
          height: 220,
          display: "grid",
          gridTemplateColumns: `repeat(${Math.max(cashFlow.length, 1)}, minmax(34px, 1fr))`,
          alignItems: "end",
          gap: { xs: 0.7, sm: 1.2 },
          borderBottom: `1px solid ${colors.border}`,
          pb: 1,
        }}
      >
        {cashFlow.length > 0 ? (
          cashFlow.map((item) => (
            <Box
              key={`${item.day}-${item.total}`}
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
                <ChartBar value={item.hardware} accent={colors.warning} />
                <ChartBar value={item.grains} accent={colors.teal} />
                <ChartBar value={item.property} accent={colors.info} />
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

function AlertsCard({ alerts }: { alerts: AlertItem[] }) {
  return (
    <Card elevation={0} sx={{ ...cardStyles, p: { xs: 2, md: 2.5 } }}>
      <PanelHeader
        icon={FaExclamationTriangle}
        accent={colors.danger}
        title="Alertas y pendientes"
        subtitle="Situaciones que requieren seguimiento"
      />

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {alerts.length > 0 ? (
          alerts.map((alert, index) => {
            const accent =
              alert.tone === "danger"
                ? colors.danger
                : alert.tone === "warning"
                  ? colors.warning
                  : colors.info;

            return (
              <Box key={alert.title}>
                <Link href={alert.href} style={{ color: "inherit", textDecoration: "none" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.4,
                      py: 1.55,
                      borderRadius: 2,
                      transition: "0.18s ease",
                      "&:hover": { bgcolor: alpha(accent, 0.05), px: 1 },
                    }}
                  >
                    <Box
                      sx={{
                        width: 9,
                        height: 9,
                        mt: 0.65,
                        borderRadius: "50%",
                        bgcolor: accent,
                        boxShadow: `0 0 0 5px ${alpha(accent, 0.1)}`,
                        flexShrink: 0,
                      }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{ color: colors.text, fontSize: 12.5, fontWeight: 900 }}>
                        {alert.title}
                      </Typography>
                      <Typography
                        sx={{ mt: 0.35, color: colors.muted, fontSize: 11.5, fontWeight: 600 }}
                      >
                        {alert.detail}
                      </Typography>
                    </Box>
                    <FaArrowRight size={11} color={colors.muted} />
                  </Box>
                </Link>
                {index < alerts.length - 1 && <Divider sx={{ borderColor: colors.borderSoft }} />}
              </Box>
            );
          })
        ) : (
          <Box sx={{ py: 2, color: colors.muted, fontSize: 12, fontWeight: 600 }}>
            No hay alertas activas.
          </Box>
        )}
      </Box>

      <Button fullWidth variant="outlined" sx={{ ...buttonStyles("outlined"), mt: 2 }}>
        Ver todas las alertas
      </Button>
    </Card>
  );
}

function SectorModuleCard({ eyebrow, title, description, image, href, stats }: ModuleCard) {
  return (
    <Card elevation={0} sx={{ ...cardStyles, overflow: "hidden", p: 0 }}>
      <Box
        sx={{
          height: { xs: 160, sm: 178 },
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.04), rgba(0,0,0,0.4)), url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Chip
          label={eyebrow}
          size="small"
          sx={{
            position: "absolute",
            left: 14,
            top: 14,
            height: 23,
            borderRadius: "16px",
            bgcolor: "rgba(255,255,255,0.9)",
            color: colors.primary,
            fontSize: 9.5,
            fontWeight: 950,
            backdropFilter: "blur(8px)",
          }}
        />
      </Box>

      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, mb: 1 }}>
          <Box>
            <Typography sx={{ color: colors.text, fontSize: 17, fontWeight: 950 }}>
              {title}
            </Typography>
            <Typography
              sx={{
                mt: 0.65,
                color: colors.mutedDark,
                fontSize: 12,
                fontWeight: 600,
                lineHeight: 1.5,
              }}
            >
              {description}
            </Typography>
          </Box>
          <Link href={href} style={{ color: colors.primary }}>
            <IconBadge accent={colors.primary} compact>
              <FaArrowRight size={12} />
            </IconBadge>
          </Link>
        </Box>

        <Divider sx={{ my: 1.7, borderColor: colors.borderSoft }} />

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1 }}>
          {stats.map((stat) => (
            <Box key={stat.label} sx={{ minWidth: 0 }}>
              <Typography sx={{ color: colors.text, fontSize: 13, fontWeight: 950 }}>
                {stat.value}
              </Typography>
              <Typography
                sx={{
                  mt: 0.25,
                  color: colors.muted,
                  fontSize: 8.5,
                  fontWeight: 850,
                  lineHeight: 1.25,
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Card>
  );
}

function ActivityCard({ activities }: { activities: ActivityItem[] }) {
  return (
    <Card elevation={0} sx={{ ...cardStyles, p: { xs: 2, md: 2.5 } }}>
      <PanelHeader
        icon={FaReceipt}
        accent={colors.success}
        title="Actividad reciente"
        subtitle="Ultimos movimientos realizados en todos los modulos"
        action="Ver historial"
      />

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {activities.length > 0 ? (
          activities.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <Box key={`${activity.title}-${activity.time}`}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1.45 }}>
                  <IconBadge accent={activity.accent} compact>
                    <Icon size={13} />
                  </IconBadge>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ color: colors.text, fontSize: 12.5, fontWeight: 900 }}>
                      {activity.title}
                    </Typography>
                    <Typography
                      sx={{ mt: 0.25, color: colors.muted, fontSize: 11.3, fontWeight: 600 }}
                    >
                      {activity.subtitle}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                    {activity.amount && (
                      <Typography sx={{ color: colors.success, fontSize: 12.5, fontWeight: 950 }}>
                        {activity.amount}
                      </Typography>
                    )}
                    <Typography
                      sx={{ mt: 0.2, color: colors.muted, fontSize: 10.5, fontWeight: 700 }}
                    >
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>
                {index < activities.length - 1 && (
                  <Divider sx={{ borderColor: colors.borderSoft }} />
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

function PanelHeader({
  icon: Icon,
  accent,
  title,
  subtitle,
  action,
}: {
  icon: ComponentType<{ size?: number }>;
  accent: string;
  title: string;
  subtitle: string;
  action?: string;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 2,
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 1.25, minWidth: 0 }}>
        <IconBadge accent={accent} compact>
          <Icon size={14} />
        </IconBadge>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ color: colors.text, fontSize: 16, fontWeight: 950 }}>
            {title}
          </Typography>
          <Typography sx={{ mt: 0.25, color: colors.muted, fontSize: 11.5, fontWeight: 600 }}>
            {subtitle}
          </Typography>
        </Box>
      </Box>
      {action && (
        <Button
          size="small"
          endIcon={<FaArrowRight size={10} />}
          sx={{
            color: colors.primary,
            fontSize: 10.5,
            fontWeight: 900,
            textTransform: "none",
            whiteSpace: "nowrap",
          }}
        >
          {action}
        </Button>
      )}
    </Box>
  );
}

function IconBadge({
  accent,
  compact = false,
  children,
}: {
  accent: string;
  compact?: boolean;
  children: ReactNode;
}) {
  return (
    <Box
      sx={{
        width: compact ? 36 : 44,
        height: compact ? 36 : 44,
        borderRadius: "14px",
        display: "grid",
        placeItems: "center",
        bgcolor: alpha(accent, 0.12),
        color: accent,
        flexShrink: 0,
      }}
    >
      {children}
    </Box>
  );
}

function ChartBar({ value, accent }: { value: number; accent: string }) {
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

function LegendDot({ label, accent }: { label: string; accent: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
      <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: accent }} />
      <Typography sx={{ color: colors.muted, fontSize: 10.8, fontWeight: 700 }}>{label}</Typography>
    </Box>
  );
}

function MiniValue({ label, value }: { label: string; value: string }) {
  return (
    <Box
      sx={{
        p: 1.3,
        borderRadius: "8px",
        bgcolor: "#f8fafc",
        border: `1px solid ${colors.borderSoft}`,
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

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Box sx={{ mb: 1.5 }}>
      <Typography sx={{ color: colors.text, fontSize: { xs: 17, md: 19 }, fontWeight: 950 }}>
        {title}
      </Typography>
      <Typography sx={{ mt: 0.35, color: colors.muted, fontSize: 12.5, fontWeight: 600 }}>
        {subtitle}
      </Typography>
    </Box>
  );
}

function StatusScreen({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "grid",
        placeItems: "center",
        bgcolor: colors.pageBg,
        px: 2,
      }}
    >
      <Card elevation={0} sx={{ ...cardStyles, px: 3, py: 2.5, textAlign: "center" }}>
        <Typography sx={{ color: colors.text, fontSize: 16, fontWeight: 900 }}>{title}</Typography>
        <Typography sx={{ mt: 0.5, color: colors.muted, fontSize: 12.5, fontWeight: 600 }}>
          {subtitle}
        </Typography>
      </Card>
    </Box>
  );
}

function buildDashboardView(data?: DashboardResponse): DashboardView {
  return {
    metrics: buildMetrics(data?.summary),
    cashFlow: buildCashFlowView(data?.cashFlow7Days ?? []),
    alerts: buildAlertView(data?.alerts ?? []),
    activities: buildActivityView(data?.recentActivity ?? []),
  };
}

function buildMetrics(summary?: DashboardSummary): MetricCard[] {
  return [
    {
      label: "Ventas de hoy",
      value: formatCurrency(summary?.salesToday ?? 0),
      detail: formatPercent(summary?.salesVsYesterdayPercent, "vs. ayer"),
      icon: FaCashRegister,
      accent: colors.success,
      tone: "success",
    },
    {
      label: "Ingresos del mes",
      value: formatCurrency(summary?.monthlyIncome ?? 0),
      detail: formatPercent(summary?.monthlyVsPreviousMonthPercent, "vs. mes anterior"),
      icon: FaChartLine,
      accent: colors.info,
      tone: "info",
    },
    {
      label: "Por cobrar",
      value: formatCurrency(summary?.accountsReceivable ?? 0),
      detail: `${summary?.openAccounts ?? 0} cuentas abiertas`,
      icon: FaWallet,
      accent: colors.warning,
      tone: "warning",
    },
    {
      label: "Alertas",
      value: String(summary?.alertsCount ?? 0),
      detail: summary?.alertsCount ? "requiere atencion" : "sin pendientes",
      icon: FaBell,
      accent: colors.danger,
      tone: "danger",
    },
  ];
}

function buildCashFlowView(items: DashboardCashFlowDay[]): CashFlowViewItem[] {
  const maxTotal = Math.max(...items.map((item) => item.total), 0);

  return items.map((item) => {
    const isToday = isTodayIsoDate(item.date);

    return {
      day: formatCashFlowDayLabel(item.date, isToday),
      isToday,
      hardware: scaleBarValue(item.hardware, maxTotal),
      grains: scaleBarValue(item.grains, maxTotal),
      property: scaleBarValue(item.properties, maxTotal),
      total: item.total,
    };
  });
}

function buildAlertView(items: DashboardAlert[]): AlertItem[] {
  return items.map((alert) => ({
    title: alert.title,
    detail: alert.message,
    href: alertHrefByCode(alert.code),
    tone: alertTone(alert.severity),
  }));
}

function buildActivityView(items: DashboardRecentActivity[]): ActivityItem[] {
  return items.map((activity) => ({
    icon: activityIcon(activity.type),
    title: activity.title,
    subtitle: activity.subtitle,
    time: formatActivityTime(activity.createdAt),
    amount: formatCurrency(activity.amount),
    accent: activityAccent(activity.type),
  }));
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPercent(value: number | undefined, suffix: string) {
  const percent = value ?? 0;

  return `${percent > 0 ? "+" : ""}${percent}% ${suffix}`;
}

function formatCashFlowDayLabel(date: string, isToday: boolean) {
  if (isToday) {
    return "Hoy";
  }

  return new Intl.DateTimeFormat("es-NI", {
    weekday: "short",
  }).format(new Date(date));
}

function formatActivityTime(date: string) {
  return new Intl.DateTimeFormat("es-NI", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

function isTodayIsoDate(date: string) {
  return new Date(date).toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10);
}

function scaleBarValue(value: number, maxTotal: number) {
  if (!maxTotal) {
    return 0;
  }

  return Math.max((value / maxTotal) * 100, 6);
}

function getBestDayLabel(items: CashFlowViewItem[]) {
  if (items.length === 0) {
    return "Sin datos";
  }

  const bestDay = items.reduce(
    (best, current) => (current.total > best.total ? current : best),
    items[0],
  );

  return bestDay.day;
}

function alertHrefByCode(code: string) {
  if (code.includes("inventory")) {
    return "/sell/hardware";
  }

  if (code.includes("payment") || code.includes("property")) {
    return "/sell/property";
  }

  return "/dashboard";
}

function alertTone(severity: string): "danger" | "warning" | "info" {
  if (severity === "danger") {
    return "danger";
  }

  if (severity === "warning") {
    return "warning";
  }

  return "info";
}

function activityIcon(type: string) {
  if (type.includes("hardware")) {
    return FaTools;
  }

  if (type.includes("grain")) {
    return FaTractor;
  }

  if (type.includes("property")) {
    return FaBuilding;
  }

  return FaCheckCircle;
}

function activityAccent(type: string) {
  if (type.includes("hardware")) {
    return colors.warning;
  }

  if (type.includes("grain")) {
    return colors.teal;
  }

  if (type.includes("property")) {
    return colors.info;
  }

  return colors.success;
}

const cardStyles = {
  p: 2.2,
  borderRadius: "16px",
  bgcolor: colors.cardBg,
  border: `1px solid ${colors.border}`,
  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)",
  transition: "all 0.18s ease",
  "&:hover": {
    boxShadow: "0 16px 36px rgba(15, 23, 42, 0.08)",
  },
} as const;

const eyebrowStyles = {
  color: colors.muted,
  fontSize: 10.5,
  fontWeight: 850,
  mb: 0.6,
  textTransform: "uppercase",
  letterSpacing: "0.035em",
} as const;

function buttonStyles(variant: "outlined" | "contained") {
  return {
    borderRadius: 2.25,
    px: 2,
    py: 1.05,
    fontSize: 11.5,
    fontWeight: 900,
    textTransform: "none",
    ...(variant === "contained"
      ? {
          bgcolor: colors.primary,
          color: "#ffffff",
          boxShadow: "0 12px 24px rgba(18, 63, 99, 0.22)",
          "&:hover": { bgcolor: colors.primaryDark },
        }
      : {
          color: colors.primary,
          borderColor: colors.border,
          bgcolor: "#ffffff",
          "&:hover": {
            borderColor: colors.primary,
            bgcolor: colors.primarySoft,
          },
        }),
  };
}
