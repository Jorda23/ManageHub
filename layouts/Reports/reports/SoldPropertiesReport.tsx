"use client";

import { useMemo } from "react";

import { FaBuilding, FaChartLine, FaCoins } from "react-icons/fa";

import { colors } from "@/theme/sharedColors";

import { ReportCellText, ReportResult, ReportStatusBadge } from "../components";
import { useSoldPropertiesReport } from "../hooks/useReports";
import type {
  ReportColumn,
  ReportFilters,
  ReportMetric,
  SoldPropertyRow,
} from "../types/reports.types";
import { formatMoney, formatReportDate } from "../utils/format";
import { formatSummaryDetail, formatSummaryValue, summarizeAmounts } from "../utils/reportStats";

type SoldPropertiesReportProps = {
  filters: ReportFilters;
};

export function SoldPropertiesReport({ filters }: Readonly<SoldPropertiesReportProps>) {
  const { data = [], isLoading, isError, refetch } = useSoldPropertiesReport(filters);

  const summary = useMemo(
    () =>
      summarizeAmounts(
        data.map((row) => ({ amount: row.price, currency: row.currency })),
      ),
    [data],
  );

  const metrics: ReportMetric[] = [
    {
      icon: <FaCoins size={18} />,
      iconBg: colors.greenSoft,
      iconColor: colors.green,
      label: "Total vendido",
      value: formatSummaryValue(summary),
      detail: summary.isMixed
        ? formatSummaryDetail(summary)
        : `${summary.count} terrenos`,
    },
    {
      icon: <FaBuilding size={18} />,
      iconBg: colors.primarySoft,
      iconColor: colors.primary,
      label: "Terrenos vendidos",
      value: String(summary.count),
      detail: "propiedades registradas",
    },
    {
      icon: <FaChartLine size={18} />,
      iconBg: colors.orangeSoft,
      iconColor: colors.orange,
      label: "Promedio de venta",
      value: formatMoney(summary.count ? summary.total / summary.count : 0, summary.currency),
      detail: "por terreno",
    },
  ];

  const columns: ReportColumn<SoldPropertyRow>[] = [
    {
      key: "date",
      header: "Fecha",
      width: "16%",
      render: (row) => <ReportCellText>{formatReportDate(row.date)}</ReportCellText>,
    },
    {
      key: "property",
      header: "Terreno",
      width: "22%",
      render: (row) => <ReportCellText strong>{row.property}</ReportCellText>,
    },
    {
      key: "customer",
      header: "Cliente",
      width: "20%",
      render: (row) => <ReportCellText>{row.customer}</ReportCellText>,
    },
    {
      key: "price",
      header: "Precio de venta",
      width: "16%",
      align: "right",
      render: (row) => (
        <ReportCellText strong right>
          {formatMoney(row.price, row.currency)}
        </ReportCellText>
      ),
    },
    {
      key: "currency",
      header: "Moneda",
      width: "12%",
      render: (row) => <ReportCellText muted>{row.currency}</ReportCellText>,
    },
    {
      key: "status",
      header: "Estado",
      width: "14%",
      render: (row) => <ReportStatusBadge status={row.status} />,
    },
  ];

  return (
    <ReportResult<SoldPropertyRow>
      isLoading={isLoading}
      isError={isError}
      onRetry={() => refetch()}
      metrics={metrics}
      columns={columns}
      rows={data}
      emptyTitle="Sin terrenos vendidos"
      emptyDescription="No se encontraron terrenos vendidos con los filtros aplicados."
      emptyIcon={<FaBuilding size={34} />}
    />
  );
}