"use client";

import { useMemo } from "react";

import { FaChartLine, FaCoins, FaReceipt } from "react-icons/fa";

import { colors } from "@/theme/sharedColors";

import {
  ReportCellText,
  ReportResult,
  ReportStatusBadge,
} from "../components";
import { useSalesReport } from "../hooks/useReports";
import type { ReportColumn, ReportFilters, ReportMetric, SaleReportRow } from "../types/reports.types";
import { formatMoney, formatReportDate } from "../utils/format";
import { formatSummaryDetail, formatSummaryValue, summarizeAmounts } from "../utils/reportStats";

type SalesReportProps = {
  filters: ReportFilters;
};

export function SalesReport({ filters }: Readonly<SalesReportProps>) {
  const { data = [], isLoading, isError, refetch } = useSalesReport(filters);

  const summary = useMemo(
    () =>
      summarizeAmounts(
        data.map((row) => ({ amount: row.total, currency: row.currency })),
      ),
    [data],
  );

  const metrics: ReportMetric[] = [
    {
      icon: <FaCoins size={18} />,
      iconBg: colors.greenSoft,
      iconColor: colors.green,
      label: "Total ventas",
      value: formatSummaryValue(summary),
      detail: summary.isMixed
        ? formatSummaryDetail(summary)
        : `${summary.count} operaciones`,
    },
    {
      icon: <FaReceipt size={18} />,
      iconBg: colors.primarySoft,
      iconColor: colors.primary,
      label: "Número de ventas",
      value: String(summary.count),
      detail: "transacciones registradas",
    },
    {
      icon: <FaChartLine size={18} />,
      iconBg: colors.orangeSoft,
      iconColor: colors.orange,
      label: "Promedio",
      value: formatMoney(summary.count ? summary.total / summary.count : 0, summary.currency),
      detail: "por operación",
    },
  ];

  const columns: ReportColumn<SaleReportRow>[] = [
    {
      key: "date",
      header: "Fecha",
      width: "16%",
      render: (row) => <ReportCellText>{formatReportDate(row.date)}</ReportCellText>,
    },
    {
      key: "customer",
      header: "Cliente",
      width: "20%",
      render: (row) => <ReportCellText strong>{row.customer}</ReportCellText>,
    },
    {
      key: "items",
      header: "Artículos",
      width: "16%",
      render: (row) => <ReportCellText>{row.items}</ReportCellText>,
    },
    {
      key: "total",
      header: "Total",
      width: "14%",
      align: "right",
      render: (row) => (
        <ReportCellText strong right>
          {formatMoney(row.total, row.currency)}
        </ReportCellText>
      ),
    },
    {
      key: "method",
      header: "Método",
      width: "20%",
      render: (row) => <ReportCellText muted>{row.paymentMethod}</ReportCellText>,
    },
    {
      key: "status",
      header: "Estado",
      width: "14%",
      render: (row) => <ReportStatusBadge status={row.status} />,
    },
  ];

  return (
    <ReportResult<SaleReportRow>
      isLoading={isLoading}
      isError={isError}
      onRetry={() => refetch()}
      metrics={metrics}
      columns={columns}
      rows={data}
      emptyTitle="Sin ventas en el período"
      emptyDescription="No se encontraron ventas con los filtros aplicados."
      emptyIcon={<FaReceipt size={34} />}
    />
  );
}