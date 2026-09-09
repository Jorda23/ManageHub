"use client";

import { useMemo } from "react";

import { FaBoxes, FaCube, FaLayerGroup, FaTag } from "react-icons/fa";

import { colors } from "@/theme/sharedColors";

import { ReportCellText, ReportResult } from "../components";
import { useInventoryReport } from "../hooks/useReports";
import type { InventoryRow, ReportColumn, ReportMetric } from "../types/reports.types";
import { formatMoney, formatQuantity } from "../utils/format";
import { formatSummaryDetail, formatSummaryValue, summarizeAmounts } from "../utils/reportStats";

export function InventoryReport() {
  const { data = [], isLoading, isError, refetch } = useInventoryReport();

  const quantityTotal = useMemo(
    () => data.reduce((total, row) => total + (Number.isFinite(row.quantity) ? row.quantity : 0), 0),
    [data],
  );

  const valueSummary = useMemo(
    () =>
      summarizeAmounts(
        data.map((row) => ({ amount: row.totalValue, currency: row.currency })),
      ),
    [data],
  );

  const metrics: ReportMetric[] = [
    {
      icon: <FaLayerGroup size={18} />,
      iconBg: colors.primarySoft,
      iconColor: colors.primary,
      label: "Total de productos",
      value: String(data.length),
      detail: "productos en inventario",
    },
    {
      icon: <FaCube size={18} />,
      iconBg: colors.greenSoft,
      iconColor: colors.green,
      label: "Unidades disponibles",
      value: formatQuantity(quantityTotal),
      detail: "unidades en stock",
    },
    {
      icon: <FaBoxes size={18} />,
      iconBg: colors.orangeSoft,
      iconColor: colors.orange,
      label: "Valor estimado",
      value: formatSummaryValue(valueSummary),
      detail: valueSummary.isMixed
        ? formatSummaryDetail(valueSummary)
        : "a precio de venta",
    },
  ];

  const columns: ReportColumn<InventoryRow>[] = [
    {
      key: "product",
      header: "Producto",
      width: "24%",
      render: (row) => <ReportCellText strong>{row.product}</ReportCellText>,
    },
    {
      key: "category",
      header: "Categoría",
      width: "18%",
      render: (row) => <ReportCellText muted>{row.category}</ReportCellText>,
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
      key: "unit",
      header: "Unidad",
      width: "10%",
      render: (row) => <ReportCellText muted>{row.unit}</ReportCellText>,
    },
    {
      key: "price",
      header: "Precio",
      width: "14%",
      align: "right",
      render: (row) => (
        <ReportCellText right>{formatMoney(row.price, row.currency)}</ReportCellText>
      ),
    },
    {
      key: "totalValue",
      header: "Valor total",
      width: "16%",
      align: "right",
      render: (row) => (
        <ReportCellText strong right>
          {formatMoney(row.totalValue, row.currency)}
        </ReportCellText>
      ),
    },
  ];

  return (
    <ReportResult<InventoryRow>
      isLoading={isLoading}
      isError={isError}
      onRetry={() => refetch()}
      metrics={metrics}
      columns={columns}
      rows={data}
      emptyTitle="Sin productos en inventario"
      emptyDescription="No hay productos registrados en ferretería ni granos básicos."
      emptyIcon={<FaTag size={34} />}
    />
  );
}