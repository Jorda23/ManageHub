"use client";

import { HardwareWorkspace } from "@/components/Modules/Hardware/HardwareWorkspace";
import { GrainsWorkspace } from "@/components/Modules/Grains/GrainsWorkspace";
import { PropertyWorkspace } from "@/components/Modules/Property/PropertyWorkspace";
import type { SaleCategory } from "@/components/SaleWorkspace/saleWorkspaceData";

export function SaleWorkspace({ category }: { category: SaleCategory }) {
  if (category === "hardware") {
    return <HardwareWorkspace />;
  }

  if (category === "grains") {
    return <GrainsWorkspace />;
  }

  return <PropertyWorkspace />;
}