"use client";

import { useMemo, useState, type ReactNode } from "react";
import { FaCalendarAlt, FaDownload, FaFilter, FaSearch, FaSyncAlt } from "react-icons/fa";
import {
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import { buildCsvContent, downloadCsvFile } from "@/components/WorkspaceShared/csvDownload";

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
  getFilterDate?: (sale: TSale) => Date | null;

  onDownload?: (filteredSales: TSale[]) => void;

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
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

const parseSaleDate = (value: string): Date | null => {
  const parsed = new Date(value);

  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const startOfDay = (value: string): Date | null => {
  if (!value) {
    return null;
  }

  const parsed = new Date(`${value}T00:00:00`);

  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const endOfDay = (value: string): Date | null => {
  if (!value) {
    return null;
  }

  const parsed = new Date(`${value}T23:59:59.999`);

  return Number.isNaN(parsed.getTime()) ? null : parsed;
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
  getFilterDate = (sale) => parseSaleDate(sale.date),
  onDownload,
  sx,
}: SalesHistoryTableProps<TSale>) {
  const [search, setSearch] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const colors: SalesHistoryColors = {
    ...defaultColors,
    ...customColors,
  };

  const paymentMethods = useMemo(() => {
    return Array.from(new Set(sales.map((sale) => sale.paymentMethod)))
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  }, [sales]);

  const filteredSales = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();
    const from = startOfDay(dateFrom);
    const to = endOfDay(dateTo);

    return sales.filter((sale) => {
      const normalizedProductName = sale.productName.toLocaleLowerCase();
      const normalizedId = sale.id.toLocaleLowerCase();
      const normalizedPaymentMethod = sale.paymentMethod.toLocaleLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        normalizedProductName.includes(normalizedSearch) ||
        normalizedId.includes(normalizedSearch) ||
        normalizedPaymentMethod.includes(normalizedSearch);

      const matchesPayment = !paymentMethod || sale.paymentMethod === paymentMethod;

      const saleDate = getFilterDate(sale);

      const matchesFrom = !from || (saleDate !== null && saleDate >= from);

      const matchesTo = !to || (saleDate !== null && saleDate <= to);

      return matchesSearch && matchesPayment && matchesFrom && matchesTo;
    });
  }, [dateFrom, dateTo, getFilterDate, paymentMethod, sales, search]);

  const hasActiveFilters = Boolean(search.trim() || paymentMethod || dateFrom || dateTo);

  const filteredTotal = useMemo(() => {
    return filteredSales.reduce((sum, sale) => sum + sale.total, 0);
  }, [filteredSales]);

  const visibleTotal = hasActiveFilters ? filteredTotal : totalSold;

  const handleDownload = () => {
    if (onDownload) {
      onDownload(filteredSales);
      return;
    }

    const headers = [
      "Registro",
      "Fecha",
      "Producto",
      "Cantidad",
      "Precio unitario",
      "Metodo de pago",
      "Total",
    ];

    const rows = filteredSales.map((sale) => [
      getRecordLabel(sale),
      sale.date,
      sale.productName,
      getQuantityLabel(sale),
      sale.unitPrice.toFixed(2),
      sale.paymentMethod,
      sale.total.toFixed(2),
    ]);

    const csvContent = buildCsvContent(headers, rows);
    const fileDate = new Date().toISOString().slice(0, 10);

    downloadCsvFile(`historial-ventas-${fileDate}.csv`, csvContent);
  };

  const clearFilters = () => {
    setSearch("");
    setPaymentMethod("");
    setDateFrom("");
    setDateTo("");
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

        <ActionButton label="Descargar historial" onClick={handleDownload} colors={colors}>
          <FaDownload />
        </ActionButton>
      </Box>

      <Box
        sx={{
          p: {
            xs: 1.5,
            md: 2,
          },
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: `
              minmax(260px, 2fr)
              minmax(145px, 0.8fr)
              minmax(145px, 0.8fr)
              minmax(180px, 1fr)
              auto
              auto
            `,
          },
          gap: 1.2,
          alignItems: "center",
          borderBottom: `1px solid ${colors.border}`,
          bgcolor: "#f8fafc",
        }}
      >
        <TextField
          placeholder="Producto, ticket o método de pago"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          size="small"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch size={14} />
                </InputAdornment>
              ),
            },
            htmlInput: {
              "aria-label": "Buscar ventas",
            },
          }}
          sx={filterFieldSx(colors)}
        />

        <TextField
          label="Desde"
          type="date"
          value={dateFrom}
          onChange={(event) => setDateFrom(event.target.value)}
          size="small"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <FaCalendarAlt size={13} />
                </InputAdornment>
              ),
            },
            inputLabel: {
              shrink: true,
            },
            htmlInput: {
              "aria-label": "Fecha desde",
            },
          }}
          sx={filterFieldSx(colors)}
        />

        <TextField
          label="Hasta"
          type="date"
          value={dateTo}
          onChange={(event) => setDateTo(event.target.value)}
          size="small"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <FaCalendarAlt size={13} />
                </InputAdornment>
              ),
            },
            inputLabel: {
              shrink: true,
            },
            htmlInput: {
              "aria-label": "Fecha hasta",
            },
          }}
          sx={filterFieldSx(colors)}
        />

        <TextField
          select
          label="Método de pago"
          value={paymentMethod}
          onChange={(event) => setPaymentMethod(event.target.value)}
          size="small"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          sx={filterFieldSx(colors)}
        >
          <MenuItem value="">Todos los métodos</MenuItem>

          {paymentMethods.map((method) => (
            <MenuItem key={method} value={method}>
              {method}
            </MenuItem>
          ))}
        </TextField>

        <Button
          type="button"
          variant="contained"
          startIcon={<FaFilter size={13} />}
          sx={{
            minHeight: 40,
            px: 2.4,
            borderRadius: "6px",
            bgcolor: colors.primary,
            fontWeight: 900,
            textTransform: "none",
            whiteSpace: "nowrap",
            boxShadow: "none",

            "&:hover": {
              bgcolor: colors.primary,
              boxShadow: "none",
            },
          }}
        >
          Filtrar
        </Button>

        <Button
          type="button"
          variant="text"
          onClick={clearFilters}
          disabled={!hasActiveFilters}
          sx={{
            color: colors.primary,
            fontWeight: 900,
            textTransform: "none",
            whiteSpace: "nowrap",
          }}
        >
          Limpiar
        </Button>
      </Box>

      {sales.length === 0 ? (
        <EmptyState title={emptyTitle} description={emptyDescription} colors={colors} />
      ) : filteredSales.length === 0 ? (
        <EmptyState
          title="No se encontraron ventas."
          description="Prueba cambiando o limpiando los filtros aplicados."
          colors={colors}
        />
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
              {filteredSales.map((sale) => {
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
          {filteredSales.length}{" "}
          {filteredSales.length === 1 ? "venta registrada" : "ventas registradas"}
          {hasActiveFilters ? ` de ${sales.length}` : ""}
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
            {formatCurrency(visibleTotal)}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

function filterFieldSx(colors: SalesHistoryColors): SxProps<Theme> {
  return {
    "& .MuiOutlinedInput-root": {
      minHeight: 42,
      bgcolor: "#ffffff",
      borderRadius: "6px",
      fontSize: 13,
      color: colors.text,

      "& fieldset": {
        borderColor: "#b8c2cc",
        borderWidth: 1,
      },

      "&:hover fieldset": {
        borderColor: colors.muted,
      },

      "&.Mui-focused fieldset": {
        borderColor: colors.primary,
        borderWidth: 1.5,
      },
    },

    "& .MuiInputBase-input": {
      color: `${colors.text} !important`,
      WebkitTextFillColor: `${colors.text} !important`,
      opacity: 1,
    },

    "& .MuiInputBase-input::placeholder": {
      color: `${colors.muted} !important`,
      WebkitTextFillColor: `${colors.muted} !important`,
      opacity: 1,
    },

    "& .MuiSelect-select": {
      color: `${colors.text} !important`,
      WebkitTextFillColor: `${colors.text} !important`,
    },

    "& .MuiInputAdornment-root": {
      color: colors.muted,
    },

    "& .MuiSvgIcon-root": {
      color: colors.muted,
    },

    "& .MuiInputLabel-root": {
      color: colors.muted,
      fontSize: 12,
      fontWeight: 700,
      bgcolor: "#ffffff",
      px: 0.35,
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: colors.primary,
    },

    "& input[type='date']::-webkit-calendar-picker-indicator": {
      opacity: 0.75,
      cursor: "pointer",
    },
  };
}

function EmptyState({
  title,
  description,
  colors,
}: {
  title: string;
  description: string;
  colors: SalesHistoryColors;
}) {
  return (
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
        {title}
      </Typography>

      <Typography
        sx={{
          mt: 0.5,
          fontSize: 13,
          color: colors.muted,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}

function ActionButton({
  children,
  label,
  onClick,
  colors,
  active = false,
}: {
  children: ReactNode;
  label: string;
  onClick?: () => void;
  colors: SalesHistoryColors;
  active?: boolean;
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
        border: `1px solid ${active ? colors.primary : colors.border}`,
        borderRadius: "16px",
        color: active ? colors.primary : colors.muted,
        bgcolor: active ? colors.primarySoft : "#ffffff",
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
