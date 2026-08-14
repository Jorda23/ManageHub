"use client";

import { Box, Button, Chip, IconButton, LinearProgress, Paper, Typography } from "@mui/material";

import {
  FaBoxOpen,
  FaCheckCircle,
  FaEdit,
  FaExclamationTriangle,
  FaPlus,
  FaTools,
} from "react-icons/fa";
import { EmptyState } from "../EmptyState";

export type HardwareStatus = "inStock" | "lowStock";

export type HardwareProduct = {
  id: string;
  name: string;
  detail: string;
  stock: number;
  minStock: number;
  price: number;
  code: string;
  accent: string;
  imageUrl: string;
  category?: string;
  status?: HardwareStatus;
};

type HardwareInventoryProps = {
  products: HardwareProduct[];
  onAddProduct: () => void;
  onEditProduct?: (product: HardwareProduct) => void;
};

const colors = {
  cardBg: "#ffffff",
  cardBorder: "#dce5e1",
  text: "#0f172a",
  muted: "#64748b",
  softMuted: "#94a3b8",
  primary: "#92400e",
  primaryDark: "#78350f",
  primaryLight: "#f59e0b",
  primarySoft: "#ffedd5",
  danger: "#dc2626",
  dangerSoft: "#fee2e2",
  green: "#0f766e",
  greenSoft: "#dcfce7",
  imageFallback: "#f4e7db",
  scrollTrack: "#f1f5f9",
  scrollThumb: "#c1cbc7",
  scrollThumbHover: "#94a3a0",
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export function HardwareInventory({
  products,
  onAddProduct,
  onEditProduct,
}: HardwareInventoryProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        minWidth: 0,
        overflow: "hidden",
        borderRadius: {
          xs: "12px",
          sm: "14px",
          md: "16px",
        },
        border: `1px solid ${colors.cardBorder}`,
        bgcolor: colors.cardBg,
        boxShadow: "0 10px 28px rgba(15, 23, 42, 0.06)",
      }}
    >
      <InventoryHeader onAddProduct={onAddProduct} />

      <Box
        sx={{
          maxHeight: {
            xs: 460,
            sm: 500,
            md: 540,
            lg: 580,
          },
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarGutter: "stable",

          p: {
            xs: 1,
            sm: 1.5,
            md: 2,
            lg: 2.5,
          },

          pr: {
            xs: 0.75,
            sm: 1,
            md: 1.25,
            lg: 1.5,
          },

          "&::-webkit-scrollbar": {
            width: {
              xs: 5,
              sm: 7,
              md: 8,
            },
          },

          "&::-webkit-scrollbar-track": {
            bgcolor: colors.scrollTrack,
            borderRadius: 999,
          },

          "&::-webkit-scrollbar-thumb": {
            bgcolor: colors.scrollThumb,
            borderRadius: 999,
            border: `2px solid ${colors.scrollTrack}`,
          },

          "&::-webkit-scrollbar-thumb:hover": {
            bgcolor: colors.scrollThumbHover,
          },

          scrollbarWidth: "thin",
          scrollbarColor: `${colors.scrollThumb} ${colors.scrollTrack}`,
        }}
      >
        {products.length === 0 ? (
          <EmptyState
            title=" No hay productos registrados"
            description="Agrega el primer producto al inventario de ferretería."
            icon={<FaBoxOpen size={40} />}
          />
        ) : (
          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "minmax(0, 1fr)",
                md: "repeat(2, minmax(0, 1fr))",
                xl: "repeat(3, minmax(0, 1fr))",
              },

              gap: {
                xs: 1,
                sm: 1.5,
                md: 2,
              },

              width: "100%",
              minWidth: 0,
            }}
          >
            {products.map((product) => (
              <HardwareProductCard key={product.id} product={product} onEdit={onEditProduct} />
            ))}
          </Box>
        )}
      </Box>
    </Paper>
  );
}

function InventoryHeader({ onAddProduct }: { onAddProduct: () => void }) {
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 2,

        px: {
          xs: 1.25,
          sm: 2,
          md: 2.5,
        },

        py: {
          xs: 1.25,
          sm: 1.75,
          md: 2,
        },

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
          xs: 1.25,
          sm: 2,
        },

        bgcolor: "#ffffff",
        borderBottom: `1px solid ${colors.cardBorder}`,

        "@media (min-width: 400px)": {
          flexDirection: "row",
          alignItems: "center",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",

          gap: {
            xs: 0.8,
            sm: 1.2,
          },

          minWidth: 0,
        }}
      >
        <Box
          sx={{
            width: {
              xs: 27,
              sm: 30,
            },

            height: {
              xs: 27,
              sm: 30,
            },

            borderRadius: {
              xs: "8px",
              sm: "10px",
            },

            display: "grid",
            placeItems: "center",
            color: colors.primary,
            bgcolor: colors.primarySoft,
            flexShrink: 0,
          }}
        >
          <FaBoxOpen size={13} />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            noWrap
            sx={{
              color: colors.text,

              fontSize: {
                xs: 13,
                sm: 16,
              },

              fontWeight: 950,
              lineHeight: 1.2,
            }}
          >
            Inventario de ferretería
          </Typography>

          <Typography
            noWrap
            sx={{
              mt: 0.2,
              color: colors.muted,

              fontSize: {
                xs: 9.5,
                sm: 11,
              },

              lineHeight: 1.3,
            }}
          >
            Productos, existencias y niveles mínimos
          </Typography>
        </Box>
      </Box>

      <Button
        type="button"
        variant="contained"
        size="small"
        startIcon={<FaPlus size={11} />}
        onClick={onAddProduct}
        sx={{
          minHeight: {
            xs: 32,
            sm: 34,
          },

          width: {
            xs: "100%",
            sm: "auto",
          },

          px: {
            xs: 1.2,
            sm: 1.75,
          },

          borderRadius: "8px",
          bgcolor: colors.primary,
          color: "#ffffff",

          fontSize: {
            xs: 9,
            sm: 10,
          },

          fontWeight: 900,
          textTransform: "none",
          whiteSpace: "nowrap",
          boxShadow: "none",

          "@media (min-width: 400px)": {
            width: "auto",
          },

          "&:hover": {
            bgcolor: colors.primaryDark,
            boxShadow: "none",
          },
        }}
      >
        Nuevo producto
      </Button>
    </Box>
  );
}

function HardwareProductCard({
  product,
  onEdit,
}: {
  product: HardwareProduct;
  onEdit?: (product: HardwareProduct) => void;
}) {
  const isLowStock = product.status === "lowStock" || product.stock <= product.minStock;

  const stockPercent =
    product.minStock > 0
      ? Math.min(100, (product.stock / Math.max(product.minStock * 4, product.stock)) * 100)
      : 100;

  const progressColor = isLowStock ? colors.danger : product.accent;

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        minWidth: 0,
        overflow: "hidden",

        borderRadius: {
          xs: "12px",
          sm: "14px",
          md: "16px",
        },

        border: `1px solid ${colors.cardBorder}`,
        bgcolor: "#ffffff",

        transition: "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease",

        "&:hover": {
          transform: {
            xs: "none",
            md: "translateY(-2px)",
          },

          borderColor: "#b7c7c2",

          boxShadow: {
            xs: "none",
            md: "0 12px 26px rgba(15, 23, 42, 0.08)",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "76px minmax(0, 1fr)",
            sm: "88px minmax(0, 1fr)",
            md: "96px minmax(0, 1fr)",
            lg: "100px minmax(0, 1fr)",
          },

          minHeight: {
            xs: 126,
            sm: 136,
            md: 145,
            lg: 150,
          },

          "@media (max-width: 340px)": {
            gridTemplateColumns: "68px minmax(0, 1fr)",
          },
        }}
      >
        <ProductImage product={product} isLowStock={isLowStock} />

        <Box
          sx={{
            minWidth: 0,
            overflow: "hidden",

            p: {
              xs: 1,
              sm: 1.25,
              md: 1.5,
            },

            display: "flex",
            flexDirection: "column",

            gap: {
              xs: 0.7,
              sm: 0.9,
              md: 1.05,
            },
          }}
        >
          <ProductHeader product={product} isLowStock={isLowStock} onEdit={onEdit} />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",

              gap: {
                xs: 0.6,
                sm: 1,
              },

              minWidth: 0,
            }}
          >
            <ProductInfo label="Detalle" value={product.detail} />

            <ProductInfo
              label="Precio"
              value={formatCurrency(product.price)}
              valueColor={colors.primary}
              align="right"
            />
          </Box>

          {product.category && (
            <Typography
              noWrap
              title={`Categoría: ${product.category}`}
              sx={{
                color: colors.muted,

                fontSize: {
                  xs: 8,
                  sm: 9,
                  md: 9.5,
                },

                fontWeight: 700,
                maxWidth: "100%",
              }}
            >
              Categoría:{" "}
              <Box
                component="span"
                sx={{
                  color: colors.text,
                  fontWeight: 900,
                }}
              >
                {product.category}
              </Box>
            </Typography>
          )}

          <StockProgress
            stock={product.stock}
            minStock={product.minStock}
            stockPercent={stockPercent}
            progressColor={progressColor}
            isLowStock={isLowStock}
          />
        </Box>
      </Box>
    </Paper>
  );
}

function ProductImage({ product, isLowStock }: { product: HardwareProduct; isLowStock: boolean }) {
  return (
    <Box
      role="img"
      aria-label={`Imagen de ${product.name}`}
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        minWidth: 0,

        minHeight: {
          xs: 126,
          sm: 136,
          md: 145,
          lg: 150,
        },

        display: "grid",
        placeItems: "center",
        bgcolor: colors.imageFallback,

        backgroundImage: product.imageUrl
          ? `
              linear-gradient(
                to bottom,
                rgba(120, 53, 15, 0.01),
                rgba(120, 53, 15, 0.18)
              ),
              url("${product.imageUrl}")
            `
          : "linear-gradient(135deg, #fff7ed, #fed7aa)",

        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {!product.imageUrl && (
        <Box
          aria-hidden="true"
          sx={{
            display: "grid",
            placeItems: "center",
            color: "rgba(146, 64, 14, 0.45)",

            fontSize: {
              xs: 20,
              sm: 23,
              md: 26,
            },
          }}
        >
          <FaTools />
        </Box>
      )}

      <Chip
        label={isLowStock ? "Stock bajo" : "Disponible"}
        size="small"
        sx={{
          position: "absolute",

          left: {
            xs: 4,
            sm: 6,
            md: 8,
          },

          bottom: {
            xs: 5,
            sm: 6,
            md: 8,
          },

          maxWidth: {
            xs: "calc(100% - 8px)",
            sm: "calc(100% - 12px)",
            md: "calc(100% - 16px)",
          },

          height: {
            xs: 18,
            sm: 20,
            md: 21,
          },

          bgcolor: isLowStock ? "rgba(254, 226, 226, 0.95)" : "rgba(220, 252, 231, 0.95)",

          color: isLowStock ? colors.danger : colors.green,

          border: `1px solid ${isLowStock ? "#fecaca" : "#bbf7d0"}`,

          fontSize: {
            xs: 6.8,
            sm: 7.5,
            md: 8,
          },

          fontWeight: 950,
          backdropFilter: "blur(5px)",

          "& .MuiChip-label": {
            px: {
              xs: 0.45,
              sm: 0.65,
              md: 0.8,
            },

            overflow: "hidden",
            textOverflow: "ellipsis",
          },
        }}
      />
    </Box>
  );
}

function ProductHeader({
  product,
  isLowStock,
  onEdit,
}: {
  product: HardwareProduct;
  isLowStock: boolean;
  onEdit?: (product: HardwareProduct) => void;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",

        gap: {
          xs: 0.5,
          sm: 1,
        },

        minWidth: 0,
      }}
    >
      <Box
        sx={{
          minWidth: 0,
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",

            gap: {
              xs: 0.4,
              sm: 0.6,
            },

            minWidth: 0,
          }}
        >
          <Typography
            noWrap
            title={product.name}
            sx={{
              minWidth: 0,
              maxWidth: "100%",
              color: colors.text,

              fontSize: {
                xs: 11,
                sm: 12,
                md: 13,
              },

              fontWeight: 950,
            }}
          >
            {product.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            {isLowStock ? (
              <FaExclamationTriangle size={10} color={colors.danger} />
            ) : (
              <FaCheckCircle size={10} color={colors.green} />
            )}
          </Box>
        </Box>

        <Typography
          noWrap
          title={product.code}
          sx={{
            mt: 0.15,
            color: colors.softMuted,

            fontSize: {
              xs: 8,
              sm: 9,
              md: 9.5,
            },

            fontWeight: 700,
          }}
        >
          {product.code}
        </Typography>
      </Box>

      <IconButton
        type="button"
        size="small"
        aria-label={`Editar ${product.name}`}
        disabled={!onEdit}
        onClick={() => {
          onEdit?.(product);
        }}
        sx={{
          width: {
            xs: 25,
            sm: 27,
            md: 29,
          },

          height: {
            xs: 25,
            sm: 27,
            md: 29,
          },

          bgcolor: "#f8fafc",
          border: `1px solid ${colors.cardBorder}`,
          color: colors.muted,
          flexShrink: 0,

          "&:hover": {
            bgcolor: colors.primarySoft,
            color: colors.primary,
          },

          "&.Mui-disabled": {
            opacity: 0.5,
          },
        }}
      >
        <FaEdit size={11} />
      </IconButton>
    </Box>
  );
}

function StockProgress({
  stock,
  minStock,
  stockPercent,
  progressColor,
  isLowStock,
}: {
  stock: number;
  minStock: number;
  stockPercent: number;
  progressColor: string;
  isLowStock: boolean;
}) {
  return (
    <Box
      sx={{
        mt: "auto",
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 0.55,
          gap: 1,
        }}
      >
        <Typography
          noWrap
          sx={{
            color: colors.softMuted,
            fontSize: {
              xs: 10,
              sm: 10,
              md: 11,
            },
            fontWeight: 950,
            textTransform: "uppercase",
          }}
        >
          Stock actual
        </Typography>

        <Typography
          sx={{
            color: isLowStock ? colors.danger : colors.text,
            fontSize: {
              xs: 12,
              sm: 12,
              md: 13,
            },
            fontWeight: 950,
            fontVariantNumeric: "tabular-nums",
            flexShrink: 0,
          }}
        >
          {stock}
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={stockPercent}
        sx={{
          height: {
            xs: 5,
            sm: 5,
            md: 6,
          },
          borderRadius: 999,
          bgcolor: "#e5e7eb",

          "& .MuiLinearProgress-bar": {
            bgcolor: progressColor,
            borderRadius: 999,
          },
        }}
      />

      <Typography
        noWrap
        sx={{
          mt: 0.45,
          color: colors.softMuted,
          fontSize: {
            xs: 10,
            sm: 10,
            md: 11,
          },
          fontWeight: 700,
          textAlign: "right",
        }}
      >
        Mínimo: {minStock}
      </Typography>
    </Box>
  );
}

function ProductInfo({
  label,
  value,
  valueColor = colors.text,
  align = "left",
}: {
  label: string;
  value: string;
  valueColor?: string;
  align?: "left" | "right";
}) {
  return (
    <Box
      sx={{
        minWidth: 0,
        overflow: "hidden",
        textAlign: align,
      }}
    >
      <Typography
        noWrap
        sx={{
          color: colors.muted,
          fontSize: {
            xs: 10,
            sm: 10,
            md: 11,
          },
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </Typography>

      <Typography
        noWrap
        title={value}
        sx={{
          mt: 0.15,
          color: valueColor,
          fontSize: {
            xs: 12,
            sm: 12,
            md: 13,
          },
          fontWeight: 950,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
