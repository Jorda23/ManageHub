"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaDownload,
  FaEdit,
  FaExclamationTriangle,
  FaFileInvoiceDollar,
  FaFilter,
  FaLeaf,
  FaPlusCircle,
  FaSeedling,
  FaShoppingCart,
  FaSyncAlt,
  FaWarehouse,
} from "react-icons/fa";

import AppShell from "@/components/AppShell/AppShell";
import type { WorkspaceConfig } from "@/components/WorkspaceShared/workspaceTypes";
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  FormControl,
  IconButton,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

type GrainProduct = {
  id: string;
  name: string;
  unit: string;
  stock: number;
  minStock: number;
  price: number;
  code: string;
  accent: string;
};

type GrainSale = {
  id: string;
  productName: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  total: number;
  paymentMethod: string;
  date: string;
};

const colors = {
  pageBg: "#f3f6f4",
  cardBg: "#ffffff",
  cardBorder: "#dce5e1",
  text: "#0f172a",
  muted: "#64748b",
  softMuted: "#94a3b8",
  primary: "#064e3b",
  primaryLight: "#0f766e",
  primarySoft: "#dcfce7",
  orange: "#f97316",
  orangeSoft: "#ffedd5",
  danger: "#ef4444",
  tableHead: "#f1f5f9",
};

const grainsConfig: WorkspaceConfig = {
  category: "grains",
  badge: "Módulo de Ventas",
  title: "Ventas de Granos Básicos",
  subtitle:
    "Inventario independiente para granos, ventas por libra, saco, quintal o kilogramo.",
  heroAccent: "#5ee3a7",
  heroSecondary: "#f59e0b",
  invoice: "#GRN-2026-082",
  customer: "Alex Rivera",
  customerEmail: "alex.rivera@assethub.com",
  agent: "Jordan P.",
  terminal: "Bodega Granos 01",
  customerMode: "quick",
  summaryLabel: "Comprobante de venta",
  summaryTotal: "$58.32",
  summaryNote:
    "Módulo independiente para controlar inventario, ventas e historial de granos básicos.",
  metrics: [],
  products: [],
  payments: [],
  salesAnalysis: [],
  workflowTitle: "Flujo granos básicos",
  workflowItems: [],
};

const initialProducts: GrainProduct[] = [
  {
    id: "rice",
    name: "Arroz blanco",
    unit: "Quintal",
    stock: 120,
    minStock: 20,
    price: 18.5,
    code: "GRN-ARR-2026",
    accent: "#22c55e",
  },
  {
    id: "beans",
    name: "Frijol rojo",
    unit: "Saco",
    stock: 72,
    minStock: 15,
    price: 4.25,
    code: "GRN-FRJ-1011",
    accent: "#f97316",
  },
  {
    id: "corn",
    name: "Maíz amarillo",
    unit: "Quintal",
    stock: 44,
    minStock: 18,
    price: 15.75,
    code: "GRN-MAZ-2050",
    accent: "#f97316",
  },
  {
    id: "sugar",
    name: "Azúcar sulfatada",
    unit: "Saco",
    stock: 88,
    minStock: 12,
    price: 12.4,
    code: "GRN-AZU-3301",
    accent: "#3b82f6",
  },
];

const paymentMethods = ["Efectivo", "Tarjeta", "Transferencia"];

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

export function GrainsWorkspace() {
  const [products, setProducts] = useState<GrainProduct[]>(initialProducts);
  const [sales, setSales] = useState<GrainSale[]>([
    {
      id: "sale-1",
      productName: "Frijol rojo",
      unit: "Saco",
      quantity: 4,
      unitPrice: 4.25,
      total: 17,
      paymentMethod: "Efectivo",
      date: "9/7/26, 10:36 a. m.",
    },
    {
      id: "sale-2",
      productName: "Frijol rojo",
      unit: "Saco",
      quantity: 5,
      unitPrice: 4.25,
      total: 21.25,
      paymentMethod: "Efectivo",
      date: "9/7/26, 10:35 a. m.",
    },
  ]);

  const [selectedProductId, setSelectedProductId] = useState("beans");
  const [quantity, setQuantity] = useState("1");
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [error, setError] = useState("");

  const selectedProduct = useMemo(() => {
    return products.find((product) => product.id === selectedProductId);
  }, [products, selectedProductId]);

  const numericQuantity = Number(quantity);

  const saleTotal = useMemo(() => {
    if (!selectedProduct || Number.isNaN(numericQuantity)) {
      return 0;
    }

    return selectedProduct.price * numericQuantity;
  }, [selectedProduct, numericQuantity]);

  const totalSold = useMemo(() => {
    return sales.reduce((total, sale) => total + sale.total, 0);
  }, [sales]);

  const totalInventory = useMemo(() => {
    return products.reduce((total, product) => total + product.stock, 0);
  }, [products]);

  const handleRegisterSale = () => {
    setError("");

    if (!selectedProduct) {
      setError("Selecciona un producto válido.");
      return;
    }

    if (!numericQuantity || numericQuantity <= 0) {
      setError("Ingresa una cantidad mayor a cero.");
      return;
    }

    if (numericQuantity > selectedProduct.stock) {
      setError("No hay suficiente inventario disponible para esta venta.");
      return;
    }

    const newSale: GrainSale = {
      id: crypto.randomUUID(),
      productName: selectedProduct.name,
      unit: selectedProduct.unit,
      quantity: numericQuantity,
      unitPrice: selectedProduct.price,
      total: saleTotal,
      paymentMethod,
      date: new Date().toLocaleString("es-NI", {
        dateStyle: "short",
        timeStyle: "short",
      }),
    };

    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === selectedProduct.id
          ? {
              ...product,
              stock: product.stock - numericQuantity,
            }
          : product,
      ),
    );

    setSales((currentSales) => [newSale, ...currentSales]);
    setQuantity("1");
  };

  return (
    <AppShell active={grainsConfig.category}>
      <Box
        sx={{
          width: "100%",
          minHeight: "calc(100vh - 48px)",
          px: { xs: 2, md: 4 },
          py: { xs: 2.5, md: 3 },
          bgcolor: colors.pageBg,
          color: colors.text,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <HeroHeader />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(3, minmax(0, 1fr))",
              },
              gap: 2.5,
            }}
          >
            <MetricCard
              icon={<FaFileInvoiceDollar />}
              iconBg={colors.primarySoft}
              iconColor={colors.primaryLight}
              label="Ventas registradas"
              value={sales.length.toString()}
              detail={`Total: ${formatCurrency(totalSold)}`}
            />

            <MetricCard
              icon={<FaWarehouse />}
              iconBg={colors.orangeSoft}
              iconColor={colors.orange}
              label="Inventario disponible"
              value={`${totalInventory}`}
              detail="Unidades en stock"
            />

            <MetricCard
              icon={<FaCheckCircle />}
              iconBg={colors.primarySoft}
              iconColor={colors.primaryLight}
              label="Productos activos"
              value={products.length.toString()}
              detail="Módulos independientes"
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "minmax(0, 2fr) minmax(320px, 1fr)",
              },
              gap: 2.5,
              alignItems: "stretch",
            }}
          >
            <SectionCard>
              <SectionHeader
                icon={<FaBoxOpen />}
                title="Inventario de granos"
                action="VER TODO"
              />

              <Divider />

              <Box sx={{ p: 2.5 }}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "repeat(2, minmax(0, 1fr))",
                    },
                    gap: 2,
                  }}
                >
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </Box>
              </Box>
            </SectionCard>

            <SectionCard sx={{ height: "100%" }}>
              <SectionHeader
                icon={<FaShoppingCart />}
                title="Registrar venta"
              />

              <Divider />

              <Box
                sx={{
                  p: 2.5,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2.25,
                }}
              >
                {error && (
                  <Box
                    sx={{
                      px: 1.5,
                      py: 1,
                      borderRadius: "16px",
                      bgcolor: "#fef2f2",
                      border: "1px solid #fecaca",
                      color: "#991b1b",
                      fontSize: 12,
                      fontWeight: 700,
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
                        setSelectedProductId(event.target.value)
                      }
                      sx={selectSx}
                    >
                      {products.map((product) => (
                        <MenuItem key={product.id} value={product.id}>
                          {product.name} - {product.unit}
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
                    onChange={(event) => setQuantity(event.target.value)}
                    slotProps={{
                      htmlInput: {
                        min: 1,
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
                      onChange={(event) => setPaymentMethod(event.target.value)}
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

                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: "16px",
                    bgcolor: "#f8fafc",
                    border: `1px solid ${colors.cardBorder}`,
                  }}
                >
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1.1 }}
                  >
                    <SummaryRow
                      label="Producto"
                      value={selectedProduct?.name ?? "-"}
                    />

                    <SummaryRow
                      label="Precio unitario"
                      value={
                        selectedProduct
                          ? formatCurrency(selectedProduct.price)
                          : "$0.00"
                      }
                    />

                    <SummaryRow
                      label="Cantidad"
                      value={`${numericQuantity || 0}`}
                    />

                    <Divider sx={{ my: 0.5 }} />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 13,
                          color: colors.muted,
                          fontWeight: 700,
                        }}
                      >
                        Total
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 15,
                          color: colors.primary,
                          fontWeight: 950,
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {formatCurrency(saleTotal)}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<FaPlusCircle />}
                  onClick={handleRegisterSale}
                  sx={{
                    mt: 0.5,
                    py: 1.35,
                    borderRadius: "16px",
                    bgcolor: colors.primary,
                    fontWeight: 900,
                    textTransform: "none",
                    boxShadow: "0 12px 24px rgba(6, 78, 59, 0.22)",
                    "&:hover": {
                      bgcolor: "#022c22",
                      boxShadow: "0 14px 28px rgba(6, 78, 59, 0.28)",
                    },
                  }}
                >
                  Registrar venta
                </Button>
              </Box>
            </SectionCard>
          </Box>

          <SectionCard>
            <Box
              sx={{
                p: 2.5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                borderBottom: `1px solid ${colors.cardBorder}`,
                bgcolor: "#ffffff",
              }}
            >
              <Box sx={{ display: "flex", gap: 1.2, alignItems: "center" }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 2,
                    display: "grid",
                    placeItems: "center",
                    bgcolor: colors.primarySoft,
                    color: colors.primaryLight,
                  }}
                >
                  <FaSyncAlt size={14} />
                </Box>

                <Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 950 }}>
                    Historial de transacciones
                  </Typography>

                  <Typography sx={{ fontSize: 12, color: colors.muted }}>
                    Últimas ventas registradas en el módulo de granos
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 1 }}>
                <SmallIconButton>
                  <FaFilter />
                </SmallIconButton>

                <SmallIconButton>
                  <FaDownload />
                </SmallIconButton>
              </Box>
            </Box>

            {sales.length === 0 ? (
              <Box
                sx={{
                  p: 4,
                  textAlign: "center",
                  bgcolor: "#fbfdfc",
                }}
              >
                <Typography
                  sx={{ fontSize: 14, fontWeight: 950, color: colors.text }}
                >
                  Todavía no hay ventas registradas.
                </Typography>

                <Typography sx={{ color: colors.muted, fontSize: 13, mt: 0.5 }}>
                  Cuando registres una venta, aparecerá aquí.
                </Typography>
              </Box>
            ) : (
              <Box sx={{ overflowX: "auto" }}>
                <Box
                  component="table"
                  sx={{
                    width: "100%",
                    borderCollapse: "separate",
                    borderSpacing: 0,
                    minWidth: 820,
                  }}
                >
                  <Box
                    component="thead"
                    sx={{
                      "& th": {
                        px: 2.5,
                        py: 1.6,
                        bgcolor: "#f8fafc",
                        color: colors.muted,
                        fontSize: 11,
                        fontWeight: 950,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        textAlign: "left",
                        borderBottom: `1px solid ${colors.cardBorder}`,
                        whiteSpace: "nowrap",
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
                      <th>Fecha y hora</th>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio unitario</th>
                      <th>Pago</th>
                      <th>Total</th>
                    </tr>
                  </Box>

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
                        bgcolor: "#f0fdf4",
                      },
                      "& td": {
                        px: 2.5,
                        py: 1.8,
                        borderBottom: `1px solid ${colors.cardBorder}`,
                        fontSize: 13,
                        color: colors.text,
                        verticalAlign: "middle",
                        whiteSpace: "nowrap",
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
                    {sales.map((sale) => (
                      <tr key={sale.id}>
                        <td>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.25,
                            }}
                          >
                            <Typography sx={{ fontSize: 13, fontWeight: 800 }}>
                              {sale.date}
                            </Typography>

                            <Typography
                              sx={{ fontSize: 11, color: colors.muted }}
                            >
                              Venta #{sale.id.slice(-4).toUpperCase()}
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
                                borderRadius: 2,
                                display: "grid",
                                placeItems: "center",
                                bgcolor: colors.orangeSoft,
                                color: colors.orange,
                                flexShrink: 0,
                              }}
                            >
                              <FaSeedling size={13} />
                            </Box>

                            <Box>
                              <Typography
                                sx={{ fontSize: 13, fontWeight: 900 }}
                              >
                                {sale.productName}
                              </Typography>

                              <Typography
                                sx={{ fontSize: 11, color: colors.muted }}
                              >
                                Producto vendido
                              </Typography>
                            </Box>
                          </Box>
                        </td>

                        <td>
                          <Typography
                            sx={{
                              fontSize: 13,
                              color: colors.muted,
                              fontWeight: 700,
                            }}
                          >
                            {sale.quantity} {sale.unit}
                          </Typography>
                        </td>

                        <td>
                          <Typography
                            sx={{
                              fontSize: 13,
                              color: colors.muted,
                              fontWeight: 700,
                            }}
                          >
                            {formatCurrency(sale.unitPrice)}
                          </Typography>
                        </td>

                        <td>
                          <Chip
                            label={sale.paymentMethod}
                            size="small"
                            sx={{
                              height: 24,
                              px: 0.5,
                              fontSize: 11,
                              fontWeight: 900,
                              bgcolor: colors.primarySoft,
                              color: colors.primary,
                              border: `1px solid #bbf7d0`,
                              "& .MuiChip-label": {
                                px: 1,
                              },
                            }}
                          />
                        </td>

                        <td>
                          <Typography
                            sx={{
                              color: colors.orange,
                              fontVariantNumeric: "tabular-nums",
                              fontSize: 13,
                              fontWeight: 950,
                            }}
                          >
                            {formatCurrency(sale.total)}
                          </Typography>
                        </td>
                      </tr>
                    ))}
                  </Box>
                </Box>
              </Box>
            )}

            <Box
              sx={{
                px: 3,
                py: 1.8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                bgcolor: "#f8fafc",
                borderTop: `1px solid ${colors.cardBorder}`,
              }}
            >
              <Typography
                sx={{ fontSize: 12, color: colors.muted, fontWeight: 700 }}
              >
                {sales.length} transacciones registradas
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  sx={{ fontSize: 12, color: colors.muted, fontWeight: 700 }}
                >
                  Total vendido:
                </Typography>

                <Typography
                  sx={{ fontSize: 15, color: colors.primary, fontWeight: 950 }}
                >
                  {formatCurrency(totalSold)}
                </Typography>
              </Box>
            </Box>
          </SectionCard>
        </Box>
      </Box>
    </AppShell>
  );
}

function HeroHeader() {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        p: { xs: 2.5, md: 3 },
        borderRadius: "16px",
        color: "white",
        background:
          "linear-gradient(135deg, #064e3b 0%, #14532d 58%, #1f6f4a 100%)",
        minHeight: 116,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Chip
          label={grainsConfig.badge}
          size="small"
          sx={{
            mb: 1.25,
            bgcolor: "rgba(255,255,255,0.15)",
            color: "#d1fae5",
            fontWeight: 900,
            fontSize: 11,
          }}
        />

        <Typography sx={{ fontSize: 22, fontWeight: 950, lineHeight: 1.1 }}>
          {grainsConfig.title}
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            maxWidth: 760,
            color: "#d1fae5",
            fontSize: 14,
          }}
        >
          {grainsConfig.subtitle}
        </Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          right: { xs: -16, md: 50 },
          bottom: -30,
          color: "rgba(255,255,255,0.11)",
          fontSize: { xs: 110, md: 150 },
          transform: "rotate(-8deg)",
        }}
      >
        <FaLeaf />
      </Box>
    </Paper>
  );
}

function MetricCard({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  detail,
}: {
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        border: `1px solid ${colors.cardBorder}`,
        bgcolor: colors.cardBg,
        boxShadow: "0 8px 22px rgba(15, 23, 42, 0.05)",
      }}
    >
      <Box sx={{ p: 2.25 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "16px",
              display: "grid",
              placeItems: "center",
              bgcolor: iconBg,
              color: iconColor,
              fontSize: 19,
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 11,
                color: colors.text,
                fontWeight: 900,
                textTransform: "uppercase",
              }}
            >
              {label}
            </Typography>

            <Typography
              sx={{
                fontSize: 18,
                color: colors.text,
                fontWeight: 950,
                mt: 0.25,
              }}
            >
              {value}
            </Typography>

            <Typography sx={{ fontSize: 12, color: colors.muted }}>
              {detail}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

function SectionCard({
  children,
  sx,
}: {
  children: ReactNode;
  sx?: SxProps<Theme>;
}) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        border: `1px solid ${colors.cardBorder}`,
        bgcolor: colors.cardBg,
        overflow: "hidden",
        boxShadow: "0 10px 28px rgba(15, 23, 42, 0.06)",
        ...sx,
      }}
    >
      {children}
    </Card>
  );
}

function SectionHeader({
  icon,
  title,
  action,
}: {
  icon: ReactNode;
  title: string;
  action?: string;
}) {
  return (
    <Box
      sx={{
        px: 2.5,
        py: 2,
        bgcolor: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 1.2, alignItems: "center" }}>
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: "16px",
            display: "grid",
            placeItems: "center",
            color: colors.primaryLight,
            bgcolor: colors.primarySoft,
          }}
        >
          {icon}
        </Box>

        <Typography sx={{ fontWeight: 950, fontSize: 14 }}>{title}</Typography>
      </Box>

      {action && (
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 950,
            color: colors.primary,
            cursor: "pointer",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          {action}
        </Typography>
      )}
    </Box>
  );
}

function ProductCard({ product }: { product: GrainProduct }) {
  const stockPercent = Math.min(100, product.stock);
  const isLowStock = product.stock <= product.minStock;
  const warningColor = isLowStock ? colors.danger : product.accent;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: "16px",
        border: `1px solid ${colors.cardBorder}`,
        bgcolor: "#ffffff",
        minHeight: 132,
        transition: "all 0.18s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          borderColor: "#b7c7c2",
          boxShadow: "0 12px 26px rgba(15, 23, 42, 0.08)",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 1.5,
          }}
        >
          <Box>
            <Box sx={{ display: "flex", gap: 0.75, alignItems: "center" }}>
              <Typography
                sx={{ fontSize: 13, color: colors.text, fontWeight: 950 }}
              >
                {product.name}
              </Typography>

              {isLowStock ? (
                <FaExclamationTriangle size={12} color={colors.danger} />
              ) : (
                <FaCheckCircle size={12} color={colors.primaryLight} />
              )}
            </Box>

            <Typography
              sx={{
                fontSize: 11,
                color: colors.softMuted,
                fontWeight: 700,
              }}
            >
              {product.code}
            </Typography>
          </Box>

          <IconButton
            size="small"
            sx={{
              width: 30,
              height: 30,
              bgcolor: "#f8fafc",
              border: `1px solid ${colors.cardBorder}`,
              color: colors.muted,
              "&:hover": {
                bgcolor: colors.primarySoft,
                color: colors.primary,
              },
            }}
          >
            <FaEdit size={12} />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Typography
            sx={{ fontSize: 11, color: colors.muted, fontWeight: 800 }}
          >
            UNIDAD:{" "}
            <Box component="span" sx={{ color: colors.text, fontWeight: 950 }}>
              {product.unit}
            </Box>
          </Typography>

          <Typography
            sx={{ fontSize: 11, color: colors.orange, fontWeight: 800 }}
          >
            PRECIO:{" "}
            <Box component="span" sx={{ fontWeight: 950 }}>
              {formatCurrency(product.price)}
            </Box>
          </Typography>
        </Box>

        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 0.7,
            }}
          >
            <Typography sx={{ fontSize: 10.5, fontWeight: 950 }}>
              STOCK ACTUAL
            </Typography>

            <Typography sx={{ fontSize: 10.5, fontWeight: 950 }}>
              {product.stock}
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={stockPercent}
            sx={{
              height: 7,
              borderRadius: 999,
              bgcolor: "#e5e7eb",
              "& .MuiLinearProgress-bar": {
                bgcolor: warningColor,
                borderRadius: 999,
              },
            }}
          />
        </Box>
      </Box>
    </Paper>
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
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function SmallIconButton({ children }: { children: ReactNode }) {
  return (
    <IconButton
      size="small"
      sx={{
        width: 32,
        height: 32,
        border: `1px solid ${colors.cardBorder}`,
        borderRadius: "16px",
        color: colors.muted,
        bgcolor: "#ffffff",
        "&:hover": {
          bgcolor: "#f8fafc",
        },
      }}
    >
      {children}
    </IconButton>
  );
}
