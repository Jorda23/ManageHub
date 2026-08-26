"use client";

import { GrainsWorkspace } from "@/layouts/Grains/GrainsWorkspace";
import { HardwareWorkspace } from "@/layouts/Hardware/HardwareWorkspace";
import { PropertyWorkspace } from "@/layouts/Property/PropertyWorkspace";
import type { SaleCategory } from "@/shared/data/saleWorkspace.data";

export function SaleWorkspace({ category }: { category: SaleCategory }) {
  if (category === "hardware") {
    return <HardwareWorkspace />;
  }

  if (category === "grains") {
    return <GrainsWorkspace />;
  }

  return <PropertyWorkspace />;
}
