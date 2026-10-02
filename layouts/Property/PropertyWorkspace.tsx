"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { Box, Dialog } from "@mui/material";

import dayjs from "dayjs";

import { PropertyHeroHeader, PropertyPaymentSection, PropertyTerrainsSection } from "./components";

import { useDeleteProperty, useProperties, useUpdateProperty } from "@/hook/useProperties";

import {
  ConfirmDialog,
  LoadingState,
  type PropertyItem,
  EditPropertyForm,
  EditPropertyValues,
  useToast,
} from "@/components";

import { resolveDeleteErrorMessage } from "@/shared/utils/apiError";

import type { Property, PropertyFilters } from "@/shared/types/api.types";

import { propertyConfig } from "@/shared";
import { normalizeCurrency } from "@/shared/utils/currency";
import { colors } from "@/theme/sharedColors";
import { AddPropertyForm } from "../../components/AddPropertyForm/AddPropertyForm";
import { PropertyTabs } from "./components/PropertyTabs";
import { INFINITE_SCROLL_PAGE_SIZE, useInfiniteList } from "@/hook/useInfiniteList";
import { getProperties } from "@/service/api";

export type PropertyWorkspaceTab = "properties" | "create";

export function PropertyWorkspace() {
  const { data: apiProperties = [], isLoading: isLoadingProperties } = useProperties();

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [propertyOrder, setPropertyOrder] = useState<"created" | "alphabetical">("created");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const searchFilters = useMemo<PropertyFilters>(
    () => ({
      ...(debouncedSearch ? { search: debouncedSearch } : {}),
      ...(propertyOrder === "alphabetical" ? { alphabetical: true } : {}),
    }),
    [debouncedSearch, propertyOrder],
  );

  const {
    data: infiniteProperties,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isSearchLoading,
  } = useInfiniteList<Property>({
    queryKey: ["properties", "inventory", searchFilters],
    queryFn: (page) =>
      getProperties({
        ...searchFilters,
        page,
        limit: INFINITE_SCROLL_PAGE_SIZE,
      }),
  });

  const visibleProperties = useMemo(
    () => infiniteProperties?.pages.flatMap((page) => page) ?? [],
    [infiniteProperties],
  );

  const { mutateAsync: updateProperty, isPending: isUpdatingProperty } = useUpdateProperty();

  const { mutateAsync: deleteProperty, isPending: isDeletingProperty } = useDeleteProperty();

  const { showSuccess, showError } = useToast();

  const [activeTab, setActiveTab] = useState<PropertyWorkspaceTab>("properties");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const [deletingProperty, setDeletingProperty] = useState<PropertyItem | null>(null);

  const toItems = useCallback((list: Property[]): PropertyItem[] => {
    return list.map((property) => {
      const isPaid = property.status === "Paid";

      return {
        id: property.id,
        name: property.name,
        code: property.code,
        location: property.location,
        size: property.measure,
        price: property.totalPrice,
        currency: normalizeCurrency(property.currency ?? "NIO"),
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
  }, []);

  const properties = useMemo(() => toItems(apiProperties), [apiProperties, toItems]);

  const filteredProperties = useMemo(
    () => toItems(visibleProperties),
    [visibleProperties, toItems],
  );

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
            nextPaymentDate: values.nextPaymentDate
              ? dayjs(values.nextPaymentDate).startOf("day").toISOString()
              : null,
            imageUrl: values.imageUrl?.trim() || null,
            identificationImageUrl: values.identificationImageUrl?.trim() || null,
          },
        });

        showSuccess("Terreno actualizado correctamente.");

        setEditingProperty(null);
      } catch {
        showError("No se pudo actualizar el terreno.");

        throw new Error("No se pudo actualizar el terreno.");
      }
    },
    [updateProperty, showSuccess, showError],
  );

  const handleDeleteProperty = useCallback(async (): Promise<void> => {
    if (!deletingProperty) {
      return;
    }

    try {
      await deleteProperty(deletingProperty.id);

      showSuccess("Terreno eliminado correctamente.");

      setDeletingProperty(null);
    } catch (error) {
      showError(
        resolveDeleteErrorMessage(error, {
          conflict: "No se pudo eliminar el terreno porque tiene abonos registrados.",
          notFound: "El terreno ya no existe.",
          fallback: "No se pudo eliminar el terreno.",
        }),
      );
    }
  }, [deleteProperty, deletingProperty, showSuccess, showError]);

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
          <PropertyTerrainsSection
            properties={filteredProperties}
            search={search}
            onSearchChange={setSearch}
            propertyOrder={propertyOrder}
            onPropertyOrderChange={setPropertyOrder}
            isInitialLoading={isSearchLoading}
            hasMore={hasNextPage ?? false}
            isLoadingMore={isFetchingNextPage}
            onLoadMore={() => {
              void fetchNextPage();
            }}
            onEditProperty={handleEditProperty}
            onDeleteProperty={(property) => {
              setDeletingProperty(property);
            }}
            onRegisterPayment={() => setIsPaymentModalOpen(true)}
            onAddProperty={() => {
              setActiveTab("create");
            }}
          />
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

        <ConfirmDialog
          open={Boolean(deletingProperty)}
          title="Eliminar terreno"
          description={`¿Seguro que deseas eliminar "${deletingProperty?.name ?? ""}"? Esta acción no se puede deshacer.`}
          confirmLabel="Eliminar"
          isPending={isDeletingProperty}
          onClose={() => {
            setDeletingProperty(null);
          }}
          onConfirm={() => {
            void handleDeleteProperty();
          }}
        />

        <Dialog
          open={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          fullWidth
          maxWidth={false}
          scroll="paper"
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                width: { xs: "calc(100% - 24px)", sm: "calc(100% - 64px)" },
                maxWidth: 620,
                maxHeight: { xs: "calc(100dvh - 24px)", sm: "calc(100dvh - 64px)" },
                m: { xs: 1.5, sm: 4 },
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                minHeight: 0,
                overflow: "hidden",
                border: "1px solid rgba(148, 163, 184, 0.28)",
                boxShadow: "0 28px 80px rgba(15, 23, 42, 0.24)",
              },
            },
            backdrop: {
              sx: {
                bgcolor: "rgba(15, 23, 42, 0.56)",
                backdropFilter: "blur(5px)",
              },
            },
          }}
        >
          <PropertyPaymentSection
            properties={properties}
            onRegistered={() => setIsPaymentModalOpen(false)}
          />
        </Dialog>
      </Box>
    </Box>
  );
}
