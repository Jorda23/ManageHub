import type { ReactNode } from "react";

import type { SidebarItemKey } from "../data/appShell.data";
import type { DashboardIcon } from "./dashboard.types";

export type AppShellSection = SidebarItemKey | "activity";

export type AppShellProps = {
  children: ReactNode;
  active?: AppShellSection;
};

export type NavItem = {
  label: string;
  mobileLabel: string;
  href: string;
  icon: DashboardIcon;
  key: SidebarItemKey;
};

export type SidebarSection = {
  id: string;
  title: string;
  items: NavItem[];
};
