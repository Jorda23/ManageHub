import type { ComponentType } from "react";

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

export type CashFlowViewItem = {
  day: string;
  isToday: boolean;
  hardware: number;
  grains: number;
  property: number;
  total: number;
};

export type DashboardView = {
  metrics: MetricCard[];
  cashFlow: CashFlowViewItem[];
  alerts: AlertItem[];
  activities: ActivityItem[];
};

export type CashFlowCardProps = {
  cashFlow: CashFlowViewItem[];
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
