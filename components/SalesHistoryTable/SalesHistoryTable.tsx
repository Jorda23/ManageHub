"use client";

import type { ReactNode } from "react";
import { FaDownload, FaFilter, FaSyncAlt } from "react-icons/fa";
import { Box, Chip, IconButton, Paper, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

export type BaseSale = {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  paymentMethod: string;
  date: string;
};

type SalesHistoryColors = {
  border: string;
  text: string;
  muted: string;
  primary: string;
  primarySoft: string;
  tableHead: string;
  rowHover: string;
  paymentBg: string;
  paymentText: string;
  paymentBorder: string;
};

type SalesHistoryTableProps<TSale extends BaseSale> = {
  sales: TSale[];
  totalSold: number;

  title?: string;
  subtitle?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  totalLabel?: string;

  colors?: Partial<SalesHistoryColors>;

  productIcon?: ReactNode;
  getRecordLabel?: (sale: TSale) => string;
  getQuantityLabel?: (sale: TSale) => string;
  getProductSecondaryText?: (sale: TSale) => string | undefined;

  onFilter?: () => void;
  onDownload?: () => void;

  sx?: SxProps<Theme>;
};

const defaultColors: SalesHistoryColors = {
  border: "#dce5e1",
  text: "#0f172a",
  muted: "#64748b",
  primary: "#92400e",
  primarySoft: "#ffedd5",
  tableHead: "#f1f5f9",
  rowHover: "#fff7ed",
  paymentBg: "#dcfce7",
  paymentText: "#0f766e",
  paymentBorder: "#bbf7d0",
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export function SalesHistoryTable<TSale extends BaseSale>({
  sales,
  totalSold,
  title = "Historial de ventas",
  subtitle = "Productos vendidos, cantidades, precios y métodos de pago",
  emptyTitle = "Todavía no hay ventas registradas.",
  emptyDescription = "Cuando registres una venta, aparecerá aquí.",
  totalLabel = "Total vendido:",
  colors: customColors,
  productIcon,
  getRecordLabel = (sale) => `Ticket #${sale.id.slice(-4).toUpperCase()}`,
  getQuantityLabel = (sale) => `${sale.quantity}`,
  getProductSecondaryText,
  onFilter,
  onDownload,
  sx,
}: SalesHistoryTableProps<TSale>) {
  const colors = {
    ...defaultColors,
    ...customColors,
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "16px",
        border: `1px solid ${colors.border}`,
        bgcolor: "#ffffff",
        overflow: "hidden",
        boxShadow: "0 10px 28px rgba(15, 23, 42, 0.06)",
        minWidth: 0,
        ...sx,
      }}
    >
      <Box
        sx={{
          p: {
            xs: 1.8,
            md: 2.5,
          },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          borderBottom: `1px solid ${colors.border}`,
          bgcolor: "#ffffff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1.2,
            alignItems: "center",
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "16px",
              display: "grid",
              placeItems: "center",
              bgcolor: colors.primarySoft,
              color: colors.primary,
              flexShrink: 0,
            }}
          >
            <FaSyncAlt size={14} />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 950,
                fontSize: {
                  xs: 16,
                  md: 18,
                },
                color: colors.text,
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                fontSize: 12,
                color: colors.muted,
              }}
            >
              {subtitle}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <ActionButton
            label="Filtrar ventas"
            onClick={onFilter}
            colors={colors}
          >
            <FaFilter />
          </ActionButton>

          <ActionButton
            label="Descargar historial"
            onClick={onDownload}
            colors={colors}
          >
            <FaDownload />
          </ActionButton>
        </Box>
      </Box>

      {sales.length === 0 ? (
        <Box
          sx={{
            p: 4,
            textAlign: "center",
            bgcolor: "#fbfdfc",
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 950,
              color: colors.muted,
            }}
          >
            {emptyTitle}
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 13,
              color: colors.muted,
            }}
          >
            {emptyDescription}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <Box
            component="table"
            sx={{
              width: "100%",
              minWidth: {
                xs: 820,
                md: 920,
              },
              borderCollapse: "separate",
              borderSpacing: 0,
            }}
          >
            <Box
              component="thead"
              sx={{
                "& th": {
                  px: 2.5,
                  py: 1.6,
                  bgcolor: colors.tableHead,
                  color: colors.muted,
                  fontSize: 11,
                  fontWeight: 950,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  textAlign: "left",
                  borderBottom: `1px solid ${colors.border}`,
                  whiteSpace: "nowrap",
                },
                "& th:first-of-type": {
                  pl: 3,
                },
                "& th:last-of-type": {
                  pr: 3,
                  textAlign: "right",
                },
              }}
            >
              <tr>
                <th>Fecha</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio unitario</th>
                <th>Pago</th>
                <th>Total</th>
              </tr>
            </Box>

            <Box
              component="tbody"
              sx={{
                "& tr": {
                  transition: "background-color 0.16s ease",
                },
                "& tr:nth-of-type(even)": {
                  bgcolor: "#fbfdfc",
                },
                "& tr:hover": {
                  bgcolor: colors.rowHover,
                },
                "& td": {
                  px: 2.5,
                  py: 1.8,
                  borderBottom: `1px solid ${colors.border}`,
                  fontSize: 13,
                  color: colors.text,
                  verticalAlign: "middle",
                  whiteSpace: "nowrap",
                },
                "& tr:last-of-type td": {
                  borderBottom: "none",
                },
                "& td:first-of-type": {
                  pl: 3,
                },
                "& td:last-of-type": {
                  pr: 3,
                  textAlign: "right",
                },
              }}
            >
              {sales.map((sale) => {
                const productSecondaryText = getProductSecondaryText?.(sale);

                return (
                  <tr key={sale.id}>
                    <td>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.25,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 13,
                            fontWeight: 850,
                          }}
                        >
                          {sale.date}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: 11,
                            color: colors.muted,
                          }}
                        >
                          {getRecordLabel(sale)}
                        </Typography>
                      </Box>
                    </td>

                    <td>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.2,
                        }}
                      >
                        {productIcon && (
                          <Box
                            sx={{
                              width: 30,
                              height: 30,
                              borderRadius: "16px",
                              display: "grid",
                              placeItems: "center",
                              bgcolor: colors.primarySoft,
                              color: colors.primary,
                              flexShrink: 0,
                            }}
                          >
                            {productIcon}
                          </Box>
                        )}

                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            sx={{
                              fontSize: 13,
                              fontWeight: 850,
                              overflowWrap: "anywhere",
                            }}
                          >
                            {sale.productName}
                          </Typography>

                          {productSecondaryText && (
                            <Typography
                              sx={{
                                fontSize: 11,
                                color: colors.muted,
                              }}
                            >
                              {productSecondaryText}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </td>

                    <td>
                      <Typography
                        sx={{
                          fontSize: 13,
                          fontWeight: 850,
                          textAlign: "center",
                        }}
                      >
                        {getQuantityLabel(sale)}
                      </Typography>
                    </td>

                    <td>
                      <Typography
                        sx={{
                          fontSize: 13,
                          fontWeight: 850,
                          textAlign: "center",
                        }}
                      >
                        {formatCurrency(sale.unitPrice)}
                      </Typography>
                    </td>

                    <td>
                      <Chip
                        label={sale.paymentMethod}
                        size="small"
                        sx={{
                          height: 24,
                          px: 0.5,
                          fontSize: 11,
                          fontWeight: 900,
                          bgcolor: colors.paymentBg,
                          color: colors.paymentText,
                          border: `1px solid ${colors.paymentBorder}`,

                          "& .MuiChip-label": {
                            px: 1,
                          },
                        }}
                      />
                    </td>

                    <td>
                      <Typography
                        sx={{
                          fontSize: 13,
                          fontWeight: 950,
                          color: colors.primary,
                          textAlign: "right",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {formatCurrency(sale.total)}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </Box>
          </Box>
        </Box>
      )}

      <Box
        sx={{
          px: {
            xs: 1.8,
            md: 3,
          },
          py: 1.8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          bgcolor: "#f8fafc",
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            color: colors.muted,
            fontWeight: 700,
          }}
        >
          {sales.length}{" "}
          {sales.length === 1 ? "venta registrada" : "ventas registradas"}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              color: colors.muted,
              fontWeight: 700,
            }}
          >
            {totalLabel}
          </Typography>

          <Typography
            sx={{
              fontSize: 15,
              color: colors.primary,
              fontWeight: 950,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatCurrency(totalSold)}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

function ActionButton({
  children,
  label,
  onClick,
  colors,
}: {
  children: ReactNode;
  label: string;
  onClick?: () => void;
  colors: SalesHistoryColors;
}) {
  return (
    <IconButton
      size="small"
      aria-label={label}
      onClick={onClick}
      disabled={!onClick}
      sx={{
        width: 36,
        height: 36,
        border: `1px solid ${colors.border}`,
        borderRadius: "16px",
        color: colors.muted,
        bgcolor: "#ffffff",
        transition: "all 0.16s ease",
        flexShrink: 0,

        "&:hover": {
          bgcolor: colors.primarySoft,
          color: colors.primary,
          transform: "translateY(-1px)",
        },

        "&.Mui-disabled": {
          color: colors.muted,
          opacity: 1,
        },
      }}
    >
      {children}
    </IconButton>
  );
}
