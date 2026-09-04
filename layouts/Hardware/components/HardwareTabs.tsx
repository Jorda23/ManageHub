"use client";

import { FaPlusCircle, FaTools } from "react-icons/fa";

import type { HardwareWorkspaceTab } from "../HardwareWorkspace";
import { WorkspaceTabItem, WorkspaceTabs } from "@/components";

type HardwareTabsProps = {
  value: HardwareWorkspaceTab;
  onChange: (value: HardwareWorkspaceTab) => void;
};

const tabs: WorkspaceTabItem<HardwareWorkspaceTab>[] = [
  {
    value: "inventory",
    label: "Inventario",
    icon: <FaTools size={13} />,
  },
  {
    value: "create",
    label: "Registrar producto",
    icon: <FaPlusCircle size={13} />,
  },
];

export function HardwareTabs({ value, onChange }: Readonly<HardwareTabsProps>) {
  return <WorkspaceTabs value={value} onChange={onChange} tabs={tabs} />;
}
