"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { FaCashRegister, FaPlusCircle } from "react-icons/fa";
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
import type { SxProps, Theme } from "@mui/material/styles";

export type SaleProduct = {
  id: string;
  name: string;
  price: number;
};

type RegisterSaleCardProps<TProduct extends SaleProduct> = {
  products: TProduct[];
  selectedProduct?: TProduct;
  selectedProductId: string;
  quantity: string;
  numericQuantity: number;
  paymentMethod: string;
  paymentMethods: string[];
  saleTotal: number;
  error: string;
  productOptionLabel?: (product: TProduct) => string;
  productSummaryLabel?: (product: TProduct) => string;
  onSelectedProductChange: Dispatch<SetStateAction<string>>;
  onQuantityChange: Dispatch<SetStateAction<string>>;
  onPaymentMethodChange: Dispatch<SetStateAction<string>>;
  onRegisterSale: () => void;
};

const colors = {
  text: "#0f172a",
  muted: "#64748b",
  primary: "#92400e",
  primaryLight: "#f59e0b",
  primarySoft: "#ffedd5",
  danger: "#dc2626",
  dangerSoft: "#fee2e2",
  cardBorder: "#dce5e1",
};

const inputSx: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
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
  borderRadius: "16px",
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

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export function RegisterSaleCard<TProduct extends SaleProduct>({
  products,
  selectedProduct,
  selectedProductId,
  quantity,
  numericQuantity,
  paymentMethod,
  paymentMethods,
  saleTotal,
  error,
  productOptionLabel = (product) => product.name,
  productSummaryLabel = (product) => product.name,
  onSelectedProductChange,
  onQuantityChange,
  onPaymentMethodChange,
  onRegisterSale,
}: RegisterSaleCardProps<TProduct>) {
  return (
    <Box
      sx={{
        height: "100%",
        bgcolor: "#ffffff",
      }}
    >
      <Box
        sx={{
          px: {
            xs: 1.8,
            md: 2.5,
          },
          py: 2,
          display: "flex",
          alignItems: "center",
          gap: 1.2,
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "16px",
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
            fontWeight: 950,
            fontSize: {
              xs: 16,
              md: 18,
            },
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
            xs: 1.8,
            md: 2.5,
          },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {error && (
          <Box
            role="alert"
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
        )}

        <Box>
          <FieldLabel>Producto</FieldLabel>

          <FormControl fullWidth size="small">
            <Select
              value={selectedProductId}
              onChange={(event) =>
                onSelectedProductChange(event.target.value)
              }
              sx={selectSx}
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {productOptionLabel(product)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <FieldLabel>Cantidad</FieldLabel>

          <TextField
            type="number"
            size="small"
            value={quantity}
            onChange={(event) => onQuantityChange(event.target.value)}
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
                onPaymentMethodChange(event.target.value)
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

        <SaleSummary
          productName={
            selectedProduct
              ? productSummaryLabel(selectedProduct)
              : "-"
          }
          unitPrice={selectedProduct?.price ?? 0}
          quantity={numericQuantity}
          total={saleTotal}
        />

        <Button
          fullWidth
          variant="contained"
          startIcon={<FaPlusCircle />}
          onClick={onRegisterSale}
          sx={{
            py: 1.35,
            borderRadius: 2.5,
            bgcolor: colors.primary,
            fontWeight: 900,
            textTransform: "none",
            boxShadow: "0 12px 24px rgba(245, 158, 11, 0.22)",

            "&:hover": {
              bgcolor: "#78350f",
              boxShadow: "0 14px 28px rgba(245, 158, 11, 0.28)",
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
}: {
  productName: string;
  unitPrice: number;
  quantity: number;
  total: number;
}) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "16px",
        bgcolor: "#f8fafc",
        border: `1px solid ${colors.cardBorder}`,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.1 }}>
        <SummaryRow label="Producto" value={productName} />

        <SummaryRow
          label="Precio unitario"
          value={formatCurrency(unitPrice)}
        />

        <SummaryRow label="Cantidad" value={`${quantity || 0}`} />

        <Divider sx={{ my: 0.5 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 20, fontWeight: 950 }}>
            Total
          </Typography>

          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 950,
              color: colors.primary,
            }}
          >
            {formatCurrency(total)}
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

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: 13,
          color: colors.muted,
          fontWeight: 600,
        }}
      >
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