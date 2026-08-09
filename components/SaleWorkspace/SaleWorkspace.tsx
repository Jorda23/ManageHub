"use client";

import { HardwareWorkspace } from "@/Modules/Hardware/HardwareWorkspace";
import { GrainsWorkspace } from "@/Modules/Grains/GrainsWorkspace";
import { PropertyWorkspace } from "@/Modules/Property/PropertyWorkspace";
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
