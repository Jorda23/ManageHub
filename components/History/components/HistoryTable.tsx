"use client";

import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { colors, palette } from "@/theme/sharedColors";

import type { HistoryItem } from "../history.types";

type HistoryTableProps = {
  items: HistoryItem[];
};

const TYPE_LABELS = {
  hardware: "Ferretería",
  grains: "Granos",
  property: "Terreno",
} as const;

const TYPE_STYLES = {
  hardware: {
    bgcolor: colors.primarySoft,
    color: colors.primary,
    borderColor: colors.primaryBorder,
  },
  grains: {
    bgcolor: palette.amber[50],
    color: palette.amber[800],
    borderColor: palette.amber[500],
  },
  property: {
    bgcolor: colors.greenSoft,
    color: colors.green,
    borderColor: colors.greenBorder,
  },
} as const;

export function HistoryTable({ items }: Readonly<HistoryTableProps>) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        width: "100%",
        maxHeight: "calc(100vh - 280px)",
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
        stickyHeader
        sx={{
          minWidth: 900,
        }}
      >
        <TableHead>
          <TableRow>
            <HeaderCell width="17%">Fecha</HeaderCell>

            <HeaderCell width="12%">Tipo</HeaderCell>

            <HeaderCell width="25%">Descripción</HeaderCell>

            <HeaderCell width="18%">Cliente / propietario</HeaderCell>

            <HeaderCell width="16%">Método de pago</HeaderCell>

            <HeaderCell width="12%" align="right">
              Monto
            </HeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map((item) => {
            const typeStyle = TYPE_STYLES[item.type];

            return (
              <TableRow
                key={item.id}
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
                <TableCell>
                  <Typography
                    sx={{
                      color: colors.text,
                      fontSize: 12.5,
                      fontWeight: 700,
                      lineHeight: 1.3,
                    }}
                  >
                    {formatDate(item.createdAt)}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Chip
                    size="small"
                    label={TYPE_LABELS[item.type]}
                    sx={{
                      height: 24,
                      borderRadius: 999,
                      bgcolor: typeStyle.bgcolor,
                      color: typeStyle.color,
                      border: `1px solid ${typeStyle.borderColor}`,
                      fontSize: 10.5,
                      fontWeight: 800,

                      "& .MuiChip-label": {
                        px: 1.1,
                      },
                    }}
                  />
                </TableCell>

                <TableCell>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        color: colors.text,
                        fontSize: 13,
                        fontWeight: 800,
                        lineHeight: 1.3,
                      }}
                    >
                      {item.description}
                    </Typography>

                    {item.quantity !== undefined ? (
                      <Typography
                        sx={{
                          mt: 0.3,
                          color: colors.muted,
                          fontSize: 11,
                          fontWeight: 500,
                        }}
                      >
                        {item.quantity}
                        {item.unit ? ` ${item.unit}` : " unidades"}

                        {item.unitPrice !== undefined
                          ? ` · ${formatCurrency(item.unitPrice)} c/u`
                          : ""}
                      </Typography>
                    ) : null}
                  </Box>
                </TableCell>

                <TableCell>
                  <Typography
                    sx={{
                      color: colors.text,
                      fontSize: 12.5,
                      fontWeight: 600,
                    }}
                  >
                    {item.clientName}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    sx={{
                      color: colors.muted,
                      fontSize: 12.5,
                      fontWeight: 600,
                    }}
                  >
                    {item.paymentMethod}
                  </Typography>
                </TableCell>

                <TableCell align="right">
                  <Typography
                    sx={{
                      color: colors.text,
                      fontSize: 13.5,
                      fontWeight: 900,
                      whiteSpace: "nowrap",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {formatCurrency(item.amount)}
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

type HeaderCellProps = {
  children: React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
};

function HeaderCell({ children, width, align = "left" }: Readonly<HeaderCellProps>) {
  return (
    <TableCell
      align={align}
      sx={{
        width,
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
      {children}
    </TableCell>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-NI", {
    style: "currency",
    currency: "NIO",
    minimumFractionDigits: 2,
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-NI", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
