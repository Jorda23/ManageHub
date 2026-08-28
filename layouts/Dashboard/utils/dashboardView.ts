import { FaBell, FaBuilding, FaCashRegister, FaChartLine, FaCheckCircle, FaTools, FaTractor, FaWallet } from "react-icons/fa";

import type {
  DashboardAlert,
  DashboardCashFlowDay,
  DashboardRecentActivity,
  DashboardResponse,
  DashboardSummary,
} from "@/shared/types/api.types";
import type {
  ActivityItem,
  AlertItem,
  AlertTone,
  CashFlowViewItem,
  DashboardView,
  MetricCard,
} from "@/shared/types/dashboard.types";
import { colors } from "@/theme/sharedColors";
import { formatCurrency } from "@/shared";

export function buildDashboardView(data?: DashboardResponse): DashboardView {
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
    amount: activity.amount !== undefined ? formatCurrency(activity.amount) : undefined,
    accent: activityAccent(activity.type),
  }));
}

export function getBestDayLabel(items: CashFlowViewItem[]) {
  if (items.length === 0) {
    return "Sin datos";
  }

  const bestDay = items.reduce(
    (best, current) => (current.total > best.total ? current : best),
    items[0],
  );

  return bestDay.day;
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
