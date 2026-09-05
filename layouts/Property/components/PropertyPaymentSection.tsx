import type { FormEvent, ReactNode } from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import type { SxProps, Theme } from "@mui/material/styles";

import { useFormik } from "formik";

import { FaPlusCircle, FaReceipt } from "react-icons/fa";

import {
  formatCurrency,
  getPendingAmount,
  getStatusColors,
  paymentMethods,
  selectMenuSx,
  type PropertyItem,
} from "@/shared";

import { useRegisterPropertyPayment } from "@/hook/useProperties";

import { downloadPaymentInvoicePdf } from "@/utils/generatePaymentInvoice";

import {
  registerPropertyPaymentSchema,
  type RegisterPropertyPaymentFormValues,
} from "@/validations/registerPropertyPayment.schema";

import { colors } from "@/theme/sharedColors";
import { useToast } from "@/components/Toast";
import {
  convertCurrency,
  currencies,
  currencyLabels,
  EXCHANGE_RATE_NIO_PER_USD,
  normalizeCurrency,
  roundCurrency,
} from "@/shared/utils/currency";

import { PropertySectionCard } from "./PropertySectionCard";
import { PropertySectionHeader } from "./PropertySectionHeader";

type PropertyPaymentSectionProps = {
  properties: PropertyItem[];
  onRegistered?: () => void;
};

const initialValues: RegisterPropertyPaymentFormValues = {
  propertyId: "",
  amount: "500",
  paymentMethod: paymentMethods[0] ?? "",
  currency: "NIO",
  note: "Abono de cuota",
};

export function PropertyPaymentSection({
  properties,
  onRegistered,
}: Readonly<PropertyPaymentSectionProps>) {
  const { mutateAsync: registerPropertyPayment, isPending: isRegisteringPayment } =
    useRegisterPropertyPayment();
  const { showSuccess, showError } = useToast();

  const formik = useFormik<RegisterPropertyPaymentFormValues>({
    initialValues,

    validationSchema: registerPropertyPaymentSchema,

    validateOnBlur: true,

    validateOnChange: false,

    onSubmit: async (values, helpers): Promise<void> => {
      const selectedProperty = properties.find((property) => property.id === values.propertyId);

      if (!selectedProperty) {
        helpers.setFieldError("propertyId", "Selecciona una propiedad válida");
        showError("Selecciona una propiedad válida.");

        return;
      }

      const amount = Number(values.amount);

      const safeCurrency = normalizeCurrency(values.currency);

      const propertyCurrency = normalizeCurrency(selectedProperty.currency);

      const pendingAmount = getPendingAmount(selectedProperty);

      const convertedPendingAmount = roundCurrency(
        convertCurrency(pendingAmount, propertyCurrency, safeCurrency),
      );

      const paymentAmountInPropertyCurrency = Number.isFinite(amount)
        ? roundCurrency(convertCurrency(amount, safeCurrency, propertyCurrency))
        : 0;

      if (convertedPendingAmount <= 0) {
        helpers.setStatus("Esta cuenta ya está pagada en su totalidad.");
        showError("Esta cuenta ya está pagada en su totalidad.");

        return;
      }

      if (amount > convertedPendingAmount) {
        helpers.setFieldError("amount", "El abono no puede ser mayor al saldo pendiente");
        showError("El abono no puede ser mayor al saldo pendiente.");

        return;
      }

      helpers.setStatus(undefined);

      try {
        await formik.setFieldValue("currency", safeCurrency, false);

        const payment = await registerPropertyPayment({
          propertyId: selectedProperty.id,

          amount,

          paymentMethod: values.paymentMethod,
          currency: safeCurrency,

          note: values.note.trim() || null,
        });

        showSuccess("Abono registrado correctamente.");

        try {
          const invoiceNumber = payment?.id ? `REC-${payment.id}` : `REC-${Date.now()}`;

          const paidAfterPayment = roundCurrency(
            payment?.amountPaid ?? selectedProperty.paid + paymentAmountInPropertyCurrency,
          );

          const pendingAfterPayment = Math.max(
            roundCurrency(
              payment?.pendingBalance ??
                getPendingAmount(selectedProperty) - paymentAmountInPropertyCurrency,
            ),
            0,
          );

          await downloadPaymentInvoicePdf({
            fileName: `${invoiceNumber}.pdf`,

            invoiceNumber,

            propertyName: selectedProperty.name,

            propertyCode: selectedProperty.code,

            buyerName: selectedProperty.ownerName,

            amount: payment?.amount ?? amount,

            paymentMethod: payment?.paymentMethod ?? values.paymentMethod,
            currency: payment?.currency ?? safeCurrency,

            note: payment?.note ?? (values.note.trim() || null),

            totalPrice: selectedProperty.price,

            previousPaid: selectedProperty.paid,

            propertyCurrency,

            paymentAmountInPropertyCurrency,

            paidAfterPayment,

            pendingAfterPayment,

            paymentDate: payment?.createdAt ? new Date(payment.createdAt) : new Date(),
          });
        } catch (error) {
          console.error("Error generando recibo:", error);

          helpers.setStatus("El pago fue registrado, pero no se pudo generar el recibo.");
          showError("El pago fue registrado, pero no se pudo generar el recibo.");

          return;
        }

        helpers.resetForm({
          values: {
            ...initialValues,
            propertyId: selectedProperty.id,
          },
        });
        onRegistered?.();
      } catch (error) {
        console.error("Error registrando abono:", error);

        helpers.setStatus("No se pudo registrar el abono.");
        showError("No se pudo registrar el abono.");
      }
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const errors = await formik.validateForm();

    if (Object.keys(errors).length > 0) {
      await formik.setTouched({
        propertyId: true,
        amount: true,
        paymentMethod: true,
        currency: true,
        note: true,
      });
      showError("Revisa los campos marcados antes de continuar.");
      return;
    }

    await formik.submitForm();
  };

  const selectedProperty = properties.find((property) => property.id === formik.values.propertyId);

  const propertyError = formik.touched.propertyId ? formik.errors.propertyId : undefined;

  const amountError = formik.touched.amount ? formik.errors.amount : undefined;

  const paymentMethodError = formik.touched.paymentMethod ? formik.errors.paymentMethod : undefined;

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
        border: "0",
        borderRadius: 0,
        boxShadow: "none",
      }}
    >
      <PropertySectionHeader icon={<FaReceipt />} title="Registrar abono" />

      <Divider />

      <Box
        component="form"
        onSubmit={handleSubmit}
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
        {formik.status && (
          <Alert
            severity="error"
            sx={{
              gridColumn: "1 / -1",
            }}
          >
            {formik.status}
          </Alert>
        )}

        <Box
          sx={{
            gridColumn: "1 / -1",
            minWidth: 0,
          }}
        >
          <FieldLabel>Propiedad</FieldLabel>

          <FormControl fullWidth size="small" error={Boolean(propertyError)}>
            <Select
              id="propertyId"
              name="propertyId"
              value={formik.values.propertyId}
              displayEmpty
              MenuProps={{ slotProps: { paper: { sx: selectMenuSx } } }}
              disabled={isRegisteringPayment}
              onChange={(event) => {
                void formik.setFieldValue("propertyId", String(event.target.value));

                formik.setStatus(undefined);
              }}
              onBlur={() => {
                void formik.setFieldTouched("propertyId", true);
              }}
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

            {propertyError && <FormHelperText>{propertyError}</FormHelperText>}
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <FieldLabel>Monto del abono</FieldLabel>

          <TextField
            id="amount"
            name="amount"
            type="number"
            size="small"
            value={formik.values.amount}
            onChange={(event) => {
              formik.handleChange(event);
              formik.setStatus(undefined);
            }}
            onBlur={formik.handleBlur}
            placeholder="0.00"
            error={Boolean(amountError)}
            helperText={amountError}
            disabled={isRegisteringPayment}
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

          <FormControl fullWidth size="small" error={Boolean(paymentMethodError)}>
            <Select
              id="paymentMethod"
              name="paymentMethod"
              value={formik.values.paymentMethod}
              displayEmpty
              MenuProps={{ slotProps: { paper: { sx: selectMenuSx } } }}
              disabled={isRegisteringPayment}
              onChange={(event) => {
                void formik.setFieldValue("paymentMethod", String(event.target.value));

                formik.setStatus(undefined);
              }}
              onBlur={() => {
                void formik.setFieldTouched("paymentMethod", true);
              }}
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

              {paymentMethods?.map((method) => (
                <MenuItem key={method} value={method}>
                  {method}
                </MenuItem>
              ))}
            </Select>

            {paymentMethodError && <FormHelperText>{paymentMethodError}</FormHelperText>}
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <FieldLabel>Moneda</FieldLabel>
          <FormControl fullWidth size="small">
            <Select
              id="currency"
              name="currency"
              value={formik.values.currency}
              MenuProps={{ slotProps: { paper: { sx: selectMenuSx } } }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.currency && formik.errors.currency)}
              sx={selectSx}
            >
              {currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currencyLabels[currency]}
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
            id="note"
            name="note"
            size="small"
            value={formik.values.note}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Agregar una nota opcional"
            disabled={isRegisteringPayment}
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
          <AccountSummary
            property={selectedProperty}
            currency={formik.values.currency}
            amount={Number(formik.values.amount)}
          />
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          startIcon={
            isRegisteringPayment ? <CircularProgress size={17} color="inherit" /> : <FaPlusCircle />
          }
          disabled={isRegisteringPayment || !formik.values.propertyId}
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
          {isRegisteringPayment ? "Registrando abono..." : "Registrar abono"}
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

function AccountSummary({
  property,
  currency,
  amount,
}: {
  property?: PropertyItem;
  currency: "USD" | "NIO";
  amount: number;
}) {
  if (!property) {
    return null;
  }

  const pendingAmount = getPendingAmount(property);

  const propertyCurrency = normalizeCurrency(property.currency);

  const paymentCurrency = normalizeCurrency(currency);

  const needsConversion = propertyCurrency !== paymentCurrency;

  const equivalentAmount = Number.isFinite(amount)
    ? roundCurrency(convertCurrency(amount, paymentCurrency, propertyCurrency))
    : 0;

  const paidAfterPayment = roundCurrency(
    convertCurrency(property.paid, propertyCurrency, propertyCurrency) + equivalentAmount,
  );

  const pendingAfterPayment = Math.max(
    roundCurrency(getPendingAmount(property) - equivalentAmount),
    0,
  );

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

        <SummaryRow label="Valor total" value={formatCurrency(property.price, propertyCurrency)} />

        <SummaryRow label="Abonado" value={formatCurrency(property.paid, propertyCurrency)} />

        <SummaryRow
          label="Saldo pendiente"
          value={formatCurrency(pendingAmount, propertyCurrency)}
          highlighted
        />

        {needsConversion && (
          <Box
            sx={{
              px: 1.25,
              py: 1,
              borderRadius: "12px",
              bgcolor: colors.primarySoft,
              border: `1px solid ${colors.primaryBorder}`,
              color: colors.primaryLight,
              fontSize: 12,
              lineHeight: 1.45,
              fontWeight: 700,
            }}
          >
            El pago se aplicará en la moneda de la propiedad ({propertyCurrency}). La tasa fija es 1
            USD = {EXCHANGE_RATE_NIO_PER_USD.toLocaleString("es-US")} C$.
          </Box>
        )}

        {Number.isFinite(amount) && amount > 0 && (
          <Box
            sx={{
              mt: 0.25,
              px: 1.25,
              py: 1,
              borderRadius: "12px",
              bgcolor: "#ffffff",
              border: `1px solid ${colors.cardBorder}`,
            }}
          >
            <SummaryRow
              label="Abono a registrar"
              value={formatCurrency(amount, paymentCurrency)}
              highlighted
            />

            {needsConversion && (
              <SummaryRow
                label="Equivale a"
                value={formatCurrency(equivalentAmount, propertyCurrency)}
              />
            )}

            <Divider sx={{ my: 0.75 }} />

            <SummaryRow
              label="Abonado tras pago"
              value={formatCurrency(paidAfterPayment, propertyCurrency)}
            />

            <SummaryRow
              label="Saldo tras pago"
              value={formatCurrency(pendingAfterPayment, propertyCurrency)}
              highlighted
            />
          </Box>
        )}

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

  "& .MuiSvgIcon-root": {
    color: colors.muted,
  },
};
