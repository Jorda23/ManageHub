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
  width: "100%",

  "& .MuiOutlinedInput-root": {
    width: "100%",
    minHeight: {
      xs: 44,
      sm: 46,
    },
    borderRadius: {
      xs: "12px",
      sm: "14px",
    },
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

  "& .MuiInputBase-input": {
    minWidth: 0,
    px: {
      xs: 1.5,
      sm: 1.75,
    },
  },

  "& .MuiInputBase-inputMultiline": {
    px: 0,
  },
};

const selectSx: SxProps<Theme> = {
  width: "100%",
  minHeight: {
    xs: 44,
    sm: 46,
  },
  borderRadius: {
    xs: "12px",
    sm: "14px",
  },
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

  "& .MuiSelect-select": {
    minWidth: 0,
    display: "flex",
    alignItems: "center",
    px: {
      xs: 1.5,
      sm: 1.75,
    },
    py: 1.25,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
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
  const numericPaymentAmount = Number(paymentAmount);

  const isRegisterPaymentDisabled =
    !selectedPropertyId ||
    !paymentMethod ||
    !Number.isFinite(numericPaymentAmount) ||
    numericPaymentAmount <= 0;

  return (
    <PropertySectionCard
      sx={{
        width: "100%",
        minWidth: 0,
        height: {
          xs: "auto",
          lg: "100%",
        },
        overflow: "hidden",
      }}
    >
      <PropertySectionHeader icon={<FaReceipt />} title="Registrar abono" />

      <Divider />

      <Box
        sx={{
          width: "100%",
          minWidth: 0,
          p: {
            xs: 1.8,
            sm: 2.25,
            md: 2.5,
          },
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            md: "repeat(2, minmax(0, 1fr))",
          },
          gap: {
            xs: 1.75,
            md: 2,
          },
          alignItems: "start",
        }}
      >
        {error ? (
          <Box
            role="alert"
            sx={{
              gridColumn: "1 / -1",
              minWidth: 0,
              px: 1.5,
              py: 1,
              borderRadius: {
                xs: "12px",
                sm: "16px",
              },
              bgcolor: colors.dangerSoft,
              border: "1px solid #fecaca",
              color: colors.danger,
              fontSize: 12,
              fontWeight: 800,
              overflowWrap: "anywhere",
            }}
          >
            {error}
          </Box>
        ) : null}

        <Box
          sx={{
            gridColumn: "1 / -1",
            minWidth: 0,
          }}
        >
          <FieldLabel>Propiedad</FieldLabel>

          <FormControl fullWidth size="small">
            <Select
              value={selectedPropertyId}
              displayEmpty
              onChange={(event) => onSelectedPropertyChange(String(event.target.value))}
              sx={selectSx}
              renderValue={(value) => {
                if (!value) {
                  return (
                    <Typography
                      component="span"
                      sx={{
                        color: colors.muted,
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      Seleccionar propiedad
                    </Typography>
                  );
                }

                const property = properties.find((item) => item.id === String(value));

                return property ? `${property.name} - ${property.ownerName}` : String(value);
              }}
            >
              <MenuItem value="" disabled>
                Seleccionar propiedad
              </MenuItem>

              {properties.map((property) => (
                <MenuItem key={property.id} value={property.id}>
                  <Typography
                    component="span"
                    sx={{
                      minWidth: 0,
                      fontSize: 14,
                      fontWeight: 600,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {property.name} - {property.ownerName}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <FieldLabel>Monto del abono</FieldLabel>

          <TextField
            type="number"
            size="small"
            value={paymentAmount}
            onChange={(event) => onPaymentAmountChange(event.target.value)}
            placeholder="0.00"
            slotProps={{
              htmlInput: {
                min: 0.01,
                step: 0.01,
                inputMode: "decimal",
              },
            }}
            fullWidth
            sx={inputSx}
          />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <FieldLabel>Método de pago</FieldLabel>

          <FormControl fullWidth size="small">
            <Select
              value={paymentMethod}
              displayEmpty
              onChange={(event) => onPaymentMethodChange(String(event.target.value))}
              sx={selectSx}
              renderValue={(value) => {
                if (!value) {
                  return (
                    <Typography
                      component="span"
                      sx={{
                        color: colors.muted,
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      Seleccionar método
                    </Typography>
                  );
                }

                return String(value);
              }}
            >
              <MenuItem value="" disabled>
                Seleccionar método
              </MenuItem>

              {paymentMethods.map((method) => (
                <MenuItem key={method} value={method}>
                  {method}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            gridColumn: "1 / -1",
            minWidth: 0,
          }}
        >
          <FieldLabel>Nota</FieldLabel>

          <TextField
            size="small"
            value={paymentNote}
            onChange={(event) => onPaymentNoteChange(event.target.value)}
            placeholder="Agregar una nota opcional"
            fullWidth
            multiline
            minRows={2}
            maxRows={4}
            sx={inputSx}
          />
        </Box>

        <Box
          sx={{
            gridColumn: "1 / -1",
            minWidth: 0,
          }}
        >
          <AccountSummary property={selectedProperty} />
        </Box>

        <Button
          fullWidth
          variant="contained"
          startIcon={<FaPlusCircle />}
          onClick={onRegisterPayment}
          disabled={isRegisterPaymentDisabled}
          sx={{
            gridColumn: "1 / -1",
            width: "100%",
            minHeight: {
              xs: 52,
              sm: 48,
            },
            px: {
              xs: 2,
              sm: 3,
            },
            py: {
              xs: 1.35,
              sm: 1.2,
            },
            borderRadius: {
              xs: "14px",
              sm: "12px",
            },
            color: "#ffffff",
            bgcolor: colors.primary,
            fontSize: {
              xs: 15,
              sm: 14,
              md: 15,
            },
            lineHeight: 1.2,
            fontWeight: 800,
            textTransform: "none",
            whiteSpace: "nowrap",
            boxShadow: "0 10px 22px rgba(37, 99, 235, 0.22)",
            transition: "background-color 160ms ease, box-shadow 160ms ease, transform 120ms ease",

            "& .MuiButton-startIcon": {
              mr: {
                xs: 1,
                sm: 0.8,
              },

              "& svg": {
                width: {
                  xs: 19,
                  sm: 17,
                },
                height: {
                  xs: 19,
                  sm: 17,
                },
              },
            },

            "&:hover": {
              bgcolor: "#172554",
              boxShadow: "0 14px 28px rgba(37, 99, 235, 0.28)",
            },

            "&:active": {
              transform: "scale(0.985)",
              boxShadow: "0 5px 12px rgba(37, 99, 235, 0.2)",
            },

            "&:focus-visible": {
              outline: "3px solid rgba(37, 99, 235, 0.25)",
              outlineOffset: 2,
            },

            "&.Mui-disabled": {
              bgcolor: "#e2e8f0",
              color: "#94a3b8",
              boxShadow: "none",
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
      component="label"
      sx={{
        display: "block",
        mb: 0.75,
        fontSize: {
          xs: 10,
          sm: 11,
        },
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
        width: "100%",
        minWidth: 0,
        p: {
          xs: 1.5,
          sm: 2,
        },
        borderRadius: {
          xs: "12px",
          sm: "16px",
        },
        bgcolor: "#f8fafc",
        border: `1px solid ${colors.cardBorder}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.1,
          minWidth: 0,
        }}
      >
        <SummaryRow label="Terreno" value={property.name} />

        <SummaryRow label="Cliente propietario" value={property.ownerName} />

        <SummaryRow label="Valor total" value={formatCurrency(property.price)} />

        <SummaryRow label="Abonado" value={formatCurrency(property.paid)} />

        <SummaryRow label="Saldo pendiente" value={formatCurrency(pendingAmount)} highlighted />

        <Divider sx={{ my: 0.5 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            alignItems: "center",
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              minWidth: 0,
              fontSize: 13,
              color: colors.muted,
              fontWeight: 700,
            }}
          >
            Estado
          </Typography>

          <Box
            sx={{
              maxWidth: "65%",
              minWidth: 0,
              px: 1,
              py: 0.45,
              borderRadius: 999,
              bgcolor: statusColors.bg,
              color: statusColors.color,
              border: `1px solid ${statusColors.border}`,
              fontSize: 11,
              lineHeight: 1.2,
              fontWeight: 950,
              textAlign: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {property.status}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

function SummaryRow({
  label,
  value,
  highlighted = false,
}: {
  label: string;
  value: string;
  highlighted?: boolean;
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
          sm: "minmax(0, 1fr) minmax(0, 1.4fr)",
        },
        alignItems: "start",
        gap: {
          xs: 1,
          sm: 2,
        },
        minWidth: 0,
      }}
    >
      <Typography
        sx={{
          minWidth: 0,
          fontSize: {
            xs: 12,
            sm: 13,
          },
          color: colors.muted,
          fontWeight: highlighted ? 700 : 600,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          minWidth: 0,
          fontSize: {
            xs: highlighted ? 13 : 12,
            sm: highlighted ? 14 : 13,
          },
          color: highlighted ? colors.primary : colors.text,
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
