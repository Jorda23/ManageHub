"use client";

import { FaBuilding, FaPlusCircle } from "react-icons/fa";

import type { PropertyWorkspaceTab } from "../PropertyWorkspace";
import { WorkspaceTabItem, WorkspaceTabs } from "@/components";

type PropertyTabsProps = {
  value: PropertyWorkspaceTab;
  onChange: (value: PropertyWorkspaceTab) => void;
};

const tabs: WorkspaceTabItem<PropertyWorkspaceTab>[] = [
  {
    value: "properties",
    label: "Terrenos registrados",
    icon: <FaBuilding size={13} />,
  },
  {
    value: "create",
    label: "Registrar terreno",
    icon: <FaPlusCircle size={13} />,
  },
];

export function PropertyTabs({ value, onChange }: Readonly<PropertyTabsProps>) {
  return <WorkspaceTabs value={value} onChange={onChange} tabs={tabs} />;
}
