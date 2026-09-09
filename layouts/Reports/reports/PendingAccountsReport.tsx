"use client";

import { useMemo } from "react";

import { FaCalendarAlt, FaUserClock, FaWallet } from "react-icons/fa";

import { colors } from "@/theme/sharedColors";

import { ReportCellText, ReportResult, ReportStatusBadge } from "../components";
import { usePendingAccountsReport } from "../hooks/useReports";
import type {
  PendingAccountRow,
  ReportColumn,
  ReportFilters,
  ReportMetric,
} from "../types/reports.types";
import { formatMoney, formatReportDate } from "../utils/format";
import { formatSummaryDetail, formatSummaryValue, summarizeAmounts } from "../utils/reportStats";

type PendingAccountsReportProps = {
  filters: ReportFilters;
};

export function PendingAccountsReport({ filters }: Readonly<PendingAccountsReportProps>) {
  const { data = [], isLoading, isError, refetch } = usePendingAccountsReport(filters);

  const summary = useMemo(
    () =>
      summarizeAmounts(
        data.map((row) => ({ amount: row.pendingBalance, currency: row.currency })),
      ),
    [data],
  );

  const nextDueCount = useMemo(
    () => data.filter((row) => Boolean(row.nextPaymentDate)).length,
    [data],
  );

  const metrics: ReportMetric[] = [
    {
      icon: <FaWallet size={18} />,
      iconBg: colors.orangeSoft,
      iconColor: colors.orange,
      label: "Total pendiente",
      value: formatSummaryValue(summary),
      detail: summary.isMixed
        ? formatSummaryDetail(summary)
        : `${summary.count} cuentas`,
    },
    {
      icon: <FaUserClock size={18} />,
      iconBg: colors.primarySoft,
      iconColor: colors.primary,
      label: "Cuentas pendientes",
      value: String(summary.count),
      detail: "con saldo por cobrar",
    },
    {
      icon: <FaCalendarAlt size={18} />,
      iconBg: colors.dangerSoft,
      iconColor: colors.danger,
      label: "Próximos vencimientos",
      value: String(nextDueCount),
      detail: "con fecha de pago definida",
    },
  ];

  const columns: ReportColumn<PendingAccountRow>[] = [
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
      key: "pendingBalance",
      header: "Saldo pendiente",
      width: "18%",
      align: "right",
      render: (row) => (
        <ReportCellText strong right>
          {formatMoney(row.pendingBalance, row.currency)}
        </ReportCellText>
      ),
    },
    {
      key: "nextPaymentDate",
      header: "Próxima fecha de pago",
      width: "22%",
      render: (row) => (
        <ReportCellText muted>{formatReportDate(row.nextPaymentDate)}</ReportCellText>
      ),
    },
    {
      key: "status",
      header: "Estado",
      width: "14%",
      render: (row) => <ReportStatusBadge status={row.status} />,
    },
  ];

  return (
    <ReportResult<PendingAccountRow>
      isLoading={isLoading}
      isError={isError}
      onRetry={() => refetch()}
      metrics={metrics}
      columns={columns}
      rows={data}
      emptyTitle="Sin cuentas pendientes"
      emptyDescription="No hay saldos pendientes con los filtros aplicados."
      emptyIcon={<FaWallet size={34} />}
    />
  );
}