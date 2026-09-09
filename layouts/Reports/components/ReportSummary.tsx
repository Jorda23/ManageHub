"use client";

import { Box } from "@mui/material";

import { MetricCard } from "@/components/MetricCard";

import type { ReportMetric } from "../types/reports.types";

type ReportSummaryProps = {
  metrics: ReportMetric[];
};

export function ReportSummary({ metrics }: Readonly<ReportSummaryProps>) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          xl: "repeat(4, minmax(0, 1fr))",
        },
        gap: {
          xs: 1.5,
          md: 2,
        },
        width: "100%",
        minWidth: 0,
      }}
    >
      {metrics.map((metric) => (
        <MetricCard key={metric.label} {...metric} />
      ))}
    </Box>
  );
}