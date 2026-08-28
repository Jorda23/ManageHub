"use client";

import {
  FaPlusCircle,
  FaSeedling,
} from "react-icons/fa";

import type { GrainsWorkspaceTab } from "../GrainsWorkspace";
import { WorkspaceTabItem, WorkspaceTabs } from "@/components";

type GrainsTabsProps = {
  value: GrainsWorkspaceTab;
  onChange: (value: GrainsWorkspaceTab) => void;
};

const tabs: WorkspaceTabItem<GrainsWorkspaceTab>[] = [
  {
    value: "inventory",
    label: "Inventario de granos",
    icon: <FaSeedling size={13} />,
  },
  {
    value: "create",
    label: "Registrar grano",
    icon: <FaPlusCircle size={13} />,
  },
];

export function GrainsTabs({
  value,
  onChange,
}: Readonly<GrainsTabsProps>) {
  return (
    <WorkspaceTabs
      value={value}
      onChange={onChange}
      tabs={tabs}
    />
  );
}