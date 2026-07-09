"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCheckCircle,
  FaClipboardCheck,
  FaDownload,
  FaExclamationTriangle,
  FaFileContract,
  FaFilter,
  FaHome,
  FaMapMarkedAlt,
  FaMoneyBillWave,
  FaPlusCircle,
  FaReceipt,
  FaRulerCombined,
  FaSignature,
  FaSyncAlt,
  FaUniversity,
  FaUserTie,
} from "react-icons/fa";

import type { WorkspaceConfig } from "@/components/WorkspaceShared/workspaceTypes";
import AppShell from "@/components/AppShell/AppShell";
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

type AccountStatus = "Al día" | "Pendiente" | "Atrasado" | "Pagado";

type PropertyItem = {
  id: string;
  name: string;
  code: string;
  location: string;
  size: string;
  price: number;
  paid: number;
  buyerName: string;
  buyerEmail: string;
  dueDate: string;
  status: AccountStatus;
  accent: string;
};

type PaymentRecord = {
  id: string;
  propertyId: string;
  propertyName: string;
  buyerName: string;
  amount: number;
  method: string;
  date: string;
  note: string;
};

const colors = {
  pageBg: "#f3f6f8",
  cardBg: "#ffffff",
  cardBorder: "#dce5e1",
  text: "#0f172a",
  muted: "#64748b",
  softMuted: "#94a3b8",
  primary: "#1e3a8a",
  primaryLight: "#2563eb",
  primarySoft: "#dbeafe",
  green: "#0f766e",
  greenSoft: "#dcfce7",
  orange: "#f97316",
  orangeSoft: "#ffedd5",
  danger: "#dc2626",
  dangerSoft: "#fee2e2",
  purple: "#7c3aed",
  purpleSoft: "#ede9fe",
  tableHead: "#f1f5f9",
};

const propertyConfig: WorkspaceConfig = {
  category: "property",
  badge: "Terrenos y propiedades",
  title: "Gestión de Propiedades",
  subtitle:
    "Control de terrenos, compradores, abonos, fechas de pago, saldo pendiente y estado de cuenta.",
  heroAccent: "#93c5fd",
  heroSecondary: "#5ee3a7",
  invoice: "#PRP-2026-021",
  customer: "Valeria Gómez",
  customerEmail: "valeria.gomez@assethub.com",
  agent: "R. Salazar",
  terminal: "Oficina Terrenos 03",
  customerMode: "directory",
  summaryLabel: "Estado de cuenta",
  summaryTotal: "$18,450.00",
  summaryNote:
    "Módulo para registrar propiedades, asociar compradores y controlar pagos por persona.",
  dueDate: "10 noviembre 2026",
  paymentState: "Pendiente",
  totalAmount: "$18,450.00",
  paidAmount: "$4,500.00",
  customerList: [],
  metrics: [],
  products: [],
  payments: [],
  salesAnalysis: [],
  workflowTitle: "Flujo propiedades",
  workflowItems: [
    "Seleccionar terreno o propiedad",
    "Asociar comprador",
    "Registrar abono y actualizar saldo",
  ],
};

const initialProperties: PropertyItem[] = [
  {
    id: "lot-a12",
    name: "Lote A-12",
    code: "PRP-LT-012",
    location: "Residencial Las Colinas",
    size: "450 m²",
    price: 17900,
    paid: 4500,
    buyerName: "Valeria Gómez",
    buyerEmail: "valeria.gomez@email.com",
    dueDate: "10 noviembre 2026",
    status: "Pendiente",
    accent: "#2563eb",
  },
  {
    id: "lot-b08",
    name: "Lote B-08",
    code: "PRP-LT-008",
    location: "Urbanización San Miguel",
    size: "380 m²",
    price: 18450,
    paid: 18450,
    buyerName: "Carlos Mendoza",
    buyerEmail: "carlos.mendoza@email.com",
    dueDate: "Pagado",
    status: "Pagado",
    accent: "#0f766e",
  },
  {
    id: "lot-c21",
    name: "Lote C-21",
    code: "PRP-LT-021",
    location: "Sector Norte",
    size: "520 m²",
    price: 22500,
    paid: 6200,
    buyerName: "Andrea Ruiz",
    buyerEmail: "andrea.ruiz@email.com",
    dueDate: "Vencido hace 5 días",
    status: "Atrasado",
    accent: "#dc2626",
  },
  {
    id: "house-r04",
    name: "Casa R-04",
    code: "PRP-CS-004",
    location: "Carretera Sur",
    size: "180 m² construcción",
    price: 56000,
    paid: 12000,
    buyerName: "Pendiente de asignar",
    buyerEmail: "Sin comprador",
    dueDate: "Sin fecha",
    status: "Al día",
    accent: "#7c3aed",
  },
];

const initialPayments: PaymentRecord[] = [
  {
    id: "pay-001",
    propertyId: "lot-a12",
    propertyName: "Lote A-12",
    buyerName: "Valeria Gómez",
    amount: 2500,
    method: "Transferencia",
    date: "9/7/26, 10:40 a. m.",
    note: "Abono inicial",
  },
  {
    id: "pay-002",
    propertyId: "lot-a12",
    propertyName: "Lote A-12",
    buyerName: "Valeria Gómez",
    amount: 2000,
    method: "Efectivo",
    date: "9/7/26, 11:12 a. m.",
    note: "Segundo abono",
  },
  {
    id: "pay-003",
    propertyId: "lot-b08",
    propertyName: "Lote B-08",
    buyerName: "Carlos Mendoza",
    amount: 18450,
    method: "Transferencia",
    date: "8/7/26, 3:15 p. m.",
    note: "Cancelación total",
  },
];

const paymentMethods = ["Efectivo", "Transferencia", "Depósito bancario", "Cheque"];

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

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

const getPendingAmount = (property: PropertyItem) => {
  return Math.max(property.price - property.paid, 0);
};

const getStatusColors = (status: AccountStatus) => {
  if (status === "Pagado") {
    return {
      bg: colors.greenSoft,
      color: colors.green,
      border: "#bbf7d0",
    };
  }

  if (status === "Atrasado") {
    return {
      bg: colors.dangerSoft,
      color: colors.danger,
      border: "#fecaca",
    };
  }

  if (status === "Pendiente") {
    return {
      bg: colors.orangeSoft,
      color: colors.orange,
      border: "#fed7aa",
    };
  }

  return {
    bg: colors.primarySoft,
    color: colors.primaryLight,
    border: "#bfdbfe",
  };
};

export function PropertyWorkspace() {
  const [properties, setProperties] =
    useState<PropertyItem[]>(initialProperties);
  const [payments, setPayments] =
    useState<PaymentRecord[]>(initialPayments);

  const [selectedPropertyId, setSelectedPropertyId] = useState("lot-a12");
  const [buyerName, setBuyerName] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("500");
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [paymentNote, setPaymentNote] = useState("Abono de cuota");
  const [error, setError] = useState("");

  const selectedProperty = useMemo(() => {
    return properties.find((property) => property.id === selectedPropertyId);
  }, [properties, selectedPropertyId]);

  const numericPaymentAmount = Number(paymentAmount);

  const totalPortfolioValue = useMemo(() => {
    return properties.reduce((total, property) => total + property.price, 0);
  }, [properties]);

  const totalPaid = useMemo(() => {
    return properties.reduce((total, property) => total + property.paid, 0);
  }, [properties]);

  const totalPending = useMemo(() => {
    return properties.reduce(
      (total, property) => total + getPendingAmount(property),
      0,
    );
  }, [properties]);

  const paidAccounts = useMemo(() => {
    return properties.filter((property) => property.status === "Pagado").length;
  }, [properties]);

  const handleAssignBuyer = () => {
    setError("");

    if (!selectedProperty) {
      setError("Selecciona una propiedad válida.");
      return;
    }

    if (!buyerName.trim()) {
      setError("Ingresa el nombre del comprador.");
      return;
    }

    setProperties((currentProperties) =>
      currentProperties.map((property) =>
        property.id === selectedProperty.id
          ? {
              ...property,
              buyerName: buyerName.trim(),
              buyerEmail: "Comprador registrado",
              status: property.status === "Pagado" ? "Pagado" : "Pendiente",
            }
          : property,
      ),
    );

    setBuyerName("");
  };

  const handleRegisterPayment = () => {
    setError("");

    if (!selectedProperty) {
      setError("Selecciona una propiedad válida.");
      return;
    }

    if (!numericPaymentAmount || numericPaymentAmount <= 0) {
      setError("Ingresa un monto de abono mayor a cero.");
      return;
    }

    const pendingAmount = getPendingAmount(selectedProperty);

    if (pendingAmount <= 0) {
      setError("Esta cuenta ya está pagada en su totalidad.");
      return;
    }

    if (numericPaymentAmount > pendingAmount) {
      setError("El abono no puede ser mayor al saldo pendiente.");
      return;
    }

    const newPaidAmount = selectedProperty.paid + numericPaymentAmount;
    const newPendingAmount = selectedProperty.price - newPaidAmount;

    const newStatus: AccountStatus =
      newPendingAmount <= 0 ? "Pagado" : selectedProperty.status === "Atrasado" ? "Atrasado" : "Pendiente";

    const newPayment: PaymentRecord = {
      id: crypto.randomUUID(),
      propertyId: selectedProperty.id,
      propertyName: selectedProperty.name,
      buyerName: selectedProperty.buyerName,
      amount: numericPaymentAmount,
      method: paymentMethod,
      date: new Date().toLocaleString("es-NI", {
        dateStyle: "short",
        timeStyle: "short",
      }),
      note: paymentNote.trim() || "Abono registrado",
    };

    setProperties((currentProperties) =>
      currentProperties.map((property) =>
        property.id === selectedProperty.id
          ? {
              ...property,
              paid: newPaidAmount,
              status: newStatus,
              dueDate: newStatus === "Pagado" ? "Pagado" : property.dueDate,
            }
          : property,
      ),
    );

    setPayments((currentPayments) => [newPayment, ...currentPayments]);
    setPaymentAmount("500");
    setPaymentNote("Abono de cuota");
  };

  return (
    <AppShell active={propertyConfig.category}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "100vw",
          minHeight: "calc(100vh - 48px)",
          overflowX: "hidden",
          px: {
            xs: 1.5,
            sm: 2,
            md: 4,
          },
          py: {
            xs: 2,
            md: 3,
          },
          bgcolor: colors.pageBg,
          color: colors.text,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: {
              xs: "100%",
              xl: 1320,
            },
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            gap: {
              xs: 2,
              md: 3,
            },
          }}
        >
          <HeroHeader />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                lg: "repeat(4, minmax(0, 1fr))",
              },
              gap: {
                xs: 1.5,
                md: 2,
              },
            }}
          >
            <MetricCard
              icon={<FaHome />}
              iconBg={colors.primarySoft}
              iconColor={colors.primaryLight}
              label="Propiedades activas"
              value={properties.length.toString()}
              detail="Terrenos registrados"
            />

            <MetricCard
              icon={<FaMoneyBillWave />}
              iconBg={colors.greenSoft}
              iconColor={colors.green}
              label="Total abonado"
              value={formatCurrency(totalPaid)}
              detail="Pagos confirmados"
            />

            <MetricCard
              icon={<FaFileContract />}
              iconBg={colors.orangeSoft}
              iconColor={colors.orange}
              label="Saldo pendiente"
              value={formatCurrency(totalPending)}
              detail="Por cobrar"
            />

            <MetricCard
              icon={<FaClipboardCheck />}
              iconBg={colors.purpleSoft}
              iconColor={colors.purple}
              label="Cuentas pagadas"
              value={`${paidAccounts}/${properties.length}`}
              detail={formatCurrency(totalPortfolioValue)}
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "minmax(0, 2fr) minmax(340px, 1fr)",
              },
              gap: {
                xs: 2,
                md: 2.5,
              },
              alignItems: "start",
              width: "100%",
              minWidth: 0,
            }}
          >
            <SectionCard>
              <SectionHeader
                icon={<FaMapMarkedAlt />}
                title="Terrenos y propiedades"
                action="VER TODO"
              />

              <Divider />

              <Box
                sx={{
                  p: {
                    xs: 1.5,
                    sm: 2,
                    md: 2.5,
                  },
                }}
              >
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
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </Box>
              </Box>
            </SectionCard>

            <SectionCard sx={{ height: "100%" }}>
              <SectionHeader icon={<FaReceipt />} title="Registrar abono" />

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
                  <FieldLabel>Propiedad</FieldLabel>

                  <FormControl fullWidth size="small">
                    <Select
                      value={selectedPropertyId}
                      onChange={(event) =>
                        setSelectedPropertyId(event.target.value)
                      }
                      sx={selectSx}
                    >
                      {properties.map((property) => (
                        <MenuItem key={property.id} value={property.id}>
                          {property.name} - {property.buyerName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box>
                  <FieldLabel>Asignar comprador</FieldLabel>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "minmax(0, 1fr) auto",
                      },
                      gap: 1,
                    }}
                  >
                    <TextField
                      size="small"
                      value={buyerName}
                      placeholder="Nombre del comprador"
                      onChange={(event) => setBuyerName(event.target.value)}
                      fullWidth
                      sx={inputSx}
                    />

                    <Button
                      variant="outlined"
                      onClick={handleAssignBuyer}
                      sx={{
                        borderRadius: 2.5,
                        px: 2,
                        fontWeight: 900,
                        textTransform: "none",
                        color: colors.primary,
                        borderColor: colors.primaryLight,
                      }}
                    >
                      Asociar
                    </Button>
                  </Box>
                </Box>

                <Box>
                  <FieldLabel>Monto del abono</FieldLabel>

                  <TextField
                    type="number"
                    size="small"
                    value={paymentAmount}
                    onChange={(event) => setPaymentAmount(event.target.value)}
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

                <Box>
                  <FieldLabel>Nota</FieldLabel>

                  <TextField
                    size="small"
                    value={paymentNote}
                    onChange={(event) => setPaymentNote(event.target.value)}
                    fullWidth
                    sx={inputSx}
                  />
                </Box>

                <AccountSummary property={selectedProperty} />

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<FaPlusCircle />}
                  onClick={handleRegisterPayment}
                  sx={{
                    py: 1.35,
                    borderRadius: 2.5,
                    bgcolor: colors.primary,
                    fontWeight: 900,
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
            </SectionCard>
          </Box>

          <PaymentHistoryTable payments={payments} totalPaid={totalPaid} />
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
        p: {
          xs: 2,
          sm: 2.5,
          md: 3,
        },
                             borderRadius: "16px",

        color: "white",
        background:
          "linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #0f766e 100%)",
        minHeight: {
          xs: 130,
          md: 118,
        },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ position: "relative", zIndex: 2, maxWidth: "100%" }}>
        <Chip
          label={propertyConfig.badge}
          size="small"
          sx={{
            mb: 1.25,
            bgcolor: "rgba(255,255,255,0.16)",
            color: "#dbeafe",
            fontWeight: 900,
            fontSize: 11,
          }}
        />

        <Typography
          sx={{
            fontSize: {
              xs: 22,
              sm: 26,
              md: 34,
            },
            lineHeight: 1.1,
            fontWeight: 950,
          }}
        >
          {propertyConfig.title}
        </Typography>

        <Typography
          sx={{
            mt: 0.75,
            maxWidth: 760,
            color: "#dbeafe",
            fontSize: {
              xs: 12.5,
              sm: 14,
            },
            lineHeight: 1.45,
          }}
        >
          {propertyConfig.subtitle}
        </Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          right: {
            xs: -28,
            md: 48,
          },
          bottom: {
            xs: -26,
            md: -34,
          },
          color: "rgba(255,255,255,0.13)",
          fontSize: {
            xs: 94,
            md: 150,
          },
          transform: "rotate(-8deg)",
        }}
      >
        <FaBuilding />
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
      <Box
        sx={{
          p: {
            xs: 1.8,
            md: 2.25,
          },
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
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

        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: 11,
              color: colors.text,
              fontWeight: 950,
              textTransform: "uppercase",
              letterSpacing: "0.03em",
            }}
          >
            {label}
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: 20,
                md: 22,
              },
              fontWeight: 950,
              lineHeight: 1.1,
              color: colors.text,
              overflowWrap: "anywhere",
            }}
          >
            {value}
          </Typography>

          <Typography sx={{ fontSize: 12, color: colors.muted }}>
            {detail}
          </Typography>
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
        minWidth: 0,
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
        px: {
          xs: 1.8,
          md: 2.5,
        },
        py: 2,
        bgcolor: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 1.2, alignItems: "center", minWidth: 0 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
                          borderRadius: "16px",
            display: "grid",
            placeItems: "center",
            color: colors.primaryLight,
            bgcolor: colors.primarySoft,
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>

        <Typography
          sx={{
            fontWeight: 950,
            fontSize: {
              xs: 16,
              md: 18,
            },
            color: colors.text,
            overflowWrap: "anywhere",
          }}
        >
          {title}
        </Typography>
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
            whiteSpace: "nowrap",
          }}
        >
          {action}
        </Typography>
      )}
    </Box>
  );
}

function PropertyCard({ property }: { property: PropertyItem }) {
  const pendingAmount = getPendingAmount(property);
  const progress =
    property.price > 0 ? Math.min(100, (property.paid / property.price) * 100) : 0;
  const statusColors = getStatusColors(property.status);

  return (
    <Paper
      elevation={0}
      sx={{
        p: {
          xs: 1.8,
          md: 2,
        },
                      borderRadius: "16px",
        border: `1px solid ${colors.cardBorder}`,
        bgcolor: "#ffffff",
        width: "100%",
        minWidth: 0,
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 1.5,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Box sx={{ display: "flex", gap: 0.75, alignItems: "center" }}>
              <Typography
                sx={{
                  fontWeight: 950,
                  fontSize: 14.5,
                  color: colors.text,
                }}
              >
                {property.name}
              </Typography>

              {property.status === "Atrasado" ? (
                <FaExclamationTriangle size={12} color={colors.danger} />
              ) : (
                <FaCheckCircle size={12} color={statusColors.color} />
              )}
            </Box>

            <Typography
              sx={{
                fontSize: 11,
                color: colors.softMuted,
                fontWeight: 700,
              }}
            >
              {property.code}
            </Typography>
          </Box>

          <Chip
            label={property.status}
            size="small"
            sx={{
              height: 24,
              bgcolor: statusColors.bg,
              color: statusColors.color,
              border: `1px solid ${statusColors.border}`,
              fontSize: 11,
              fontWeight: 950,
              flexShrink: 0,
            }}
          />
        </Box>

        <InfoLine icon={<FaRulerCombined />} label="Medida" value={property.size} />
        <InfoLine icon={<FaMapMarkedAlt />} label="Ubicación" value={property.location} />
        <InfoLine icon={<FaUserTie />} label="Comprador" value={property.buyerName} />
        <InfoLine icon={<FaCalendarAlt />} label="Próximo pago" value={property.dueDate} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(3, minmax(0, 1fr))",
            },
            gap: 1,
          }}
        >
          <AmountBox label="Precio" value={formatCurrency(property.price)} />
          <AmountBox label="Abonado" value={formatCurrency(property.paid)} />
          <AmountBox label="Pendiente" value={formatCurrency(pendingAmount)} />
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
              AVANCE DE PAGO
            </Typography>

            <Typography sx={{ fontSize: 10.5, fontWeight: 950 }}>
              {Math.round(progress)}%
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 7,
              borderRadius: 999,
              bgcolor: "#e5e7eb",
              "& .MuiLinearProgress-bar": {
                bgcolor: property.accent,
                borderRadius: 999,
              },
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
}

function InfoLine({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
      <Box
        sx={{
          width: 22,
          height: 22,
                      borderRadius: "16px",
          bgcolor: colors.primarySoft,
          color: colors.primaryLight,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
          fontSize: 11,
        }}
      >
        {icon}
      </Box>

      <Typography
        sx={{
          fontSize: 12,
          color: colors.muted,
          fontWeight: 700,
          minWidth: 76,
        }}
      >
        {label}:
      </Typography>

      <Typography
        sx={{
          fontSize: 12,
          color: colors.text,
          fontWeight: 900,
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function AmountBox({ label, value }: { label: string; value: string }) {
  return (
    <Box
      sx={{
        p: 1,
                      borderRadius: "16px",
        bgcolor: "#f8fafc",
        border: `1px solid ${colors.cardBorder}`,
        minWidth: 0,
      }}
    >
      <Typography
        sx={{
          fontSize: 10,
          color: colors.muted,
          fontWeight: 900,
          textTransform: "uppercase",
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontSize: 12,
          color: colors.text,
          fontWeight: 950,
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </Typography>
    </Box>
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
        <SummaryRow label="Propiedad" value={property.name} />
        <SummaryRow label="Comprador" value={property.buyerName} />
        <SummaryRow label="Valor total" value={formatCurrency(property.price)} />
        <SummaryRow label="Abonado" value={formatCurrency(property.paid)} />
        <SummaryRow label="Saldo pendiente" value={formatCurrency(pendingAmount)} />

        <Divider sx={{ my: 0.5 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 13, color: colors.muted, fontWeight: 700 }}>
            Estado
          </Typography>

          <Chip
            label={property.status}
            size="small"
            sx={{
              bgcolor: statusColors.bg,
              color: statusColors.color,
              border: `1px solid ${statusColors.border}`,
              fontSize: 11,
              fontWeight: 950,
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
}

function PaymentHistoryTable({
  payments,
  totalPaid,
}: {
  payments: PaymentRecord[];
  totalPaid: number;
}) {
  return (
    <SectionCard>
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
        <Box sx={{ display: "flex", gap: 1.2, alignItems: "center", minWidth: 0 }}>
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
                fontWeight: 950,
                fontSize: {
                  xs: 16,
                  md: 18,
                },
                color: colors.text,
              }}
            >
              Historial de abonos
            </Typography>

            <Typography sx={{ fontSize: 12, color: colors.muted }}>
              Pagos realizados por comprador y propiedad
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

      {payments.length === 0 ? (
        <Box
          sx={{
            p: 4,
            textAlign: "center",
            bgcolor: "#fbfdfc",
          }}
        >
          <Typography sx={{ color: colors.text, fontWeight: 900, fontSize: 14 }}>
            Todavía no hay abonos registrados.
          </Typography>

          <Typography sx={{ color: colors.muted, fontSize: 13, mt: 0.5 }}>
            Cuando registres un abono, aparecerá aquí.
          </Typography>
        </Box>
      ) : (
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
              borderCollapse: "separate",
              borderSpacing: 0,
              minWidth: {
                xs: 820,
                md: 920,
              },
            }}
          >
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
                <th>Fecha</th>
                <th>Propiedad</th>
                <th>Comprador</th>
                <th>Método</th>
                <th>Nota</th>
                <th>Monto</th>
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
                  bgcolor: "#eff6ff",
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
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 850 }}>
                        {payment.date}
                      </Typography>

                      <Typography sx={{ fontSize: 11, color: colors.muted }}>
                        Recibo #{payment.id.slice(-4).toUpperCase()}
                      </Typography>
                    </Box>
                  </td>

                  <td>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
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

                      <Typography sx={{ fontSize: 13, color: colors.text, fontWeight: 950 }}>
                        {payment.propertyName}
                      </Typography>
                    </Box>
                  </td>

                  <td>
                    <Typography sx={{ fontSize: 13, color: colors.text, fontWeight: 950 }}>
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
                        fontSize: 11,
                        fontWeight: 900,
                        bgcolor: colors.greenSoft,
                        color: colors.green,
                        border: "1px solid #bbf7d0",
                        "& .MuiChip-label": {
                          px: 1,
                        },
                      }}
                    />
                  </td>

                  <td>
                    <Typography sx={{ fontSize: 13, color: colors.muted }}>
                      {payment.note}
                    </Typography>
                  </td>

                  <td>
                    <Typography
                     
                      sx={{
                        color: colors.green,
                        fontVariantNumeric: "tabular-nums",
                        fontWeight: 950,
                        fontSize: 13,
                      }}
                    >
                      {formatCurrency(payment.amount)}
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
          px: {
            xs: 1.8,
            md: 3,
          },
          py: 1.8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          bgcolor: "#f8fafc",
          borderTop: `1px solid ${colors.cardBorder}`,
        }}
      >
        <Typography sx={{ fontSize: 12, color: colors.muted, fontWeight: 700 }}>
          {payments.length} abonos registrados
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ fontSize: 12, color: colors.muted, fontWeight: 700 }}>
            Total abonado:
          </Typography>

          <Typography sx={{ fontSize: 15, color: colors.green, fontWeight: 950 }}>
            {formatCurrency(totalPaid)}
          </Typography>
        </Box>
      </Box>
    </SectionCard>
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
          overflowWrap: "anywhere",
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
        width: 36,
        height: 36,
        border: `1px solid ${colors.cardBorder}`,
                      borderRadius: "16px",
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
      }}
    >
      {children}
    </IconButton>
  );
}