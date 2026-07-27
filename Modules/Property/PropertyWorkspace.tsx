"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  FaBuilding,
  FaClipboardCheck,
  FaFileContract,
  FaHome,
  FaMapMarkedAlt,
  FaMoneyBillWave,
  FaPlusCircle,
  FaReceipt,
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
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import {
  AddPropertyModal,
  type AddPropertyFormValues,
} from "@/components/AddPropertyModal";
import { PaymentHistoryTable } from "@/components/PaymentHistoryTable";
import { PropertyCard } from "@/components/PropertyCard";

type AccountStatus = "Al día" | "Pendiente" | "Atrasado" | "Pagado";

export type PropertyItem = {
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
  imageUrl: string;
  ownerName: string;
  ownerPhone?: string;
  ownerDocument?: string;
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
    "Control de terrenos captados por clientes, compradores, abonos, saldo pendiente y estado de cuenta.",
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
    "Módulo para registrar terrenos de clientes, asociar compradores y controlar sus pagos.",
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
    "Registrar o seleccionar terreno",
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
    ownerName: "Valeria Gómez",
    buyerName: "Valeria Gómez",
    buyerEmail: "valeria.gomez@email.com",
    dueDate: "10 noviembre 2026",
    status: "Pendiente",
    accent: "#2563eb",
    imageUrl:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "lot-b08",
    name: "Lote B-08",
    code: "PRP-LT-008",
    location: "Urbanización San Miguel",
    size: "380 m²",
    price: 18450,
    paid: 18450,
    ownerName: "Carlos Mendoza",
    buyerName: "Carlos Mendoza",
    buyerEmail: "carlos.mendoza@email.com",
    dueDate: "Pagado",
    status: "Pagado",
    accent: "#0f766e",
    imageUrl:
      "https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "lot-c21",
    name: "Lote C-21",
    code: "PRP-LT-021",
    location: "Sector Norte",
    size: "520 m²",
    price: 22500,
    paid: 6200,
    ownerName: "Andrea Ruiz",
    buyerName: "Andrea Ruiz",
    buyerEmail: "andrea.ruiz@email.com",
    dueDate: "Vencido hace 5 días",
    status: "Atrasado",
    accent: "#dc2626",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "house-r04",
    name: "Casa R-04",
    code: "PRP-CS-004",
    location: "Carretera Sur",
    size: "180 m² construcción",
    price: 56000,
    paid: 12000,
    ownerName: "Propietario por confirmar",
    buyerName: "Pendiente de asignar",
    buyerEmail: "Sin comprador",
    dueDate: "Sin fecha",
    status: "Al día",
    accent: "#7c3aed",
    imageUrl:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80",
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

const paymentMethods = [
  "Efectivo",
  "Transferencia",
  "Depósito bancario",
  "Cheque",
];

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
  const [payments, setPayments] = useState<PaymentRecord[]>(initialPayments);

  const [selectedPropertyId, setSelectedPropertyId] = useState("lot-a12");
  const [paymentAmount, setPaymentAmount] = useState("500");
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [paymentNote, setPaymentNote] = useState("Abono de cuota");
  const [error, setError] = useState("");
  const [isPropertyDialogOpen, setIsPropertyDialogOpen] = useState(false);

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

  const handleCreateProperty = (formValues: AddPropertyFormValues): void => {
   const newProperty: PropertyItem = {
  id: crypto.randomUUID(),
  name: formValues.name.trim(),
  code: formValues.code.trim().toUpperCase(),
  location: formValues.location.trim(),
  size: formValues.size.trim(),
  price: Number(formValues.price),
  paid: 0,
  ownerName: formValues.ownerName.trim(),
  ownerPhone: formValues.ownerPhone.trim(),
  ownerDocument: formValues.ownerDocument.trim(),
  buyerName: "Pendiente de asignar",
  buyerEmail: "Sin comprador",
  dueDate: "Sin fecha",
  status: "Al día",
  accent: colors.primaryLight,
  imageUrl:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
};

    setProperties((currentProperties) => [newProperty, ...currentProperties]);

    setSelectedPropertyId(newProperty.id);
    setIsPropertyDialogOpen(false);
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
      newPendingAmount <= 0
        ? "Pagado"
        : selectedProperty.status === "Atrasado"
          ? "Atrasado"
          : "Pendiente";

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

  const handleDownloadPayments = (visiblePayments: PaymentRecord[]): void => {
    if (visiblePayments.length === 0) {
      return;
    }

    const headers = [
      "Fecha",
      "Propiedad",
      "Comprador",
      "Método",
      "Nota",
      "Monto",
    ];

    const rows = visiblePayments.map((payment) => [
      payment.date,
      payment.propertyName,
      payment.buyerName,
      payment.method,
      payment.note,
      payment.amount.toFixed(2),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => {
            const escapedValue = String(value).replaceAll('"', '""');
            return `"${escapedValue}"`;
          })
          .join(","),
      )
      .join("\n");

    const blob = new Blob([`\uFEFF${csvContent}`], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `historial-abonos-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
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
              label="Terrenos activos"
              value={properties.length.toString()}
              detail="Captados por clientes"
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
                title="Terrenos registrados"
                action="AGREGAR TERRENO"
                onAction={() => setIsPropertyDialogOpen(true)}
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
    maxHeight: {
      xs: 620,
      sm: 680,
      md: 720,
      lg: 760,
    },

    overflowY: "auto",
    overflowX: "hidden",
    scrollbarGutter: "stable",

    pr: {
      xs: 0.5,
      sm: 0.75,
      md: 1,
    },

    "&::-webkit-scrollbar": {
      width: {
        xs: 5,
        sm: 7,
        md: 8,
      },
    },

    "&::-webkit-scrollbar-track": {
      bgcolor: "#f1f5f9",
      borderRadius: 999,
    },

    "&::-webkit-scrollbar-thumb": {
      bgcolor: "#cbd5e1",
      borderRadius: 999,
      border: "2px solid #f1f5f9",
    },

    "&::-webkit-scrollbar-thumb:hover": {
      bgcolor: "#94a3b8",
    },

    scrollbarWidth: "thin",
    scrollbarColor: "#cbd5e1 #f1f5f9",
  }}
>
  <Box
    sx={{
      display: "grid",

      gridTemplateColumns: {
        xs: "minmax(0, 1fr)",
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
      <PropertyCard
        key={property.id}
        property={property}
      />
    ))}
  </Box>
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
            </SectionCard>
          </Box>

          <PaymentHistoryTable
            payments={payments}
            totalPaid={totalPaid}
            onDownload={handleDownloadPayments}
          />
          <AddPropertyModal
            open={isPropertyDialogOpen}
            existingCodes={properties.map((property) => property.code)}
            onClose={() => {
              setIsPropertyDialogOpen(false);
            }}
            onSave={handleCreateProperty}
          />
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
  onAction,
}: {
  icon: ReactNode;
  title: string;
  action?: string;
  onAction?: () => void;
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
      <Box
        sx={{ display: "flex", gap: 1.2, alignItems: "center", minWidth: 0 }}
      >
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
        <Button
          type="button"
          size="small"
          variant={onAction ? "contained" : "text"}
          startIcon={onAction ? <FaPlusCircle size={13} /> : undefined}
          onClick={onAction}
          sx={{
            borderRadius: 2.25,
            px: onAction ? 1.6 : 1,
            fontSize: 11,
            fontWeight: 950,
            color: onAction ? "#ffffff" : colors.primary,
            bgcolor: onAction ? colors.primary : "transparent",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            whiteSpace: "nowrap",
            boxShadow: onAction ? "0 8px 18px rgba(37, 99, 235, 0.2)" : "none",
            "&:hover": {
              bgcolor: onAction ? "#172554" : colors.primarySoft,
            },
          }}
        >
          {action}
        </Button>
      )}
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
