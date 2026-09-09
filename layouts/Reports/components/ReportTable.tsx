"use client";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { colors } from "@/theme/sharedColors";

import type { ReportColumn } from "../types/reports.types";

type ReportTableProps<T> = {
  columns: ReportColumn<T>[];
  rows: T[];
  minWidth?: number;
};

export function ReportTable<T>({
  columns,
  rows,
  minWidth = 780,
}: Readonly<ReportTableProps<T>>) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        width: "100%",
        overflow: "auto",
        border: `1px solid ${colors.cardBorder}`,
        borderRadius: "16px",
        bgcolor: colors.cardBg,
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.04)",

        "&::-webkit-scrollbar": {
          width: 8,
          height: 8,
        },

        "&::-webkit-scrollbar-track": {
          bgcolor: colors.tableHead,
        },

        "&::-webkit-scrollbar-thumb": {
          bgcolor: colors.softMuted,
          borderRadius: 999,
        },

        "&::-webkit-scrollbar-thumb:hover": {
          bgcolor: colors.muted,
        },

        scrollbarWidth: "thin",
        scrollbarColor: `${colors.softMuted} ${colors.tableHead}`,
      }}
    >
      <Table
        sx={{
          minWidth,
        }}
      >
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                align={column.align ?? "left"}
                sx={{
                  width: column.width,
                  px: 1.75,
                  py: 1.35,
                  bgcolor: colors.tableHead,
                  color: colors.muted,
                  borderBottom: `1px solid ${colors.cardBorder}`,
                  fontSize: 10.5,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.045em",
                  whiteSpace: "nowrap",
                }}
              >
                {column.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => {
            const rowKey = (row as { id?: string }).id ?? index;

            return (
              <TableRow
                key={rowKey}
                hover
                sx={{
                  transition: "background-color 0.15s ease",

                  "& td": {
                    py: 1.45,
                    px: 1.75,
                    borderBottom: `1px solid ${colors.cardBorder}`,
                  },

                  "&:hover": {
                    bgcolor: colors.pageBg,
                  },

                  "&:last-child td": {
                    borderBottom: 0,
                  },
                }}
              >
                {columns.map((column) => (
                  <TableCell key={column.key} align={column.align ?? "left"}>
                    {column.render(row)}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}