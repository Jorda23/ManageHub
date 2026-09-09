"use client";

import { Box } from "@mui/material";

import type { ReactNode } from "react";

import type { ReportColumn, ReportMetric } from "../types/reports.types";

import { ReportEmptyState } from "./ReportEmptyState";
import { ReportErrorState, ReportLoadingState } from "./ReportState";
import { ReportSummary } from "./ReportSummary";
import { ReportTable } from "./ReportTable";

type ReportResultProps<T> = {
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
  metrics: ReportMetric[];
  columns: ReportColumn<T>[];
  rows: T[];
  minWidth?: number;
  emptyTitle: string;
  emptyDescription?: string;
  emptyIcon?: ReactNode;
};

export function ReportResult<T>({
  isLoading,
  isError,
  onRetry,
  metrics,
  columns,
  rows,
  minWidth,
  emptyTitle,
  emptyDescription,
  emptyIcon,
}: Readonly<ReportResultProps<T>>) {
  if (isError) {
    return <ReportErrorState onRetry={onRetry} />;
  }

  if (isLoading && !rows.length) {
    return <ReportLoadingState />;
  }

  const hasRows = rows.length > 0;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: {
          xs: 1.5,
          md: 2,
        },
        width: "100%",
        minWidth: 0,
      }}
    >
      <ReportSummary metrics={metrics} />

      {hasRows ? (
        <ReportTable columns={columns} rows={rows} minWidth={minWidth} />
      ) : (
        <ReportEmptyState
          title={emptyTitle}
          description={emptyDescription}
          icon={emptyIcon}
        />
      )}
    </Box>
  );
}