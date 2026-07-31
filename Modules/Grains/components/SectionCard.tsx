
"use client";

import { type ReactNode } from "react";



import {
  Card,
} from "@mui/material";

import type { SxProps, Theme } from "@mui/material/styles";
import { colors } from "../GrainsWorkspace";

type SectionCardProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

export function SectionCard({
  children,
  sx,
}: SectionCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        minWidth: 0,
        overflow: "hidden",
        borderRadius: "16px",
        border: `1px solid ${colors.cardBorder}`,
        bgcolor: colors.cardBg,
        boxShadow:
          "0 10px 28px rgba(15, 23, 42, 0.06)",
        ...sx,
      }}
    >
      {children}
    </Card>
  );
}