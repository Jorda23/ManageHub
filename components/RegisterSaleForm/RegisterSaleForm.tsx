"use client";

import { useMemo, type FormEvent } from "react";

import {
  Box,
  Button,
  Divider,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import type { ReactNode } from "react";

import type { SxProps, Theme } from "@mui/material/styles";

import { useFormik } from "formik";

import { FaCashRegister, FaPlusCircle } from "react-icons/fa";

import { colors } from "@/theme/sharedColors";

import { formatCurrency, selectMenuSx } from "@/shared";

import { paymentMethods } from "@/shared/data/grains.data";
import { useToast } from "../Toast";

import type { RegisterSaleFormValues } from "@/validations";
import { convertCurrency, normalizeCurrency, roundCurrency } from "@/shared/utils/currency";

export type SaleFormProduct = {
  id: string;
  name: string;
  price: number;
  stock: number;
  currency: "USD" | "NIO";
};

type RegisterSaleFormProps<TProduct extends SaleFormProduct> = {
  products: TProduct[];
  schemaFactory: (maxStock: number) => unknown;
  onRegister: (values: RegisterSaleFormValues, product: TProduct) => Promise<void>;
  productOptionLabel?: (product: TProduct) => string;
  productSummaryLabel?: (product: TProduct) => string;
  onRegistered?: () => void;
};

const inputSx: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    minHeight: {
      xs: 44,
      sm: 46,
    },
    borderRadius: {
      xs: "12px",
      sm: "16px",
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

    "&.Mui-error fieldset": {
      borderColor: colors.danger,
    },
  },

  "& input": {
    px: {
      xs: 1.5,
      sm: 1.75,
    },
  },

  "& .MuiFormHelperText-root": {
    minHeight: 16,
    ml: 0.5,
    mt: 0.4,
    color: colors.danger,
    fontSize: 11,
    fontWeight: 650,
  },
};

const selectSx: SxProps<Theme> = {
  minHeight: {
    xs: 44,
    sm: 46,
  },
  borderRadius: {
    xs: "12px",
    sm: "16px",
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
    display: "flex",
    alignItems: "center",
    px: {
      xs: 1.5,
      sm: 1.75,
    },
    py: 1.25,
  },

  "& .MuiSvgIcon-root": {
    color: colors.muted,
  },
};

export function RegisterSaleForm<TProduct extends SaleFormProduct>({
  products,
  schemaFactory,
  onRegister,
  productOptionLabel = (product) => product.name,
  productSummaryLabel = (product) => product.name,
  onRegistered,
}: RegisterSaleFormProps<TProduct>) {
  const { showSuccess, showError } = useToast();

  const formik = useFormik<RegisterSaleFormValues>({
    initialValues: {
      productId: products[0]?.id ?? "",
      quantity: "1",
      paymentMethod: paymentMethods[0],
      currency: products[0]?.currency ?? "NIO",
    },
    validateOnBlur: true,
    validateOnChange: false,

    validate: async (values) => {
      const product = products.find((item) => item.id === values.productId);

      const schema = schemaFactory(product?.stock ?? 0);

      try {
        await (schema as { validate: (v: unknown, o?: unknown) => Promise<unknown> }).validate(
          values,
          { abortEarly: false },
        );

        return undefined;
      } catch (err) {
        const yupError = err as {
          inner?: Array<{ path?: string; message: string }>;
        };

        if (!yupError.inner) {
          return undefined;
        }

        const errors: Record<string, string> = {};

        yupError.inner.forEach((innerError) => {
          if (innerError.path) {
            errors[innerError.path] = innerError.message;
          }
        });

        return errors;
      }
    },

    onSubmit: async (values, helpers) => {
      const product = products.find((item) => item.id === values.productId);

      if (!product) {
        return;
      }

      try {
        const safeCurrency = normalizeCurrency(values.currency);

        await formik.setFieldValue("currency", safeCurrency, false);

        await onRegister(
          {
            productId: product.id,
            quantity: values.quantity,
            paymentMethod: values.paymentMethod,
            currency: safeCurrency,
          },
          product,
        );

        helpers.setFieldValue("quantity", "1");
        helpers.setFieldTouched("quantity", false);
        helpers.setErrors({});
        helpers.setStatus(undefined);
        showSuccess("Venta registrada correctamente.");
        onRegistered?.();
      } catch (err) {
        const message = err instanceof Error ? err.message : "No se pudo registrar la venta.";

        helpers.setStatus(message);
        showError(message);
      }
    },
  });

  const selectedProduct = useMemo(() => {
    return products.find((product) => product.id === formik.values.productId) ?? products[0];
  }, [products, formik.values.productId]);

  const numericQuantity = Number(formik.values.quantity);

  const paymentCurrency = normalizeCurrency(formik.values.currency);

  const productCurrency = selectedProduct
    ? normalizeCurrency(selectedProduct.currency)
    : paymentCurrency;

  const saleTotal =
    selectedProduct && !Number.isNaN(numericQuantity) ? selectedProduct.price * numericQuantity : 0;

  const convertedUnitPrice = selectedProduct
    ? roundCurrency(convertCurrency(selectedProduct.price, productCurrency, paymentCurrency))
    : 0;

  const convertedTotal = roundCurrency(
    convertCurrency(saleTotal, productCurrency, paymentCurrency),
  );

  const getFieldError = (field: keyof RegisterSaleFormValues): string | undefined => {
    if (!formik.touched[field]) {
      return undefined;
    }

    return formik.errors[field];
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const errors = await formik.validateForm();

    if (Object.keys(errors).length > 0) {
      await formik.setTouched({
        productId: true,
        quantity: true,
        paymentMethod: true,
        currency: true,
      });
      showError("Revisa los campos marcados antes de continuar.");
      return;
    }

    await formik.submitForm();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          px: {
            xs: 2,
            sm: 2.5,
            md: 3,
          },
          py: {
            xs: 1.75,
            sm: 2,
          },
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 1.25,
        }}
      >
        <Box
          sx={{
            width: {
              xs: 34,
              sm: 38,
            },
            height: {
              xs: 34,
              sm: 38,
            },
            borderRadius: {
              xs: "12px",
              sm: "16px",
            },
            display: "grid",
            placeItems: "center",
            color: colors.primary,
            bgcolor: colors.primarySoft,
            flexShrink: 0,
          }}
        >
          <FaCashRegister />
        </Box>

        <Typography
          component="h2"
          sx={{
            m: 0,
            minWidth: 0,
            fontWeight: 950,
            fontSize: {
              xs: 17,
              sm: 18,
              md: 20,
            },
            lineHeight: 1.2,
            color: colors.text,
          }}
        >
          Registrar venta
        </Typography>
      </Box>

      <Divider />

      <Box
        sx={{
          p: {
            xs: 2,
            sm: 2.5,
            md: 3,
          },
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            md: "repeat(2, minmax(0, 1fr))",
          },
          gap: {
            xs: 2,
            md: 2.25,
          },
          alignItems: "start",
        }}
      >
        {formik.status && (
          <Box
            role="alert"
            sx={{
              gridColumn: "1 / -1",
              px: 1.5,
              py: 1.15,
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
            {formik.status}
          </Box>
        )}

        <Box
          sx={{
            minWidth: 0,
            gridColumn: {
              xs: "auto",
              md: "1 / -1",
            },
          }}
        >
          <FieldLabel>Producto</FieldLabel>

          <FormControl fullWidth size="small">
            <Select
              name="productId"
              value={formik.values.productId}
              displayEmpty
              MenuProps={{ slotProps: { paper: { sx: selectMenuSx } } }}
              onChange={(event) => {
                const productId = String(event.target.value);
                const product = products.find((item) => item.id === productId);

                void formik.setValues((currentValues) => ({
                  ...currentValues,
                  productId,
                  currency: product?.currency ?? currentValues.currency,
                }));
              }}
              onBlur={formik.handleBlur}
              error={Boolean(getFieldError("productId"))}
              sx={selectSx}
            >
              {!products.length && (
                <MenuItem value="" disabled>
                  No hay productos disponibles
                </MenuItem>
              )}

              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {productOptionLabel(product)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <FieldLabel>Cantidad</FieldLabel>

          <TextField
            name="quantity"
            type="number"
            size="small"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(getFieldError("quantity"))}
            helperText={getFieldError("quantity")}
            slotProps={{
              htmlInput: {
                min: 1,
                step: 1,
                inputMode: "numeric",
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
              name="paymentMethod"
              value={formik.values.paymentMethod}
              MenuProps={{ slotProps: { paper: { sx: selectMenuSx } } }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(getFieldError("paymentMethod"))}
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

        <Box
          sx={{
            gridColumn: "1 / -1",
            minWidth: 0,
          }}
        >
          <SaleSummary
            productName={selectedProduct ? productSummaryLabel(selectedProduct) : "-"}
            unitPrice={convertedUnitPrice}
            quantity={numericQuantity}
            total={convertedTotal}
            currency={paymentCurrency}
          />
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          startIcon={<FaPlusCircle />}
          disabled={!formik.values.productId}
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
              xs: 1.4,
              sm: 1.2,
            },
            borderRadius: {
              xs: "14px",
              sm: "12px",
            },

            bgcolor: colors.primary,
            color: "#ffffff",
            fontSize: {
              xs: 15,
              sm: 14,
              md: 15,
            },
            lineHeight: 1.2,
            fontWeight: 900,
            textTransform: "none",
            whiteSpace: "nowrap",

            boxShadow: {
              xs: "0 8px 18px rgba(146, 64, 14, 0.2)",
              sm: "0 10px 22px rgba(146, 64, 14, 0.22)",
            },

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
              bgcolor: "#78350f",
              boxShadow: "0 12px 24px rgba(146, 64, 14, 0.26)",
            },

            "&:active": {
              transform: "scale(0.985)",
              boxShadow: "0 5px 12px rgba(146, 64, 14, 0.2)",
            },

            "&:focus-visible": {
              outline: "3px solid rgba(245, 158, 11, 0.35)",
              outlineOffset: 2,
            },

            "&.Mui-disabled": {
              bgcolor: "#e2e8f0",
              color: "#94a3b8",
              boxShadow: "none",
            },
          }}
        >
          Registrar venta
        </Button>
      </Box>
    </Box>
  );
}

function SaleSummary({
  productName,
  unitPrice,
  quantity,
  total,
  currency,
}: {
  productName: string;
  unitPrice: number;
  quantity: number;
  total: number;
  currency: "USD" | "NIO";
}) {
  return (
    <Box
      sx={{
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
        minWidth: 0,
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
        <SummaryRow label="Producto" value={productName} />

        <SummaryRow label="Precio unitario" value={formatCurrency(unitPrice, currency)} />

        <SummaryRow label="Cantidad" value={`${quantity || 0}`} />

        <Divider sx={{ my: 0.5 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            justifyContent: "space-between",
            alignItems: {
              xs: "stretch",
              sm: "center",
            },
            gap: {
              xs: 0.25,
              sm: 2,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 15,
                sm: 18,
                md: 20,
              },
              fontWeight: 950,
            }}
          >
            Total
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: 24,
                sm: 22,
                md: 24,
              },
              lineHeight: 1.15,
              fontWeight: 950,
              color: colors.primary,
              textAlign: {
                xs: "left",
                sm: "right",
              },
              overflowWrap: "anywhere",
            }}
          >
            {formatCurrency(total, currency)}
          </Typography>
        </Box>
      </Box>
    </Box>
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

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "minmax(0, 0.8fr) minmax(0, 1.2fr)",
          sm: "minmax(0, 1fr) minmax(0, 1.4fr)",
        },
        alignItems: "start",
        gap: 1.5,
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
          fontWeight: 600,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          minWidth: 0,
          fontSize: {
            xs: 12,
            sm: 13,
          },
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
