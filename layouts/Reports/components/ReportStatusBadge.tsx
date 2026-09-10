"use client";

import { Chip } from "@mui/material";

import { colors } from "@/theme/sharedColors";

import type { ReportStatus } from "../types/reports.types";

const STATUS_STYLES: Record<
  ReportStatus,
  { bgcolor: string; color: string; borderColor: string }
> = {
  Pagado: {
    bgcolor: colors.greenSoft,
    color: colors.green,
    borderColor: colors.greenBorder,
  },
  Pendiente: {
    bgcolor: colors.orangeSoft,
    color: colors.orange,
    borderColor: colors.orangeBorder,
  },
  Atrasado: {
    bgcolor: colors.dangerSoft,
    color: colors.danger,
    borderColor: colors.dangerBorder,
  },
  "Al día": {
    bgcolor: colors.primarySoft,
    color: colors.primaryLight,
    borderColor: colors.primaryBorder,
  },
  "Vendido a crédito": {
    bgcolor: colors.primarySoft,
    color: colors.primary,
    borderColor: colors.primaryBorder,
  },
};

const FALLBACK_STYLE = {
  bgcolor: colors.tableHead,
  color: colors.muted,
  borderColor: colors.cardBorder,
};

export function ReportStatusBadge({ status }: Readonly<{ status: ReportStatus }>) {
  const style = STATUS_STYLES[status] ?? FALLBACK_STYLE;

  return (
    <Chip
      size="small"
      label={status}
      sx={{
        height: 24,
        borderRadius: 999,
        bgcolor: style.bgcolor,
        color: style.color,
        border: `1px solid ${style.borderColor}`,
        fontSize: 10.5,
        fontWeight: 800,

        "& .MuiChip-label": {
          px: 1.1,
        },
      }}
    />
  );
}
