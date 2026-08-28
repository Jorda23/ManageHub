import type { ComponentType, ReactNode } from "react";

import type { SidebarItemKey } from "../data/appShell.data";

export type AppShellSection = SidebarItemKey | "activity";

export type AppShellProps = {
  children: ReactNode;
  active?: AppShellSection;
};

export type NavItem = {
  label: string;
  mobileLabel: string;
  href: string;
  icon: ComponentType<{ size?: number }>;
  key: SidebarItemKey;
};

export type SidebarSection = {
  id: string;
  title: string;
  items: NavItem[];
};
