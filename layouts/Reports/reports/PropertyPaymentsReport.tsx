"use client";

import { useMemo } from "react";

import { FaCoins, FaHandHoldingUsd, FaReceipt } from "react-icons/fa";

import { colors } from "@/theme/sharedColors";

import { ReportCellText, ReportResult } from "../components";
import { usePropertyPaymentsReport } from "../hooks/useReports";
import type {
  PropertyPaymentRow,
  ReportColumn,
  ReportFilters,
  ReportMetric,
} from "../types/reports.types";
import { formatMoney, formatReportDate } from "../utils/format";
import { formatSummaryDetail, formatSummaryValue, summarizeAmounts } from "../utils/reportStats";

type PropertyPaymentsReportProps = {
  filters: ReportFilters;
};

export function PropertyPaymentsReport({ filters }: Readonly<PropertyPaymentsReportProps>) {
  const { data = [], isLoading, isError, refetch } = usePropertyPaymentsReport(filters);

  const summary = useMemo(
    () =>
      summarizeAmounts(
        data.map((row) => ({ amount: row.amount, currency: row.currency })),
      ),
    [data],
  );

  const metrics: ReportMetric[] = [
    {
      icon: <FaCoins size={18} />,
      iconBg: colors.greenSoft,
      iconColor: colors.green,
      label: "Total recibido",
      value: formatSummaryValue(summary),
      detail: summary.isMixed
        ? formatSummaryDetail(summary)
        : `${summary.count} pagos`,
    },
    {
      icon: <FaReceipt size={18} />,
      iconBg: colors.primarySoft,
      iconColor: colors.primary,
      label: "Número de pagos",
      value: String(summary.count),
      detail: "abonos registrados",
    },
    {
      icon: <FaHandHoldingUsd size={18} />,
      iconBg: colors.orangeSoft,
      iconColor: colors.orange,
      label: "Promedio por pago",
      value: formatMoney(summary.count ? summary.total / summary.count : 0, summary.currency),
      detail: "por abono",
    },
  ];

  const columns: ReportColumn<PropertyPaymentRow>[] = [
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
      key: "property",
      header: "Terreno",
      width: "22%",
      render: (row) => <ReportCellText>{row.property}</ReportCellText>,
    },
    {
      key: "amount",
      header: "Monto",
      width: "16%",
      align: "right",
      render: (row) => (
        <ReportCellText strong right>
          {formatMoney(row.amount, row.currency)}
        </ReportCellText>
      ),
    },
    {
      key: "method",
      header: "Método de pago",
      width: "18%",
      render: (row) => <ReportCellText muted>{row.paymentMethod}</ReportCellText>,
    },
    {
      key: "currency",
      header: "Moneda",
      width: "8%",
      render: (row) => <ReportCellText muted>{row.currency}</ReportCellText>,
    },
  ];

  return (
    <ReportResult<PropertyPaymentRow>
      isLoading={isLoading}
      isError={isError}
      onRetry={() => refetch()}
      metrics={metrics}
      columns={columns}
      rows={data}
      emptyTitle="Sin pagos de terrenos"
      emptyDescription="No se encontraron abonos con los filtros aplicados."
      emptyIcon={<FaReceipt size={34} />}
    />
  );
}