"use client";

import { useEffect, useMemo, useState } from "react";

import { Box } from "@mui/material";

import { AddPropertyModal } from "@/components/AddPropertyModal";

import {
  PropertyHeroHeader,
  PropertyMetricsGrid,
  PropertyPaymentSection,
  PropertyTerrainsSection,
} from "./components";

import { useProperties } from "@/hook/useProperties";

import { AppShell, LoadingState, type PropertyItem } from "@/components";

import { propertyConfig } from "@/shared";

import { colors } from "@/theme/sharedColors";

export function PropertyWorkspace() {
  const { data: apiProperties = [], isLoading: isLoadingProperties } = useProperties();

  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [isPropertyDialogOpen, setIsPropertyDialogOpen] = useState(false);

  const properties = useMemo<PropertyItem[]>(() => {
    return apiProperties.map((property) => {
      const isPaid = property.status === "Paid";

      return {
        id: property.id,
        name: property.name,
        code: property.code,
        location: property.location,
        size: property.measure,
        price: property.totalPrice,
        paid: property.amountPaid,
        ownerName: property.ownerName,
        ownerPhone: "",
        ownerDocument: "",
        buyerName: property.ownerName,
        buyerEmail: "",
        dueDate: isPaid
          ? "Pagado"
          : property.nextPaymentDate
            ? new Date(property.nextPaymentDate).toLocaleDateString("es-NI")
            : "Sin fecha",
        status: isPaid ? "Pagado" : "Pendiente",
        accent: isPaid ? colors.green : colors.primaryLight,
        imageUrl: property.imageUrl ?? "",
      };
    });
  }, [apiProperties]);

  useEffect(() => {
    if (properties.length > 0 && !selectedPropertyId) {
      setSelectedPropertyId(properties[0].id);
    }
  }, [properties, selectedPropertyId]);

  useEffect(() => {
    if (
      selectedPropertyId &&
      properties.length > 0 &&
      !properties.some((property) => property.id === selectedPropertyId)
    ) {
      setSelectedPropertyId(properties[0].id);
    }
  }, [properties, selectedPropertyId]);

  if (isLoadingProperties) {
    return (
      <AppShell active={propertyConfig.category}>
        <LoadingState message="Cargando módulo de propiedades..." />
      </AppShell>
    );
  }

  return (
    <AppShell active={propertyConfig.category}>
      <Box
        sx={{
          width: "100%",
          minHeight: "calc(100vh - 48px)",
          px: {
            xs: 2,
            md: 4,
          },
          py: {
            xs: 2.5,
            md: 3,
          },
          bgcolor: colors.pageBg,
          color: colors.text,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1440,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <PropertyHeroHeader
            badge={propertyConfig.badge}
            title={propertyConfig.title}
            subtitle={propertyConfig.subtitle}
          />

          <PropertyMetricsGrid properties={properties} />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "minmax(0, 2fr) minmax(340px, 1fr)",
              },
              gap: {
                xs: 2,
                md: 2.5,
              },
              alignItems: "start",
              width: "100%",
              minWidth: 0,
            }}
          >
            <PropertyTerrainsSection
              properties={properties}
              onAddProperty={() => {
                setIsPropertyDialogOpen(true);
              }}
            />

            <PropertyPaymentSection properties={properties} />
          </Box>

          <AddPropertyModal
            open={isPropertyDialogOpen}
            onClose={() => {
              setIsPropertyDialogOpen(false);
            }}
            onCreated={(propertyId) => {
              setSelectedPropertyId(propertyId);
            }}
          />
        </Box>
      </Box>
    </AppShell>
  );
}
