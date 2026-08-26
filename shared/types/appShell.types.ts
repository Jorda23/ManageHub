import type { ComponentType, ReactNode } from "react";

export type AppShellSection =
  "dashboard" | "hardware" | "grains" | "property" | "history" | "activity";

export type AppShellProps = {
  children: ReactNode;
  active?: AppShellSection;
};

export type NavItem = {
  label: string;
  mobileLabel: string;
  href: string;
  icon: ComponentType<{ size?: number }>;
  key: Exclude<AppShellSection, "activity">;
};
