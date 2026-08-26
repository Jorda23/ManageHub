import { useMemo } from "react";

import { Box } from "@mui/material";

import { FaClipboardCheck, FaFileContract, FaHome, FaMoneyBillWave } from "react-icons/fa";

import { MetricCard, type PropertyItem } from "@/components";
import { formatCurrency, getPendingAmount, type PropertyMetric } from "@/shared";
import { colors } from "@/theme/sharedColors";

type PropertyMetricsGridProps = {
  properties: PropertyItem[];
};

export function PropertyMetricsGrid({ properties }: PropertyMetricsGridProps) {
  const totalPortfolioValue = useMemo(() => {
    return properties.reduce((total, property) => total + property.price, 0);
  }, [properties]);

  const totalPaid = useMemo(() => {
    return properties.reduce((total, property) => total + property.paid, 0);
  }, [properties]);

  const totalPending = useMemo(() => {
    return properties.reduce((total, property) => total + getPendingAmount(property), 0);
  }, [properties]);

  const paidAccounts = useMemo(() => {
    return properties.filter((property) => property.status === "Pagado").length;
  }, [properties]);

  const metrics: PropertyMetric[] = [
    {
      icon: <FaHome />,
      iconBg: colors.primarySoft,
      iconColor: colors.primaryLight,
      label: "Terrenos activos",
      value: properties.length.toString(),
      detail: "Captados por clientes",
    },
    {
      icon: <FaMoneyBillWave />,
      iconBg: colors.greenSoft,
      iconColor: colors.green,
      label: "Total abonado",
      value: formatCurrency(totalPaid),
      detail: "Pagos confirmados",
    },
    {
      icon: <FaFileContract />,
      iconBg: colors.orangeSoft,
      iconColor: colors.orange,
      label: "Saldo pendiente",
      value: formatCurrency(totalPending),
      detail: "Por cobrar",
    },
    {
      icon: <FaClipboardCheck />,
      iconBg: colors.purpleSoft,
      iconColor: colors.purple,
      label: "Cuentas pagadas",
      value: `${paidAccounts}/${properties.length}`,
      detail: formatCurrency(totalPortfolioValue),
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          lg: "repeat(4, minmax(0, 1fr))",
        },
        gap: {
          xs: 1.5,
          md: 2,
        },
      }}
    >
      {metrics.map((metric) => (
        <MetricCard key={metric.label} {...metric} />
      ))}
    </Box>
  );
}
