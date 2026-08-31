"use client";

import { useState } from "react";

import { Box } from "@mui/material";

import { usePaymentHistory } from "@/hook/useHistory";

import { HistoryEmptyState, HistoryFilters, HistoryTable } from "./components";

import type { PaymentHistoryFilters } from "@/shared";

const INITIAL_FILTERS: PaymentHistoryFilters = {
  search: "",
  type: "all",
  from: "",
  to: "",
};

export function History() {
  const [filters, setFilters] = useState<PaymentHistoryFilters>(INITIAL_FILTERS);

  const { data = [], isLoading, isError } = usePaymentHistory(filters);

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
      ) : data.length === 0 ? (
        <HistoryEmptyState />
      ) : (
        <HistoryTable items={data} />
      )}
    </Box>
  );
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
