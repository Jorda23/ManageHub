"use client";

import { Typography } from "@mui/material";

import { colors } from "@/theme/sharedColors";

type ReportCellProps = {
  children: React.ReactNode;
  muted?: boolean;
  strong?: boolean;
  right?: boolean;
};

export function ReportCellText({
  children,
  muted = false,
  strong = false,
  right = false,
}: Readonly<ReportCellProps>) {
  return (
    <Typography
      sx={{
        color: muted ? colors.muted : colors.text,
        fontSize: strong ? 13 : 12.5,
        fontWeight: strong ? 900 : 600,
        lineHeight: 1.3,
        textAlign: right ? "right" : "left",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </Typography>
  );
}