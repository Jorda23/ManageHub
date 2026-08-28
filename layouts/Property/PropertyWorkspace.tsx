"use client";

import { useCallback, useMemo, useState } from "react";

import { Box } from "@mui/material";

import {
  PropertyHeroHeader,
  PropertyMetricsGrid,
  PropertyPaymentSection,
  PropertyTerrainsSection,
} from "./components";

import { useProperties, useUpdateProperty } from "@/hook/useProperties";

import {
  LoadingState,
  type PropertyItem,
  EditPropertyForm,
  EditPropertyValues,
} from "@/components";

import type { Property } from "@/shared/types/api.types";

import { propertyConfig } from "@/shared";
import { colors } from "@/theme/sharedColors";
import { AddPropertyForm } from "../../components/AddPropertyForm/AddPropertyForm";
import { PropertyTabs } from "./components/PropertyTabs";

export type PropertyWorkspaceTab = "properties" | "create";

export function PropertyWorkspace() {
  const { data: apiProperties = [], isLoading: isLoadingProperties } = useProperties();

  const { mutateAsync: updateProperty, isPending: isUpdatingProperty } = useUpdateProperty();

  const [activeTab, setActiveTab] = useState<PropertyWorkspaceTab>("properties");

  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

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

  const handleEditProperty = useCallback(
    (property: PropertyItem): void => {
      const rawProperty = apiProperties.find((item) => item.id === property.id) ?? null;

      setEditingProperty(rawProperty);
    },
    [apiProperties],
  );

  const handleUpdateProperty = useCallback(
    async (id: string, values: EditPropertyValues): Promise<void> => {
      try {
        await updateProperty({
          id,
          request: {
            name: values.name.trim(),
            projectName: values.projectName.trim(),
            measure: values.measure.trim(),
            location: values.location.trim(),
            ownerName: values.ownerName.trim(),
            identificationNumber: values.identificationNumber.trim(),
            nextPaymentDate: values.nextPaymentDate || null,
            imageUrl: values.imageUrl?.trim() || null,
            identificationImageUrl: values.identificationImageUrl?.trim() || null,
          },
        });

        setEditingProperty(null);
      } catch {
        throw new Error("No se pudo actualizar el terreno.");
      }
    },
    [updateProperty],
  );

  if (isLoadingProperties) {
    return <LoadingState message="Cargando módulo de propiedades..." />;
  }

  return (
    <Box
      sx={{
        width: "100%",
        px: {
          xs: 2,
          md: 4,
        },
        py: {
          xs: 2.5,
          md: 3,
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1440,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
        }}
      >
          <PropertyHeroHeader
            badge={propertyConfig.badge}
            title={propertyConfig.title}
            subtitle={propertyConfig.subtitle}
          />

          <PropertyTabs value={activeTab} onChange={setActiveTab} />

          {activeTab === "properties" ? (
            <>
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
                  onEditProperty={handleEditProperty}
                  onAddProperty={() => {
                    setActiveTab("create");
                  }}
                />

                <PropertyPaymentSection properties={properties} />
              </Box>
            </>
          ) : (
            <AddPropertyForm
              onCancel={() => {
                setActiveTab("properties");
              }}
              onCreated={() => {
                setActiveTab("properties");
              }}
            />
          )}

          <EditPropertyForm
            open={Boolean(editingProperty)}
            property={editingProperty}
            isSubmitting={isUpdatingProperty}
            onClose={() => {
              setEditingProperty(null);
            }}
            onSave={handleUpdateProperty}
          />
        </Box>
      </Box>
  );
}
