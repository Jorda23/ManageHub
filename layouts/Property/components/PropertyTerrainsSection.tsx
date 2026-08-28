import { Box, Divider } from "@mui/material";
import { FaMapMarkedAlt } from "react-icons/fa";

import { PropertyCard } from "@/components/PropertyCard";
import { EmptyState } from "@/components/EmptyState";

import { type PropertyItem } from "../../../shared/data/property.data";
import { PropertySectionCard } from "./PropertySectionCard";
import { PropertySectionHeader } from "./PropertySectionHeader";

type PropertyTerrainsSectionProps = {
  properties: PropertyItem[];
  onAddProperty: () => void;
  onEditProperty?: (property: PropertyItem) => void;
};

const scrollAreaSx = {
  maxHeight: {
    xs: 620,
    sm: 680,
    md: 720,
    lg: 760,
  },
  overflowY: "auto",
  overflowX: "hidden",
  scrollbarGutter: "stable",
  pr: {
    xs: 0.5,
    sm: 0.75,
    md: 1,
  },
  "&::-webkit-scrollbar": {
    width: {
      xs: 5,
      sm: 7,
      md: 8,
    },
  },
  "&::-webkit-scrollbar-track": {
    bgcolor: "#f1f5f9",
    borderRadius: 999,
  },
  "&::-webkit-scrollbar-thumb": {
    bgcolor: "#cbd5e1",
    borderRadius: 999,
    border: "2px solid #f1f5f9",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    bgcolor: "#94a3b8",
  },
  scrollbarWidth: "thin",
  scrollbarColor: "#cbd5e1 #f1f5f9",
};

export function PropertyTerrainsSection({
  properties,
  onAddProperty,
  onEditProperty,
}: PropertyTerrainsSectionProps) {
  return (
    <PropertySectionCard>
      <PropertySectionHeader
        icon={<FaMapMarkedAlt />}
        title="Terrenos registrados"
        actionLabel="AGREGAR TERRENO"
        onAction={onAddProperty}
      />

      <Divider />

      <Box
        sx={{
          p: {
            xs: 1.5,
            sm: 2,
            md: 2.5,
          },
        }}
      >
        {properties.length === 0 ? (
          <EmptyState
            title="No hay terrenos registrados"
            description="Agrega un terreno para comenzar a gestionar tus propiedades."
            icon={<FaMapMarkedAlt size={40} />}
          />
        ) : (
          <Box sx={scrollAreaSx}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "minmax(0, 1fr)",
                  md: "repeat(2, minmax(0, 1fr))",
                },
                gap: {
                  xs: 1.5,
                  md: 2,
                },
                width: "100%",
                minWidth: 0,
              }}
            >
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onEdit={onEditProperty}
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </PropertySectionCard>
  );
}
