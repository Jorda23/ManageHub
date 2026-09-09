"use client";

import { useState } from "react";

import { Box, Typography } from "@mui/material";

import { FaChartBar } from "react-icons/fa";

import { colors } from "@/theme/sharedColors";

import { ReportFilters, ReportTabs } from "./components";
import { useReportFilters } from "./hooks/useReportFilters";
import {
  GrainSalesReport,
  HardwareSalesReport,
  InventoryReport,
  PendingAccountsReport,
  ProfitReport,
  PropertyPaymentsReport,
  SalesReport,
  SoldPropertiesReport,
} from "./reports";

import type { ReportFilters as ReportFiltersType, ReportType } from "./types/reports.types";

export function ReportsWorkspace() {
  const [reportType, setReportType] = useState<ReportType>("sales");
  const { filters, setFilters } = useReportFilters();

  const handleFiltersChange = (next: ReportFiltersType) => {
    setFilters(next);
  };

  return (
    <Box
      sx={{
        width: "100%",
        px: {
          xs: 2,
          md: 4,
        },
        py: {
          xs: 2.5,
          md: 3,
        },
      }}
    >
      <Box
        sx={{
          mb: {
            xs: 2,
            md: 2.5,
          },
          display: "flex",
          alignItems: "center",
          gap: 1.25,
        }}
      >
        <Box
          sx={{
            width: {
              xs: 40,
              sm: 44,
            },
            height: {
              xs: 40,
              sm: 44,
            },
            borderRadius: {
              xs: "12px",
              sm: "14px",
            },
            display: "grid",
            placeItems: "center",
            bgcolor: colors.primarySoft,
            color: colors.primary,
            flexShrink: 0,
          }}
        >
          <FaChartBar size={17} />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              color: "#172033",
              fontSize: {
                xs: 18,
                md: 20,
              },
              fontWeight: 900,
            }}
          >
            Reportes
          </Typography>

          <Typography
            sx={{
              mt: 0.35,
              color: colors.muted,
              fontSize: {
                xs: 11.5,
                md: 12,
              },
              fontWeight: 500,
            }}
          >
            Análisis y reportes del negocio
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: 1440,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: {
            xs: 1.5,
            md: 2,
          },
          minWidth: 0,
        }}
      >
        <ReportTabs value={reportType} onChange={setReportType} />

        <ReportFilters value={filters} onChange={handleFiltersChange} />

        {renderReport(reportType, filters)}
      </Box>
    </Box>
  );
}

function renderReport(type: ReportType, filters: ReportFiltersType) {
  switch (type) {
    case "sales":
      return <SalesReport filters={filters} />;

    case "sold-properties":
      return <SoldPropertiesReport filters={filters} />;

    case "property-payments":
      return <PropertyPaymentsReport filters={filters} />;

    case "pending-accounts":
      return <PendingAccountsReport filters={filters} />;

    case "inventory":
      return <InventoryReport />;

    case "grain-sales":
      return <GrainSalesReport filters={filters} />;

    case "hardware-sales":
      return <HardwareSalesReport filters={filters} />;

    case "profit":
      return <ProfitReport filters={filters} />;
  }
}