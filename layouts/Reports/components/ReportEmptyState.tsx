"use client";

import { Box } from "@mui/material";

import type { ReactNode } from "react";

import { EmptyState } from "@/components/EmptyState";

import { colors } from "@/theme/sharedColors";

type ReportEmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

export function ReportEmptyState({
  title,
  description,
  icon,
}: Readonly<ReportEmptyStateProps>) {
  return (
    <Box
      sx={{
        bgcolor: colors.cardBg,
        border: `1px solid ${colors.cardBorder}`,
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.04)",
      }}
    >
      <EmptyState title={title} description={description} icon={icon} />
    </Box>
  );
}