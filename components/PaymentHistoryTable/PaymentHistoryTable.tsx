"use client";

import { useMemo, useState, type ReactNode } from "react";

import {
  Box,
  Button,
  Card,
  Chip,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import {
  buildCsvContent,
  downloadCsvFile,
} from "@/components/WorkspaceShared/csvDownload";
import {
  FaDownload,
  FaHome,
  FaSearch,
  FaSyncAlt,
  FaTimes,
} from "react-icons/fa";

import {
  colors,
  formatCurrency,
  type PaymentRecord,
} from "@/Modules/Property/propertyWorkspaceData";

type PaymentFilters = {
  search: string;
  method: string;
  dateFrom: string;
  dateTo: string;
};

type PaymentHistoryTableProps = {
  payments: PaymentRecord[];
  totalPaid: number;
  onDownload?: (filteredPayments: PaymentRecord[]) => void;
  getFilterDate?: (payment: PaymentRecord) => Date | null;
};

const EMPTY_FILTERS: PaymentFilters = {
  search: "",
  method: "",
  dateFrom: "",
  dateTo: "",
};

const parsePaymentDate = (value: string): Date | null => {
  const directDate = new Date(value);

  if (!Number.isNaN(directDate.getTime())) {
    return directDate;
  }

  const datePart = value.split(",")[0]?.trim();
  const match = datePart?.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/);

  if (!match) {
    return null;
  }

  const [, monthText, dayText, yearText] = match;
  const month = Number(monthText);
  const day = Number(dayText);
  const parsedYear = Number(yearText);
  const year = yearText.length === 2 ? 2000 + parsedYear : parsedYear;
  const parsedDate = new Date(year, month - 1, day);

  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
};

const getStartOfDay = (value: string): Date | null => {
  if (!value) {
    return null;
  }

  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getEndOfDay = (value: string): Date | null => {
  if (!value) {
    return null;
  }

  const date = new Date(`${value}T23:59:59.999`);
  return Number.isNaN(date.getTime()) ? null : date;
};

export function PaymentHistoryTable({
  payments,
  totalPaid,
  onDownload,
  getFilterDate = (payment) => parsePaymentDate(payment.date),
}: PaymentHistoryTableProps) {
  const [filters, setFilters] = useState<PaymentFilters>(EMPTY_FILTERS);

  const paymentMethods = useMemo(() => {
    return Array.from(new Set(payments.map((payment) => payment.method)))
      .filter(Boolean)
      .sort((first, second) => first.localeCompare(second));
  }, [payments]);

  const filteredPayments = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLocaleLowerCase();
    const dateFrom = getStartOfDay(filters.dateFrom);
    const dateTo = getEndOfDay(filters.dateTo);

    return payments.filter((payment) => {
      const searchableText = [
        payment.id,
        payment.propertyId,
        payment.propertyName,
        payment.buyerName,
        payment.method,
        payment.note,
      ]
        .join(" ")
        .toLocaleLowerCase();

      const matchesSearch =
        !normalizedSearch || searchableText.includes(normalizedSearch);
      const matchesMethod =
        !filters.method || payment.method === filters.method;

      const paymentDate = getFilterDate(payment);
      const matchesDateFrom =
        !dateFrom || (paymentDate !== null && paymentDate >= dateFrom);
      const matchesDateTo =
        !dateTo || (paymentDate !== null && paymentDate <= dateTo);

      return (
        matchesSearch &&
        matchesMethod &&
        matchesDateFrom &&
        matchesDateTo
      );
    });
  }, [filters, getFilterDate, payments]);

  const hasActiveFilters = Object.values(filters).some(Boolean);

  const visibleTotalPaid = useMemo(() => {
    if (!hasActiveFilters) {
      return totalPaid;
    }

    return filteredPayments.reduce((total, payment) => total + payment.amount, 0);
  }, [filteredPayments, hasActiveFilters, totalPaid]);

  const handleDownload = () => {
    if (onDownload) {
      onDownload(filteredPayments);
      return;
    }

    const headers = [
      "Fecha",
      "Propiedad",
      "Comprador",
      "Metodo de pago",
      "Nota",
      "Monto",
    ];

    const rows = filteredPayments.map((payment) => [
      payment.date,
      payment.propertyName,
      payment.buyerName,
      payment.method,
      payment.note,
      payment.amount.toFixed(2),
    ]);

    const csvContent = buildCsvContent(headers, rows);
    const fileDate = new Date().toISOString().slice(0, 10);

    downloadCsvFile(`historial-abonos-${fileDate}.csv`, csvContent);
  };

  const updateFilter = <TKey extends keyof PaymentFilters>(
    key: TKey,
    value: PaymentFilters[TKey],
  ) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters(EMPTY_FILTERS);
  };

  return (
    <Card
      elevation={0}
      sx={{
        minWidth: 0,
        overflow: "hidden",
        borderRadius: "16px",
        border: `1px solid ${colors.cardBorder}`,
        bgcolor: colors.cardBg,
        boxShadow: "0 10px 28px rgba(15, 23, 42, 0.06)",
      }}
    >
      <PaymentHistoryHeader
        onDownload={handleDownload}
      />

      <PaymentFiltersBar
        filters={filters}
        paymentMethods={paymentMethods}
        canClear={hasActiveFilters}
        onChange={updateFilter}
        onClear={clearFilters}
      />

      {payments.length === 0 ? (
        <EmptyPaymentHistory />
      ) : filteredPayments.length === 0 ? (
        <EmptyFilteredPayments />
      ) : (
        <PaymentTable payments={filteredPayments} />
      )}

      <PaymentHistoryFooter
        paymentCount={filteredPayments.length}
        sourcePaymentCount={payments.length}
        totalPaid={visibleTotalPaid}
        filtered={hasActiveFilters}
      />
    </Card>
  );
}

type PaymentHistoryHeaderProps = {
  onDownload?: () => void;
};

function PaymentHistoryHeader({ onDownload }: PaymentHistoryHeaderProps) {
  return (
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
        borderBottom: `1px solid ${colors.cardBorder}`,
        bgcolor: "#ffffff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.2,
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
            color: colors.primaryLight,
            flexShrink: 0,
          }}
        >
          <FaSyncAlt size={14} />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              color: colors.text,
              fontSize: {
                xs: 16,
                md: 18,
              },
              fontWeight: 950,
            }}
          >
            Historial de abonos
          </Typography>

          <Typography
            sx={{
              color: colors.muted,
              fontSize: 12,
            }}
          >
            Pagos realizados por comprador y propiedad
          </Typography>
        </Box>
      </Box>

      <SmallIconButton
        ariaLabel="Descargar historial de abonos"
        onClick={onDownload}
        disabled={!onDownload}
      >
        <FaDownload />
      </SmallIconButton>
    </Box>
  );
}

type PaymentFiltersBarProps = {
  filters: PaymentFilters;
  paymentMethods: string[];
  canClear: boolean;
  onChange: <TKey extends keyof PaymentFilters>(
    key: TKey,
    value: PaymentFilters[TKey],
  ) => void;
  onClear: () => void;
};

function PaymentFiltersBar({
  filters,
  paymentMethods,
  canClear,
  onChange,
  onClear,
}: PaymentFiltersBarProps) {
  return (
    <Box
      sx={{
        p: {
          xs: 1.5,
          md: 2,
        },
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          lg: ["minmax(260px, 2fr)", "minmax(145px, 0.8fr)", "minmax(145px, 0.8fr)", "minmax(180px, 1fr)", "auto"].join(" "),
        },
        gap: 1.2,
        alignItems: "center",
        borderBottom: `1px solid ${colors.cardBorder}`,
        bgcolor: "#f8fafc",
      }}
    >
      <TextField
        value={filters.search}
        onChange={(event) => onChange("search", event.target.value)}
        placeholder="Propiedad, comprador, recibo o nota"
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
            "aria-label": "Buscar abonos",
          },
        }}
        sx={filterFieldSx}
      />

      <TextField
        label="Desde"
        type="date"
        value={filters.dateFrom}
        onChange={(event) => onChange("dateFrom", event.target.value)}
        size="small"
        fullWidth
        slotProps={{
          inputLabel: {
            shrink: true,
          },
          htmlInput: {
            "aria-label": "Fecha inicial",
          },
        }}
        sx={filterFieldSx}
      />

      <TextField
        label="Hasta"
        type="date"
        value={filters.dateTo}
        onChange={(event) => onChange("dateTo", event.target.value)}
        size="small"
        fullWidth
        slotProps={{
          inputLabel: {
            shrink: true,
          },
          htmlInput: {
            "aria-label": "Fecha final",
          },
        }}
        sx={filterFieldSx}
      />

      <TextField
        select
        label="Método de pago"
        value={filters.method}
        onChange={(event) => onChange("method", event.target.value)}
        size="small"
        fullWidth
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        sx={filterFieldSx}
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
        variant="text"
        startIcon={<FaTimes size={12} />}
        onClick={onClear}
        disabled={!canClear}
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
  );
}

const filterFieldSx: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    minHeight: 42,
    bgcolor: "#ffffff",
    borderRadius: "6px",
    fontSize: 13,
    color: colors.text,
    "& fieldset": {
      borderColor: "#b8c2cc",
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

function EmptyPaymentHistory() {
  return (
    <EmptyState
      title="Todavía no hay abonos registrados."
      description="Cuando registres un abono, aparecerá aquí."
    />
  );
}

function EmptyFilteredPayments() {
  return (
    <EmptyState
      title="No se encontraron abonos."
      description="Cambia los criterios o limpia los filtros aplicados."
    />
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
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
          color: colors.text,
          fontSize: 14,
          fontWeight: 900,
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          mt: 0.5,
          color: colors.muted,
          fontSize: 13,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}

function PaymentTable({ payments }: { payments: PaymentRecord[] }) {
  return (
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
        <PaymentTableHead />

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
              bgcolor: "#eff6ff",
            },
            "& td": {
              px: 2.5,
              py: 1.8,
              color: colors.text,
              fontSize: 13,
              verticalAlign: "middle",
              whiteSpace: "nowrap",
              borderBottom: `1px solid ${colors.cardBorder}`,
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
          {payments.map((payment) => (
            <PaymentTableRow key={payment.id} payment={payment} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function PaymentTableHead() {
  return (
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
          whiteSpace: "nowrap",
          borderBottom: `1px solid ${colors.cardBorder}`,
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
        <th>Propiedad</th>
        <th>Comprador</th>
        <th>Método</th>
        <th>Nota</th>
        <th>Monto</th>
      </tr>
    </Box>
  );
}

function PaymentTableRow({ payment }: { payment: PaymentRecord }) {
  return (
    <tr>
      <td>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.25,
          }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 850 }}>
            {payment.date}
          </Typography>

          <Typography sx={{ fontSize: 11, color: colors.muted }}>
            Recibo #{payment.id.slice(-4).toUpperCase()}
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
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: "16px",
              display: "grid",
              placeItems: "center",
              bgcolor: colors.primarySoft,
              color: colors.primaryLight,
              flexShrink: 0,
            }}
          >
            <FaHome size={13} />
          </Box>

          <Typography
            sx={{
              color: colors.text,
              fontSize: 13,
              fontWeight: 950,
            }}
          >
            {payment.propertyName}
          </Typography>
        </Box>
      </td>

      <td>
        <Typography
          sx={{
            color: colors.text,
            fontSize: 13,
            fontWeight: 950,
          }}
        >
          {payment.buyerName}
        </Typography>
      </td>

      <td>
        <Chip
          label={payment.method}
          size="small"
          sx={{
            height: 24,
            px: 0.5,
            bgcolor: colors.greenSoft,
            color: colors.green,
            border: "1px solid #bbf7d0",
            fontSize: 11,
            fontWeight: 900,
            "& .MuiChip-label": {
              px: 1,
            },
          }}
        />
      </td>

      <td>
        <Typography
          sx={{
            color: colors.muted,
            fontSize: 13,
          }}
        >
          {payment.note}
        </Typography>
      </td>

      <td>
        <Typography
          sx={{
            color: colors.green,
            fontSize: 13,
            fontWeight: 950,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formatCurrency(payment.amount)}
        </Typography>
      </td>
    </tr>
  );
}

type PaymentHistoryFooterProps = {
  paymentCount: number;
  sourcePaymentCount: number;
  totalPaid: number;
  filtered: boolean;
};

function PaymentHistoryFooter({
  paymentCount,
  sourcePaymentCount,
  totalPaid,
  filtered,
}: PaymentHistoryFooterProps) {
  return (
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
        flexWrap: "wrap",
        bgcolor: "#f8fafc",
        borderTop: `1px solid ${colors.cardBorder}`,
      }}
    >
      <Typography
        sx={{
          color: colors.muted,
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        {paymentCount} {paymentCount === 1 ? "abono registrado" : "abonos registrados"}
        {filtered ? ` de ${sourcePaymentCount}` : ""}
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
            color: colors.muted,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          Total abonado:
        </Typography>

        <Typography
          sx={{
            color: colors.green,
            fontSize: 15,
            fontWeight: 950,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formatCurrency(totalPaid)}
        </Typography>
      </Box>
    </Box>
  );
}

type SmallIconButtonProps = {
  children: ReactNode;
  ariaLabel: string;
  onClick?: () => void;
  disabled?: boolean;
};

function SmallIconButton({
  children,
  ariaLabel,
  onClick,
  disabled = false,
}: SmallIconButtonProps) {
  return (
    <IconButton
      type="button"
      size="small"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      sx={{
        width: 36,
        height: 36,
        borderRadius: "16px",
        border: `1px solid ${colors.cardBorder}`,
        color: colors.muted,
        bgcolor: "#ffffff",
        transition: "all 0.16s ease",
        flexShrink: 0,
        "&:hover": {
          bgcolor: colors.primarySoft,
          color: colors.primary,
          borderColor: "#bfdbfe",
          transform: "translateY(-1px)",
        },
        "&.Mui-disabled": {
          opacity: 0.45,
        },
      }}
    >
      {children}
    </IconButton>
  );
}
