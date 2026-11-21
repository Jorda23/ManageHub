import {
  FaBell,
  FaBuilding,
  FaCashRegister,
  FaChartLine,
  FaCheckCircle,
  FaTools,
  FaTractor,
  FaWallet,
} from "react-icons/fa";

import type {
  DashboardAlert,
  DashboardCashFlowDay,
  DashboardRecentActivity,
  DashboardSalesChart,
  DashboardResponse,
  DashboardSummary,
} from "@/shared/types/api.types";
import type {
  ActivityItem,
  AlertItem,
  AlertTone,
  DashboardView,
  MetricCard,
} from "@/shared/types/dashboard.types";
import { colors } from "@/theme/sharedColors";
import { formatCurrency } from "@/shared";

const activityTimeFormatter = new Intl.DateTimeFormat("es-NI", {
  hour: "numeric",
  minute: "2-digit",
});

const weekdayFormatter = new Intl.DateTimeFormat("es-NI", {
  weekday: "short",
  timeZone: "America/Managua",
});

export function buildLegacyWeeklySalesChart(items: DashboardCashFlowDay[]): DashboardSalesChart {
  const orderedItems = [...items].sort((left, right) => left.date.localeCompare(right.date));

  return {
    period: "week",
    from: orderedItems[0]?.date.slice(0, 10) ?? "",
    to: orderedItems[orderedItems.length - 1]?.date.slice(0, 10) ?? "",
    currency: "NIO",
    series: orderedItems.map((item) => {
      const date = item.date.slice(0, 10);

      return {
        bucket: date,
        label: weekdayFormatter.format(new Date(`${date}T12:00:00Z`)),
        grains: item.grains,
        hardware: item.hardware,
        properties: item.properties,
        total: item.total,
      };
    }),
  };
}

export function buildDashboardView(data?: DashboardResponse): DashboardView {
  return {
    metrics: buildMetrics(data?.summary),
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
      accent: colors.green,
      tone: "success",
    },
    {
      label: "Ingresos del mes",
      value: formatCurrency(summary?.monthlyIncome ?? 0),
      detail: formatPercent(summary?.monthlyVsPreviousMonthPercent, "vs. mes anterior"),
      icon: FaChartLine,
      accent: colors.primaryLight,
      tone: "info",
    },
    {
      label: "Por cobrar",
      value: formatCurrency(summary?.accountsReceivable ?? 0),
      detail: `${summary?.openAccounts ?? 0} cuentas abiertas`,
      icon: FaWallet,
      accent: colors.orange,
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
    amount: activity.amount !== undefined ? formatCurrency(activity.amount) : undefined,
    accent: activityAccent(activity.type),
  }));
}

function formatPercent(value: number | undefined, suffix: string) {
  const percent = value ?? 0;
  return `${percent > 0 ? "+" : ""}${percent}% ${suffix}`;
}

function formatActivityTime(date: string) {
  return activityTimeFormatter.format(new Date(date));
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

function alertTone(severity: string): AlertTone {
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
    return colors.orange;
  }

  if (type.includes("grain")) {
    return colors.green;
  }

  if (type.includes("property")) {
    return colors.primaryLight;
  }

  return colors.green;
}
