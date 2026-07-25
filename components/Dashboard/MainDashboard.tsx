"use client";

import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import {
  alpha,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
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

type CommitmentItem = {
  date: string;
  title: string;
  detail: string;
  amount?: string;
};

type QuickAction = {
  label: string;
  detail: string;
  href: string;
  icon: ComponentType<{ size?: number }>;
  accent: string;
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

const metrics: MetricCard[] = [
  {
    label: "Ventas de hoy",
    value: "$286.40",
    detail: "+12% vs. ayer",
    icon: FaCashRegister,
    accent: colors.success,
    tone: "success",
  },
  {
    label: "Ingresos del mes",
    value: "$8,450.00",
    detail: "68% de la meta",
    icon: FaChartLine,
    accent: colors.info,
    tone: "info",
  },
  {
    label: "Por cobrar",
    value: "$73,700.00",
    detail: "4 cuentas abiertas",
    icon: FaWallet,
    accent: colors.warning,
    tone: "warning",
  },
  {
    label: "Alertas",
    value: "3",
    detail: "1 requiere atención",
    icon: FaBell,
    accent: colors.danger,
    tone: "danger",
  },
];

const modules: ModuleCard[] = [
  {
    eyebrow: "FERRETERÍA",
    title: "Ventas de ferretería",
    description:
      "Administra productos, existencias, precios y ventas del negocio de ferretería.",
    image:
      "https://images.unsplash.com/photo-1519520104014-df63821cb6f9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "/sell/hardware",
    stats: [
      { value: "$106.90", label: "VENTAS HOY" },
      { value: "216", label: "EN STOCK" },
      { value: "4", label: "PRODUCTOS" },
    ],
  },
  {
    eyebrow: "GRANOS BÁSICOS",
    title: "Ventas de granos",
    description:
      "Controla inventario y ventas por libra, saco, quintal o kilogramo.",
    image:
      "https://images.unsplash.com/photo-1645331465778-eb409d112198?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    description:
      "Consulta propiedades vendidas, clientes, cuotas, saldos y pagos pendientes.",
    image:
      "https://images.unsplash.com/photo-1672861847378-e15e90cc25ca?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "/sell/property",
    stats: [
      { value: "4", label: "PROPIEDADES" },
      { value: "$41.1k", label: "ABONADO" },
      { value: "$73.7k", label: "PENDIENTE" },
    ],
  },
];

const cashFlow = [
  { day: "Lun", hardware: 92, grains: 48, property: 75 },
  { day: "Mar", hardware: 65, grains: 58, property: 42 },
  { day: "Mié", hardware: 78, grains: 36, property: 95 },
  { day: "Jue", hardware: 54, grains: 66, property: 50 },
  { day: "Vie", hardware: 88, grains: 72, property: 82 },
  { day: "Sáb", hardware: 100, grains: 55, property: 64 },
  { day: "Hoy", hardware: 73, grains: 44, property: 90 },
];

const alerts: AlertItem[] = [
  {
    title: "Lote C-21 con pago atrasado",
    detail: "El vencimiento fue hace 5 días.",
    href: "/sell/property",
    tone: "danger",
  },
  {
    title: "Inventario bajo de cemento",
    detail: "Quedan 22 unidades disponibles.",
    href: "/sell/hardware",
    tone: "warning",
  },
  {
    title: "Próximo pago de Lote A-12",
    detail: "La cuota vence dentro de 3 días.",
    href: "/sell/property",
    tone: "info",
  },
];

const activities: ActivityItem[] = [
  {
    icon: FaTools,
    title: "Venta de taladro inalámbrico",
    subtitle: "Ferretería · Efectivo",
    time: "3:45 p. m.",
    amount: "+$79.90",
    accent: colors.warning,
  },
  {
    icon: FaBuilding,
    title: "Abono registrado para Lote A-12",
    subtitle: "Valeria Gómez · Efectivo",
    time: "2:20 p. m.",
    amount: "+$500.00",
    accent: colors.info,
  },
  {
    icon: FaTractor,
    title: "Venta de frijol rojo",
    subtitle: "Granos básicos · 2 sacos",
    time: "11:10 a. m.",
    amount: "+$8.50",
    accent: colors.teal,
  },
  {
    icon: FaCheckCircle,
    title: "Inventario actualizado",
    subtitle: "Caja de tornillos · 140 unidades",
    time: "9:35 a. m.",
    accent: colors.success,
  },
];

export default function MainDashboard() {
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
            {metrics.map((metric) => (
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
            <CashFlowCard />
            <AlertsCard />
          </Box>

          <Box>
            <SectionHeading
              title="Módulos del negocio"
              subtitle="Accede directamente a ventas, inventarios y gestión de propiedades."
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

          <Box
          >
            <ActivityCard />
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
            {formattedDate}. Consulta el estado general de ventas, inventarios,
            propiedades y próximos compromisos.
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

function DashboardMetricCard({
  label,
  value,
  detail,
  icon: Icon,
  accent,
  tone,
}: MetricCard) {
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

function CashFlowCard() {
  return (
    <Card elevation={0} sx={{ ...cardStyles, p: { xs: 2, md: 2.5 } }}>
      <PanelHeader
        icon={FaChartLine}
        accent={colors.info}
        title="Flujo de caja · últimos 7 días"
        subtitle="Comparación diaria por línea de negocio"
        action="Ver detalle"
      />

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2.5 }}>
        <LegendDot label="Ferretería" accent={colors.warning} />
        <LegendDot label="Granos" accent={colors.teal} />
        <LegendDot label="Terrenos" accent={colors.info} />
      </Box>

      <Box
        sx={{
          height: 220,
          display: "grid",
          gridTemplateColumns: "repeat(7, minmax(34px, 1fr))",
          alignItems: "end",
          gap: { xs: 0.7, sm: 1.2 },
          borderBottom: `1px solid ${colors.border}`,
          pb: 1,
        }}
      >
        {cashFlow.map((item) => (
          <Box
            key={item.day}
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
                color: item.day === "Hoy" ? colors.primary : colors.muted,
                fontSize: 10.5,
                fontWeight: item.day === "Hoy" ? 900 : 700,
              }}
            >
              {item.day}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          mt: 2,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
          gap: 1.5,
        }}
      >
        <MiniValue label="Ingresos 7 días" value="$2,841.60" />
        <MiniValue label="Promedio diario" value="$405.94" />
        <MiniValue label="Mejor día" value="Sábado" />
      </Box>
    </Card>
  );
}

function AlertsCard() {
  return (
    <Card elevation={0} sx={{ ...cardStyles, p: { xs: 2, md: 2.5 } }}>
      <PanelHeader
        icon={FaExclamationTriangle}
        accent={colors.danger}
        title="Alertas y pendientes"
        subtitle="Situaciones que requieren seguimiento"
      />

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {alerts.map((alert, index) => {
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
                    <Typography sx={{ mt: 0.35, color: colors.muted, fontSize: 11.5, fontWeight: 600 }}>
                      {alert.detail}
                    </Typography>
                  </Box>
                  <FaArrowRight size={11} color={colors.muted} />
                </Box>
              </Link>
              {index < alerts.length - 1 && <Divider sx={{ borderColor: colors.borderSoft }} />}
            </Box>
          );
        })}
      </Box>

      <Button
        fullWidth
        variant="outlined"
        sx={{ ...buttonStyles("outlined"), mt: 2 }}
      >
        Ver todas las alertas
      </Button>
    </Card>
  );
}

function SectorModuleCard({
  eyebrow,
  title,
  description,
  image,
  href,
  stats,
}: ModuleCard) {
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
              sx={{ mt: 0.65, color: colors.mutedDark, fontSize: 12, fontWeight: 600, lineHeight: 1.5 }}
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
                sx={{ mt: 0.25, color: colors.muted, fontSize: 8.5, fontWeight: 850, lineHeight: 1.25 }}
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

function ActivityCard() {
  return (
    <Card elevation={0} sx={{ ...cardStyles, p: { xs: 2, md: 2.5 } }}>
      <PanelHeader
        icon={FaReceipt}
        accent={colors.success}
        title="Actividad reciente"
        subtitle="Últimos movimientos realizados en todos los módulos"
        action="Ver historial"
      />

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {activities.map((activity, index) => {
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
                  <Typography sx={{ mt: 0.25, color: colors.muted, fontSize: 11.3, fontWeight: 600 }}>
                    {activity.subtitle}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                  {activity.amount && (
                    <Typography sx={{ color: colors.success, fontSize: 12.5, fontWeight: 950 }}>
                      {activity.amount}
                    </Typography>
                  )}
                  <Typography sx={{ mt: 0.2, color: colors.muted, fontSize: 10.5, fontWeight: 700 }}>
                    {activity.time}
                  </Typography>
                </Box>
              </Box>
              {index < activities.length - 1 && <Divider sx={{ borderColor: colors.borderSoft }} />}
            </Box>
          );
        })}
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
      <Typography sx={{ color: colors.muted, fontSize: 10.8, fontWeight: 700 }}>
        {label}
      </Typography>
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