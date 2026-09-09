"use client";

import { useMemo } from "react";

import { FaChartLine, FaReceipt, FaTools } from "react-icons/fa";

import { colors } from "@/theme/sharedColors";

import { ReportCellText, ReportResult } from "../components";
import { useHardwareSalesReport } from "../hooks/useReports";
import type {
  HardwareSaleRow,
  ReportColumn,
  ReportFilters,
  ReportMetric,
} from "../types/reports.types";
import { formatMoney, formatQuantity, formatReportDate } from "../utils/format";
import { formatSummaryDetail, formatSummaryValue, summarizeAmounts } from "../utils/reportStats";

type HardwareSalesReportProps = {
  filters: ReportFilters;
};

export function HardwareSalesReport({ filters }: Readonly<HardwareSalesReportProps>) {
  const { data = [], isLoading, isError, refetch } = useHardwareSalesReport(filters);

  const summary = useMemo(
    () =>
      summarizeAmounts(
        data.map((row) => ({ amount: row.total, currency: row.currency })),
      ),
    [data],
  );

  const metrics: ReportMetric[] = [
    {
      icon: <FaReceipt size={18} />,
      iconBg: colors.greenSoft,
      iconColor: colors.green,
      label: "Total vendido",
      value: formatSummaryValue(summary),
      detail: summary.isMixed
        ? formatSummaryDetail(summary)
        : `${summary.count} ventas`,
    },
    {
      icon: <FaTools size={18} />,
      iconBg: colors.primarySoft,
      iconColor: colors.primary,
      label: "Número de ventas",
      value: String(summary.count),
      detail: "ventas de ferretería",
    },
    {
      icon: <FaChartLine size={18} />,
      iconBg: colors.orangeSoft,
      iconColor: colors.orange,
      label: "Promedio por venta",
      value: formatMoney(summary.count ? summary.total / summary.count : 0, summary.currency),
      detail: "por operación",
    },
  ];

  const columns: ReportColumn<HardwareSaleRow>[] = [
    {
      key: "date",
      header: "Fecha",
      width: "16%",
      render: (row) => <ReportCellText>{formatReportDate(row.date)}</ReportCellText>,
    },
    {
      key: "product",
      header: "Producto",
      width: "22%",
      render: (row) => <ReportCellText strong>{row.product}</ReportCellText>,
    },
    {
      key: "quantity",
      header: "Cantidad",
      width: "12%",
      align: "right",
      render: (row) => (
        <ReportCellText strong right>
          {formatQuantity(row.quantity)}
        </ReportCellText>
      ),
    },
    {
      key: "unitPrice",
      header: "Precio unitario",
      width: "16%",
      align: "right",
      render: (row) => (
        <ReportCellText right>{formatMoney(row.unitPrice, row.currency)}</ReportCellText>
      ),
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
      width: "16%",
      render: (row) => <ReportCellText muted>{row.paymentMethod}</ReportCellText>,
    },
  ];

  return (
    <ReportResult<HardwareSaleRow>
      isLoading={isLoading}
      isError={isError}
      onRetry={() => refetch()}
      metrics={metrics}
      columns={columns}
      rows={data}
      emptyTitle="Sin ventas de ferretería"
      emptyDescription="No se encontraron ventas de ferretería con los filtros aplicados."
      emptyIcon={<FaTools size={34} />}
    />
  );
}