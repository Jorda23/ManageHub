"use client";

import { Box, Button, Typography } from "@mui/material";

import { colors } from "@/theme/sharedColors";

import { reportTypes } from "../data/reports.data";

import type { ReportType } from "../types/reports.types";

type ReportTabsProps = {
  value: ReportType;
  onChange: (value: ReportType) => void;
};

export function ReportTabs({ value, onChange }: Readonly<ReportTabsProps>) {
  return (
    <Box
      role="tablist"
      sx={{
        display: "flex",
        alignItems: "stretch",
        gap: { xs: 0.75, sm: 1 },
        width: "100%",
        py: 0.25,
        overflowX: "auto",
        scrollbarWidth: "none",

        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {reportTypes.map(({ value: type, label, icon: Icon }) => {
        const isActive = value === type;

        return (
          <Button
            key={type}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(type)}
            disableElevation
            disableRipple
            sx={{
              flex: "0 0 auto",
              minWidth: { xs: 128, sm: 148 },
              px: { xs: 1.25, sm: 1.5 },
              py: { xs: 1, sm: 1.25 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.55,
              borderRadius: "14px",
              color: isActive ? colors.primary : colors.muted,
              bgcolor: isActive ? colors.primarySoft : colors.cardBg,
              border: `1px solid ${isActive ? colors.primaryLight : colors.cardBorder}`,
              boxShadow: isActive
                ? "0 6px 16px rgba(37, 99, 235, 0.14)"
                : "0 1px 2px rgba(15, 23, 42, 0.04)",
              textTransform: "none",
              whiteSpace: "nowrap",
              transition:
                "background-color 150ms ease, color 150ms ease, border-color 150ms ease, box-shadow 150ms ease",

              "&:hover": {
                color: colors.primary,
                borderColor: colors.primaryLight,
                bgcolor: colors.primarySoft,
              },

              "&:focus-visible": {
                outline: `2px solid ${colors.primary}`,
                outlineOffset: 2,
              },
            }}
          >
            <Icon size={16} />

            <Typography
              component="span"
              sx={{
                color: "inherit",
                fontSize: { xs: 10.5, sm: 11.5 },
                fontWeight: 800,
                lineHeight: 1.2,
                textAlign: "center",
              }}
            >
              {label}
            </Typography>
          </Button>
        );
      })}
    </Box>
  );
}