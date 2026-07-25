"use client";

import type { ReactNode } from "react";
import {
  Box,
  Card,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import {
  FaDownload,
  FaFilter,
  FaHome,
  FaSyncAlt,
} from "react-icons/fa";

export type PaymentRecord = {
  id: string;
  propertyId: string;
  propertyName: string;
  buyerName: string;
  amount: number;
  method: string;
  date: string;
  note: string;
};

type PaymentHistoryTableProps = {
  payments: PaymentRecord[];
  totalPaid: number;
  onFilter?: () => void;
  onDownload?: () => void;
};

const colors = {
  cardBg: "#ffffff",
  cardBorder: "#dce5e1",
  text: "#0f172a",
  muted: "#64748b",
  primary: "#1e3a8a",
  primaryLight: "#2563eb",
  primarySoft: "#dbeafe",
  green: "#0f766e",
  greenSoft: "#dcfce7",
  tableHead: "#f1f5f9",
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export function PaymentHistoryTable({
  payments,
  totalPaid,
  onFilter,
  onDownload,
}: PaymentHistoryTableProps) {
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
        onFilter={onFilter}
        onDownload={onDownload}
      />

      {payments.length === 0 ? (
        <EmptyPaymentHistory />
      ) : (
        <PaymentTable payments={payments} />
      )}

      <PaymentHistoryFooter
        paymentCount={payments.length}
        totalPaid={totalPaid}
      />
    </Card>
  );
}

type PaymentHistoryHeaderProps = {
  onFilter?: () => void;
  onDownload?: () => void;
};

function PaymentHistoryHeader({
  onFilter,
  onDownload,
}: PaymentHistoryHeaderProps) {
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

      <Box sx={{ display: "flex", gap: 1 }}>
        <SmallIconButton
          ariaLabel="Filtrar abonos"
          onClick={onFilter}
          disabled={!onFilter}
        >
          <FaFilter />
        </SmallIconButton>

        <SmallIconButton
          ariaLabel="Descargar historial de abonos"
          onClick={onDownload}
          disabled={!onDownload}
        >
          <FaDownload />
        </SmallIconButton>
      </Box>
    </Box>
  );
}

function EmptyPaymentHistory() {
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
        Todavía no hay abonos registrados.
      </Typography>

      <Typography
        sx={{
          mt: 0.5,
          color: colors.muted,
          fontSize: 13,
        }}
      >
        Cuando registres un abono, aparecerá aquí.
      </Typography>
    </Box>
  );
}

function PaymentTable({
  payments,
}: {
  payments: PaymentRecord[];
}) {
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
            <PaymentTableRow
              key={payment.id}
              payment={payment}
            />
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

function PaymentTableRow({
  payment,
}: {
  payment: PaymentRecord;
}) {
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
  totalPaid: number;
};

function PaymentHistoryFooter({
  paymentCount,
  totalPaid,
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