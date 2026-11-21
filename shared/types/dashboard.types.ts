import type { ComponentType } from "react";
import type { DashboardSalesChart, DashboardSalesPeriod } from "./api.types";

export type DashboardIcon = ComponentType<{ size?: number }>;

export type MetricTone = "success" | "danger" | "warning" | "info";

export type MetricCard = {
  label: string;
  value: string;
  detail: string;
  icon: DashboardIcon;
  accent: string;
  tone: MetricTone;
};

export type ModuleStat = {
  value: string;
  label: string;
};

export type ModuleCard = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  href: string;
  stats: ModuleStat[];
};

export type ActivityItem = {
  icon: DashboardIcon;
  title: string;
  subtitle: string;
  time: string;
  amount?: string;
  accent: string;
};

export type AlertTone = "danger" | "warning" | "info";

export type AlertItem = {
  title: string;
  detail: string;
  href: string;
  tone: AlertTone;
};

export type DashboardView = {
  metrics: MetricCard[];
  alerts: AlertItem[];
  activities: ActivityItem[];
};

export type CashFlowCardProps = {
  salesChart?: DashboardSalesChart;
  period: DashboardSalesPeriod;
  from: string;
  to: string;
  isFetching?: boolean;
  error?: string;
  onPeriodChange: (period: DashboardSalesPeriod) => void;
  onFromChange: (date: string) => void;
  onToChange: (date: string) => void;
};

export type AlertsCardProps = {
  alerts: AlertItem[];
};

export type ActivityCardProps = {
  activities: ActivityItem[];
};

export type PanelHeaderProps = {
  icon: DashboardIcon;
  accent: string;
  title: string;
  subtitle: string;
  action?: string;
  href?: string;
};

export type IconBadgeProps = {
  accent: string;
  compact?: boolean;
};

export type ChartBarProps = {
  value: number;
  accent: string;
  title: string;
};

export type LegendDotProps = {
  label: string;
  accent: string;
};

export type MiniValueProps = {
  label: string;
  value: string;
};

export type SectionHeadingProps = {
  title: string;
  subtitle: string;
};

export type StatusScreenProps = {
  title: string;
  subtitle: string;
};
