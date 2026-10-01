"use client";

import { useCallback, useState } from "react";

import { Box } from "@mui/material";

import { usePaymentHistory } from "@/hook/useHistory";

import { useDeletePropertyPayment } from "@/hook/useProperties";

import { resolveDeleteErrorMessage } from "@/shared/utils/apiError";

import { HistoryEmptyState, HistoryFilters, HistoryTable } from "./components";

import { ConfirmDialog, useToast } from "@/components";

import { formatPrice, type PaymentHistoryFilters, type PaymentHistoryItem } from "@/shared";

const INITIAL_FILTERS: PaymentHistoryFilters = {
  search: "",
  type: "all",
  from: "",
  to: "",
};

export function History() {
  const [filters, setFilters] = useState<PaymentHistoryFilters>(INITIAL_FILTERS);

  const { items, isLoading, isError, hasMore, isLoadingMore, loadMore } =
    usePaymentHistory(filters);

  const { mutateAsync: deletePropertyPayment, isPending: isDeletingPayment } =
    useDeletePropertyPayment();

  const { showSuccess, showError } = useToast();

  const [deletingPayment, setDeletingPayment] = useState<PaymentHistoryItem | null>(null);

  const handleDeletePayment = useCallback(async (): Promise<void> => {
    if (!deletingPayment) {
      return;
    }

    try {
      await deletePropertyPayment(deletingPayment.id);

      showSuccess("Abono eliminado correctamente.");

      setDeletingPayment(null);
    } catch (error) {
      showError(
        resolveDeleteErrorMessage(error, {
          conflict: "No se pudo eliminar el abono porque el terreno tiene movimientos asociados.",
          notFound: "El abono ya no existe.",
          fallback: "No se pudo eliminar el abono.",
        }),
      );
    }
  }, [deletePropertyPayment, deletingPayment, showSuccess, showError]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      <HistoryFilters value={filters} onChange={setFilters} />

      {isLoading ? (
        <HistoryLoadingState />
      ) : isError ? (
        <HistoryErrorState />
      ) : items.length === 0 ? (
        <HistoryEmptyState />
      ) : (
        <HistoryTable
          items={items}
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
          onLoadMore={loadMore}
          onDeletePayment={(item) => {
            setDeletingPayment(item);
          }}
          isDeletingPaymentId={isDeletingPayment ? (deletingPayment?.id ?? null) : null}
        />
      )}

      <ConfirmDialog
        open={Boolean(deletingPayment)}
        title="Eliminar abono"
        description={`¿Seguro que deseas eliminar el abono de "${deletingPayment?.name ?? ""}" por ${deletingPayment ? formatPaymentAmount(deletingPayment) : ""}? El saldo pendiente del terreno se recalculará.`}
        confirmLabel="Eliminar"
        isPending={isDeletingPayment}
        onClose={() => {
          setDeletingPayment(null);
        }}
        onConfirm={() => {
          void handleDeletePayment();
        }}
      />
    </Box>
  );
}

function formatPaymentAmount(item: PaymentHistoryItem): string {
  return formatPrice(item.amount, {
    locale: item.currency === "USD" ? "en-US" : "es-NI",
    currency: item.currency,
  });
}

function HistoryLoadingState() {
  return (
    <Box
      sx={{
        minHeight: 190,
        display: "grid",
        placeItems: "center",
        bgcolor: "#ffffff",
        border: "1px solid #d8e0eb",
        borderRadius: 2,
      }}
    >
      Cargando historial...
    </Box>
  );
}

function HistoryErrorState() {
  return (
    <Box
      sx={{
        minHeight: 190,
        display: "grid",
        placeItems: "center",
        bgcolor: "#ffffff",
        border: "1px solid #fecaca",
        borderRadius: 2,
        color: "#dc2626",
      }}
    >
      No fue posible cargar el historial.
    </Box>
  );
}
