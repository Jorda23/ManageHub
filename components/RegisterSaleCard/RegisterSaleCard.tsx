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
  },

  "& input": {
    px: {
      xs: 1.5,
      sm: 1.75,
    },
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
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

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
        width: "100%",
        height: {
          xs: "auto",
          lg: "100%",
        },
        minWidth: 0,
        bgcolor: "#ffffff",
        overflow: "hidden",
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
        {error && (
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
            {error}
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
              value={selectedProductId}
              displayEmpty
              onChange={(event) =>
                onSelectedProductChange(event.target.value)
              }
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
            type="number"
            size="small"
            value={quantity}
            onChange={(event) => onQuantityChange(event.target.value)}
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

        <Box
          sx={{
            gridColumn: "1 / -1",
            minWidth: 0,
          }}
        >
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
        </Box>

<Button
  fullWidth
  variant="contained"
  startIcon={<FaPlusCircle />}
  onClick={onRegisterSale}
  disabled={!selectedProductId || numericQuantity < 1}
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

    transition:
      "background-color 160ms ease, box-shadow 160ms ease, transform 120ms ease",

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
}: {
  productName: string;
  unitPrice: number;
  quantity: number;
  total: number;
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

        <SummaryRow
          label="Precio unitario"
          value={formatCurrency(unitPrice)}
        />

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