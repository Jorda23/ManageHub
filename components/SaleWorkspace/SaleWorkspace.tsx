"use client";

import type { SaleCategory } from "@/components/SaleWorkspace/saleWorkspaceData";
import { GrainsWorkspace } from "@/layouts/Grains/GrainsWorkspace";
import { HardwareWorkspace } from "@/layouts/Hardware/HardwareWorkspace";
import { PropertyWorkspace } from "@/layouts/Property/PropertyWorkspace";

export function SaleWorkspace({ category }: { category: SaleCategory }) {
  if (category === "hardware") {
    return <HardwareWorkspace />;
  }

  if (category === "grains") {
    return <GrainsWorkspace />;
  }

  return <PropertyWorkspace />;
}
