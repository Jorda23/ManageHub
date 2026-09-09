"use client";

import { useMemo } from "react";

import { FaChartLine, FaSeedling, FaTractor } from "react-icons/fa";

import { colors } from "@/theme/sharedColors";

import { ReportCellText, ReportResult } from "../components";
import { useGrainSalesReport } from "../hooks/useReports";
import type {
  GrainSaleRow,
  ReportColumn,
  ReportFilters,
  ReportMetric,
} from "../types/reports.types";
import { formatMoney, formatQuantity, formatReportDate } from "../utils/format";
import { formatSummaryDetail, formatSummaryValue, summarizeAmounts } from "../utils/reportStats";

type GrainSalesReportProps = {
  filters: ReportFilters;
};

export function GrainSalesReport({ filters }: Readonly<GrainSalesReportProps>) {
  const { data = [], isLoading, isError, refetch } = useGrainSalesReport(filters);

  const summary = useMemo(
    () =>
      summarizeAmounts(
        data.map((row) => ({ amount: row.total, currency: row.currency })),
      ),
    [data],
  );

  const metrics: ReportMetric[] = [
    {
      icon: <FaSeedling size={18} />,
      iconBg: colors.greenSoft,
      iconColor: colors.green,
      label: "Total vendido",
      value: formatSummaryValue(summary),
      detail: summary.isMixed
        ? formatSummaryDetail(summary)
        : `${summary.count} ventas`,
    },
    {
      icon: <FaTractor size={18} />,
      iconBg: colors.primarySoft,
      iconColor: colors.primary,
      label: "Número de ventas",
      value: String(summary.count),
      detail: "ventas de granos",
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

  const columns: ReportColumn<GrainSaleRow>[] = [
    {
      key: "date",
      header: "Fecha",
      width: "14%",
      render: (row) => <ReportCellText>{formatReportDate(row.date)}</ReportCellText>,
    },
    {
      key: "product",
      header: "Producto",
      width: "18%",
      render: (row) => <ReportCellText strong>{row.product}</ReportCellText>,
    },
    {
      key: "unit",
      header: "Unidad",
      width: "10%",
      render: (row) => <ReportCellText muted>{row.unit}</ReportCellText>,
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
    <ReportResult<GrainSaleRow>
      isLoading={isLoading}
      isError={isError}
      onRetry={() => refetch()}
      metrics={metrics}
      columns={columns}
      rows={data}
      emptyTitle="Sin ventas de granos"
      emptyDescription="No se encontraron ventas de granos con los filtros aplicados."
      emptyIcon={<FaSeedling size={34} />}
    />
  );
}