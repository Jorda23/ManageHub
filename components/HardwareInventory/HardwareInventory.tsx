"use client";

import {
  Box,
  Button,
  Chip,
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";

import {
  FaBoxOpen,
  FaCheckCircle,
  FaEdit,
  FaExclamationTriangle,
  FaPlus,
  FaTools,
} from "react-icons/fa";

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
        minWidth: 0,
        overflow: "hidden",
        borderRadius: "16px",
        border: `1px solid ${colors.cardBorder}`,
        bgcolor: colors.cardBg,
        boxShadow: "0 10px 28px rgba(15, 23, 42, 0.06)",
      }}
    >
      <InventoryHeader onAddProduct={onAddProduct} />

      <Box
        sx={{
          maxHeight: {
            xs: 480,
            sm: 520,
            md: 540,
            lg: 580,
          },
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarGutter: "stable",
          p: {
            xs: 1.5,
            sm: 2,
            md: 2.5,
          },
          pr: {
            xs: 1,
            sm: 1.25,
            md: 1.5,
          },

          "&::-webkit-scrollbar": {
            width: 8,
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
          <EmptyInventory />
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, minmax(0, 1fr))",
              },
              gap: {
                xs: 1.5,
                md: 2,
              },
              width: "100%",
              minWidth: 0,
            }}
          >
            {products.map((product) => (
              <HardwareProductCard
                key={product.id}
                product={product}
                onEdit={onEditProduct}
              />
            ))}
          </Box>
        )}
      </Box>
    </Paper>
  );
}

function InventoryHeader({
  onAddProduct,
}: {
  onAddProduct: () => void;
}) {
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 2,
        px: {
          xs: 1.5,
          sm: 2,
          md: 2.5,
        },
        py: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        bgcolor: "#ffffff",
        borderBottom: `1px solid ${colors.cardBorder}`,
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
            width: 30,
            height: 30,
            borderRadius: "10px",
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
            sx={{
              color: colors.text,
              fontSize: {
                xs: 14,
                sm: 16,
              },
              fontWeight: 950,
              lineHeight: 1.2,
            }}
          >
            Inventario de ferretería
          </Typography>

          <Typography
            sx={{
              mt: 0.2,
              color: colors.muted,
              fontSize: 11,
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
          minHeight: 34,
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
  const isLowStock =
    product.status === "lowStock" ||
    product.stock <= product.minStock;

  const stockPercent =
    product.minStock > 0
      ? Math.min(
          100,
          (product.stock /
            Math.max(product.minStock * 4, product.stock)) *
            100,
        )
      : 100;

  const progressColor = isLowStock
    ? colors.danger
    : product.accent;

  return (
    <Paper
      elevation={0}
      sx={{
        minWidth: 0,
        overflow: "hidden",
        borderRadius: "16px",
        border: `1px solid ${colors.cardBorder}`,
        bgcolor: "#ffffff",
        transition: "all 0.18s ease",
        "&:hover": {
          transform: {
            xs: "none",
            md: "translateY(-2px)",
          },
          borderColor: "#b7c7c2",
          boxShadow: "0 12px 26px rgba(15, 23, 42, 0.08)",
        },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "96px minmax(0, 1fr)",
            sm: "112px minmax(0, 1fr)",
          },
          minHeight: 160,
        }}
      >
        <ProductImage
          product={product}
          isLowStock={isLowStock}
        />

        <Box
          sx={{
            minWidth: 0,
            p: {
              xs: 1.25,
              sm: 1.5,
            },
            display: "flex",
            flexDirection: "column",
            gap: 1.05,
          }}
        >
          <ProductHeader
            product={product}
            isLowStock={isLowStock}
            onEdit={onEdit}
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 1,
            }}
          >
            <ProductInfo
              label="Detalle"
              value={product.detail}
            />

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
              title={product.category}
              sx={{
                color: colors.muted,
                fontSize: 9.5,
                fontWeight: 700,
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

function ProductImage({
  product,
  isLowStock,
}: {
  product: HardwareProduct;
  isLowStock: boolean;
}) {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100%",
        display: "grid",
        placeItems: "center",
        bgcolor: colors.imageFallback,
        backgroundImage: product.imageUrl
          ? `
              linear-gradient(
                to bottom,
                rgba(120,53,15,0.01),
                rgba(120,53,15,0.18)
              ),
              url("${product.imageUrl}")
            `
          : "linear-gradient(135deg, #fff7ed, #fed7aa)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!product.imageUrl && (
        <Box
          sx={{
            color: "rgba(146,64,14,0.45)",
            fontSize: 26,
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
          left: 8,
          bottom: 8,
          maxWidth: "calc(100% - 16px)",
          height: 21,
          bgcolor: isLowStock
            ? "rgba(254,226,226,0.95)"
            : "rgba(220,252,231,0.95)",
          color: isLowStock
            ? colors.danger
            : colors.green,
          border: `1px solid ${
            isLowStock ? "#fecaca" : "#bbf7d0"
          }`,
          fontSize: 8,
          fontWeight: 950,
          backdropFilter: "blur(5px)",
          "& .MuiChip-label": {
            px: 0.8,
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
        gap: 1,
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.6,
            minWidth: 0,
          }}
        >
          <Typography
            noWrap
            title={product.name}
            sx={{
              minWidth: 0,
              color: colors.text,
              fontSize: 13,
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
              <FaExclamationTriangle
                size={10}
                color={colors.danger}
              />
            ) : (
              <FaCheckCircle
                size={10}
                color={colors.green}
              />
            )}
          </Box>
        </Box>

        <Typography
          noWrap
          title={product.code}
          sx={{
            mt: 0.15,
            color: colors.softMuted,
            fontSize: 9.5,
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
          width: 29,
          height: 29,
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
    <Box sx={{ mt: "auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 0.55,
        }}
      >
        <Typography
          sx={{
            color: colors.softMuted,
            fontSize: 9,
            fontWeight: 950,
            textTransform: "uppercase",
          }}
        >
          Stock actual
        </Typography>

        <Typography
          sx={{
            color: isLowStock
              ? colors.danger
              : colors.text,
            fontSize: 10.5,
            fontWeight: 950,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {stock}
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={stockPercent}
        sx={{
          height: 6,
          borderRadius: 999,
          bgcolor: "#e5e7eb",
          "& .MuiLinearProgress-bar": {
            bgcolor: progressColor,
            borderRadius: 999,
          },
        }}
      />

      <Typography
        sx={{
          mt: 0.45,
          color: colors.softMuted,
          fontSize: 8.5,
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
        textAlign: align,
      }}
    >
      <Typography
        sx={{
          color: colors.muted,
          fontSize: 8,
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
          mt: 0.1,
          color: valueColor,
          fontSize: 10.5,
          fontWeight: 950,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function EmptyInventory() {
  return (
    <Box
      sx={{
        py: 6,
        px: 2,
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: 52,
          height: 52,
          mx: "auto",
          mb: 1.5,
          borderRadius: "16px",
          display: "grid",
          placeItems: "center",
          bgcolor: colors.primarySoft,
          color: colors.primary,
        }}
      >
        <FaBoxOpen size={20} />
      </Box>

      <Typography
        sx={{
          color: colors.text,
          fontSize: 14,
          fontWeight: 900,
        }}
      >
        No hay productos registrados
      </Typography>

      <Typography
        sx={{
          mt: 0.5,
          color: colors.muted,
          fontSize: 12,
        }}
      >
        Agrega el primer producto al inventario de ferretería.
      </Typography>
    </Box>
  );
}