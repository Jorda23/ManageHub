"use client";

import { useMemo } from "react";

import { Box, Typography } from "@mui/material";

import { FaCalculator, FaChartPie, FaMoneyBillWave, FaPercent } from "react-icons/fa";

import { colors } from "@/theme/sharedColors";

import {
  ReportCellText,
  ReportEmptyState,
  ReportErrorState,
  ReportLoadingState,
  ReportSummary,
  ReportTable,
} from "../components";
import { useProfitReport } from "../hooks/useReports";
import type {
  ProfitModuleRow,
  ReportColumn,
  ReportFilters,
  ReportMetric,
} from "../types/reports.types";
import { formatMoney } from "../utils/format";
import { formatSummaryDetail, formatSummaryValue, summarizeAmounts } from "../utils/reportStats";

type ProfitReportProps = {
  filters: ReportFilters;
};

export function ProfitReport({ filters }: Readonly<ProfitReportProps>) {
  const { data, isLoading, isError, refetch } = useProfitReport(filters);

  const modules = useMemo(() => data?.modules ?? [], [data]);

  const incomeSummary = useMemo(
    () =>
      summarizeAmounts(
        modules.map((row) => ({ amount: row.income, currency: row.currency })),
      ),
    [modules],
  );

  const visibleModules = useMemo(
    () => modules.filter((row) => row.count > 0),
    [modules],
  );

  const metrics: ReportMetric[] = [
    {
      icon: <FaMoneyBillWave size={18} />,
      iconBg: colors.greenSoft,
      iconColor: colors.green,
      label: "Ingresos totales",
      value: formatSummaryValue(incomeSummary),
      detail: incomeSummary.isMixed
        ? formatSummaryDetail(incomeSummary)
        : "ingresos del período",
    },
    {
      icon: <FaCalculator size={18} />,
      iconBg: colors.primarySoft,
      iconColor: colors.primary,
      label: "Costos",
      value: "—",
      detail: "sin registro de costos",
    },
    {
      icon: <FaChartPie size={18} />,
      iconBg: colors.orangeSoft,
      iconColor: colors.orange,
      label: "Ganancia neta",
      value: "—",
      detail: "ingresos − costos",
    },
    {
      icon: <FaPercent size={18} />,
      iconBg: colors.purpleSoft,
      iconColor: colors.purple,
      label: "Margen de ganancia",
      value: "—",
      detail: "ganancia ÷ ingresos",
    },
  ];

  const columns: ReportColumn<ProfitModuleRow>[] = [
    {
      key: "module",
      header: "Módulo",
      width: "34%",
      render: (row) => <ReportCellText strong>{row.module}</ReportCellText>,
    },
    {
      key: "income",
      header: "Ingresos",
      width: "34%",
      align: "right",
      render: (row) => (
        <ReportCellText strong right>
          {formatMoney(row.income, row.currency)}
        </ReportCellText>
      ),
    },
    {
      key: "count",
      header: "Operaciones",
      width: "32%",
      align: "right",
      render: (row) => <ReportCellText right>{row.count}</ReportCellText>,
    },
  ];

  if (isError) {
    return <ReportErrorState onRetry={() => refetch()} />;
  }

  if (isLoading && !data) {
    return <ReportLoadingState />;
  }

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

      <Box
        sx={{
          p: {
            xs: 1.5,
            sm: 2,
          },
          bgcolor: colors.orangeSoft,
          border: `1px solid ${colors.orangeBorder}`,
          borderRadius: "14px",
        }}
      >
        <Typography
          sx={{
            color: "#92400e",
            fontSize: 12,
            fontWeight: 700,
            lineHeight: 1.5,
          }}
        >
          La ganancia neta y el margen no se calculan porque el sistema no registra los
          costos de los productos. A continuación se muestra el desglose de ingresos por
          módulo.
        </Typography>
      </Box>

      {visibleModules.length > 0 ? (
        <ReportTable
          columns={columns}
          rows={visibleModules}
          minWidth={520}
        />
      ) : (
        <ReportEmptyState
          title="Sin ingresos en el período"
          description="No se registraron ventas ni pagos con los filtros aplicados."
          icon={<FaChartPie size={34} />}
        />
      )}
    </Box>
  );
}