import type { ReactNode } from "react";

import {
  Box,
  Button,
  Divider,
  FormControl,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { FaPlusCircle, FaReceipt } from "react-icons/fa";

import {
  colors,
  formatCurrency,
  getPendingAmount,
  getStatusColors,
  type PropertyItem,
} from "../propertyWorkspaceData";
import { PropertySectionCard } from "./PropertySectionCard";
import { PropertySectionHeader } from "./PropertySectionHeader";

type PropertyPaymentSectionProps = {
  selectedProperty?: PropertyItem;
  properties: PropertyItem[];
  selectedPropertyId: string;
  paymentAmount: string;
  paymentMethod: string;
  paymentMethods: string[];
  paymentNote: string;
  error: string;
  onSelectedPropertyChange: (value: string) => void;
  onPaymentAmountChange: (value: string) => void;
  onPaymentMethodChange: (value: string) => void;
  onPaymentNoteChange: (value: string) => void;
  onRegisterPayment: () => void;
};

const inputSx: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2.5,
    bgcolor: "#fbfdfc",
    fontSize: 14,
    fontWeight: 600,
    color: colors.text,
    "& fieldset": {
      borderColor: colors.cardBorder,
    },
    "&:hover fieldset": {
      borderColor: "#94a3b8",
    },
    "&.Mui-focused fieldset": {
      borderColor: colors.primaryLight,
      borderWidth: 1.5,
    },
  },
};

const selectSx: SxProps<Theme> = {
  borderRadius: 2.5,
  bgcolor: "#fbfdfc",
  fontSize: 14,
  fontWeight: 600,
  color: colors.text,
  "& fieldset": {
    borderColor: colors.cardBorder,
  },
  "&:hover fieldset": {
    borderColor: "#94a3b8",
  },
  "&.Mui-focused fieldset": {
    borderColor: colors.primaryLight,
    borderWidth: 1.5,
  },
};

export function PropertyPaymentSection({
  selectedProperty,
  properties,
  selectedPropertyId,
  paymentAmount,
  paymentMethod,
  paymentMethods,
  paymentNote,
  error,
  onSelectedPropertyChange,
  onPaymentAmountChange,
  onPaymentMethodChange,
  onPaymentNoteChange,
  onRegisterPayment,
}: PropertyPaymentSectionProps) {
  return (
    <PropertySectionCard sx={{ height: "100%" }}>
      <PropertySectionHeader icon={<FaReceipt />} title="Registrar abono" />

      <Divider />

      <Box
        sx={{
          p: {
            xs: 1.8,
            md: 2.5,
          },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {error ? (
          <Box
            sx={{
              px: 1.5,
              py: 1,
              borderRadius: "16px",
              bgcolor: colors.dangerSoft,
              border: "1px solid #fecaca",
              color: colors.danger,
              fontSize: 12,
              fontWeight: 800,
            }}
          >
            {error}
          </Box>
        ) : null}

        <Box>
          <FieldLabel>Propiedad</FieldLabel>

          <FormControl fullWidth size="small">
            <Select
              value={selectedPropertyId}
              onChange={(event) =>
                onSelectedPropertyChange(String(event.target.value))
              }
              sx={selectSx}
            >
              {properties.map((property) => (
                <MenuItem key={property.id} value={property.id}>
                  {property.name} - {property.ownerName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <FieldLabel>Monto del abono</FieldLabel>

          <TextField
            type="number"
            size="small"
            value={paymentAmount}
            onChange={(event) => onPaymentAmountChange(event.target.value)}
            slotProps={{
              htmlInput: {
                min: 1,
                step: 1,
              },
            }}
            fullWidth
            sx={inputSx}
          />
        </Box>

        <Box>
          <FieldLabel>Método de pago</FieldLabel>

          <FormControl fullWidth size="small">
            <Select
              value={paymentMethod}
              onChange={(event) =>
                onPaymentMethodChange(String(event.target.value))
              }
              sx={selectSx}
            >
              {paymentMethods.map((method) => (
                <MenuItem key={method} value={method}>
                  {method}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <FieldLabel>Nota</FieldLabel>

          <TextField
            size="small"
            value={paymentNote}
            onChange={(event) => onPaymentNoteChange(event.target.value)}
            fullWidth
            sx={inputSx}
          />
        </Box>

        <AccountSummary property={selectedProperty} />

        <Button
          fullWidth
          variant="contained"
          startIcon={<FaPlusCircle />}
          onClick={onRegisterPayment}
          sx={{
            py: 1.35,
            borderRadius: 2.5,
            color: "white",
            bgcolor: colors.primary,
            fontWeight: 700,
            textTransform: "none",
            boxShadow: "0 12px 24px rgba(37, 99, 235, 0.22)",
            "&:hover": {
              bgcolor: "#172554",
              boxShadow: "0 14px 28px rgba(37, 99, 235, 0.28)",
            },
          }}
        >
          Registrar abono
        </Button>
      </Box>
    </PropertySectionCard>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <Typography
      sx={{
        mb: 0.75,
        fontSize: 11,
        color: colors.text,
        fontWeight: 950,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
      }}
    >
      {children}
    </Typography>
  );
}

function AccountSummary({ property }: { property?: PropertyItem }) {
  if (!property) {
    return null;
  }

  const pendingAmount = getPendingAmount(property);
  const statusColors = getStatusColors(property.status);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: "16px",
        bgcolor: "#f8fafc",
        border: `1px solid ${colors.cardBorder}`,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.1 }}>
        <SummaryRow label="Terreno" value={property.name} />
        <SummaryRow label="Cliente propietario" value={property.ownerName} />
        <SummaryRow
          label="Valor total"
          value={formatCurrency(property.price)}
        />
        <SummaryRow label="Abonado" value={formatCurrency(property.paid)} />
        <SummaryRow
          label="Saldo pendiente"
          value={formatCurrency(pendingAmount)}
        />

        <Divider sx={{ my: 0.5 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: 13, color: colors.muted, fontWeight: 700 }}
          >
            Estado
          </Typography>

          <Box
            sx={{
              px: 1,
              py: 0.45,
              borderRadius: 999,
              bgcolor: statusColors.bg,
              color: statusColors.color,
              border: `1px solid ${statusColors.border}`,
              fontSize: 11,
              fontWeight: 950,
            }}
          >
            {property.status}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Typography sx={{ fontSize: 13, color: colors.muted, fontWeight: 600 }}>
        {label}
      </Typography>

      <Typography
        sx={{
          fontSize: 13,
          color: colors.text,
          fontWeight: 950,
          textAlign: "right",
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
