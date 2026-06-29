"use client";

import Link from "next/link";
import {
  alpha,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  FaAppleAlt,
  FaArrowRight,
  FaCashRegister,
  FaCheckCircle,
  FaChevronDown,
  FaClipboardCheck,
  FaCreditCard,
  FaExchangeAlt,
  FaFileContract,
  FaFileInvoiceDollar,
  FaHome,
  FaMapMarkedAlt,
  FaMoneyBillWave,
  FaPlus,
  FaPrint,
  FaRegClock,
  FaRulerCombined,
  FaSearch,
  FaShoppingCart,
  FaTools,
  FaUniversity,
  FaWrench,
  FaBoxes,
  FaChartLine,
  FaBoxOpen,
  FaSignature,
} from "react-icons/fa";

import AppShell from "@/components/AppShell/AppShell";
import {
  saleCategories,
  type SaleCategory,
} from "@/components/SaleWorkspace/saleWorkspaceData";

type IconType = React.ComponentType<{ size?: number }>;

type Product = {
  name: string;
  detail: string;
  code: string;
  qty: number;
  unit: string;
  total: string;
  accent: string;
  icon: IconType;
};

type Payment = {
  icon: IconType;
  title: string;
  subtitle: string;
  active?: boolean;
};

type WorkspaceConfig = {
  badge: string;
  title: string;
  subtitle: string;
  heroAccent: string;
  heroSecondary: string;
  invoice: string;
  customer: string;
  customerEmail: string;
  agent: string;
  terminal: string;
  statusLabel: string;
  summaryLabel: string;
  summaryTotal: string;
  summaryNote: string;
  dueDate?: string;
  paymentState?: "Pagado" | "Pendiente";
  totalAmount?: string;
  paidAmount?: string;
  customerMode: "directory" | "quick";
  customerList?: Array<{
    name: string;
    detail: string;
    status: "Pagado" | "Pendiente";
    amount: string;
  }>;
  metrics: Array<{
    label: string;
    value: string;
    detail: string;
    icon: IconType;
  }>;
  products: Product[];
  payments: Payment[];
  salesAnalysis: Array<{
    label: "Dia" | "Semana" | "Mes";
    value: string;
    detail: string;
    progress: number;
  }>;
  workflowTitle: string;
  workflowItems: string[];
};

const configs: Record<SaleCategory, WorkspaceConfig> = {
  grocery: {
    badge: "Grocery checkout",
    title: "Sell Grocery",
    subtitle: "Fast-moving items, quick scans, and clean payment capture.",
    heroAccent: "#5ee3a7",
    heroSecondary: "#19d3d8",
    invoice: "#GRC-2024-082",
    customer: "Alex Rivera",
    customerEmail: "alex.rivera@enterprisehub.com",
    agent: "Jordan P.",
    terminal: "Front Desk 01",
    customerMode: "quick",
    summaryLabel: "Receipt preview",
    summaryTotal: "$58.32",
    statusLabel: "",
    summaryNote:
      "A quick checkout lane for daily essentials and repeat customers.",
    metrics: [
      {
        label: "Open Tickets",
        value: "18",
        detail: "+4 since yesterday",
        icon: FaFileInvoiceDollar,
      },
      {
        label: "Basket Avg.",
        value: "$58.32",
        detail: "Up 12% this week",
        icon: FaChartLine,
      },
      {
        label: "Ready to Bill",
        value: "92%",
        detail: "2 payments pending",
        icon: FaCheckCircle,
      },
      {
        label: "Fast Checkout",
        value: "1m 24s",
        detail: "Target: under 90s",
        icon: FaRegClock,
      },
    ],
    products: [
      {
        name: "Organic Coffee Beans",
        detail: "(340g)",
        code: "GRC-CF-2024",
        qty: 2,
        unit: "$18.50",
        total: "$37.00",
        accent: "#19d3d8",
        icon: FaAppleAlt,
      },
      {
        name: "Farm Fresh Milk",
        detail: "(1L)",
        code: "GRC-MK-1011",
        qty: 4,
        unit: "$4.25",
        total: "$17.00",
        accent: "#5ee3a7",
        icon: FaBoxes,
      },
    ],
    payments: [
      {
        icon: FaMoneyBillWave,
        title: "Cash",
        subtitle: "Physical tender",
        active: true,
      },
      {
        icon: FaCreditCard,
        title: "Card",
        subtitle: "Debit / Credit",
      },
      {
        icon: FaUniversity,
        title: "Transfer",
        subtitle: "Bank / Wire",
      },
    ],
    salesAnalysis: [
      { label: "Dia", value: "$1.2K", detail: "34 tickets", progress: 62 },
      { label: "Semana", value: "$8.6K", detail: "Up 11%", progress: 71 },
      { label: "Mes", value: "$34.1K", detail: "Target 88%", progress: 88 },
    ],
    workflowTitle: "Checkout flow",
    workflowItems: [
      "Scan items at speed",
      "Apply promotions or coupons",
      "Confirm payment and print",
    ],
  },
  hardware: {
    badge: "Ferreteria counter",
    title: "Sell Hardware",
    subtitle: "Tools, parts, and fast stock movement for the workshop floor.",
    heroAccent: "#f59e0b",
    heroSecondary: "#19d3d8",
    invoice: "#HWD-2024-014",
    customer: "Carlos Mendoza",
    customerEmail: "carlos.mendoza@enterprisehub.com",
    agent: "M. Torres",
    terminal: "Workshop Desk 02",
    customerMode: "quick",
    summaryLabel: "Sales ticket",
    summaryTotal: "$124.90",
    summaryNote:
      "Built for hardware stores with fast-pick items and counter sales.",
    statusLabel: '',
    metrics: [
      {
        label: "Open Orders",
        value: "26",
        detail: "7 awaiting pickup",
        icon: FaClipboardCheck,
      },
      {
        label: "Stock Picks",
        value: "148",
        detail: "Today on hand",
        icon: FaBoxes,
      },
      {
        label: "Ready to Pick",
        value: "88%",
        detail: "Inventory confirmed",
        icon: FaBoxOpen,
      },
      {
        label: "Counter Time",
        value: "2m 11s",
        detail: "Efficient lane",
        icon: FaRegClock,
      },
    ],
    products: [
      {
        name: "Cordless Drill",
        detail: "18V Kit",
        code: "HDW-DR-442",
        qty: 1,
        unit: "$79.90",
        total: "$79.90",
        accent: "#f59e0b",
        icon: FaWrench,
      },
      {
        name: "Box of Screws",
        detail: "100 pcs",
        code: "HDW-SC-210",
        qty: 3,
        unit: "$9.00",
        total: "$27.00",
        accent: "#19d3d8",
        icon: FaTools,
      },
    ],
    payments: [
      {
        icon: FaMoneyBillWave,
        title: "Cash",
        subtitle: "Counter payment",
        active: true,
      },
      {
        icon: FaCreditCard,
        title: "Card",
        subtitle: "POS terminal",
      },
      {
        icon: FaCashRegister,
        title: "Store Credit",
        subtitle: "Approved account",
      },
    ],
    salesAnalysis: [
      { label: "Dia", value: "$2.8K", detail: "28 invoices", progress: 58 },
      { label: "Semana", value: "$15.4K", detail: "Up 7%", progress: 66 },
      { label: "Mes", value: "$61.2K", detail: "Target 79%", progress: 79 },
    ],
    workflowTitle: "Hardware flow",
    workflowItems: [
      "Pick stock from shelf",
      "Verify serials or sizes",
      "Charge and issue receipt",
    ],
  },
  property: {
    badge: "Property desk",
    title: "Sell Property",
    subtitle: "Terrenos, deposits, and document-ready transactions.",
    heroAccent: "#93c5fd",
    heroSecondary: "#5ee3a7",
    invoice: "#PRP-2024-021",
    customer: "Valeria Gómez",
    customerEmail: "valeria.gomez@enterprisehub.com",
    agent: "R. Salazar",
    terminal: "Land Office 03",
    statusLabel: "Pendiente",
    customerMode: "directory",
    customerList: [
      {
        name: "Valeria Gomez",
        detail: "Abono realizado hace 2 días",
        status: "Pendiente",
        amount: "$4,500.00",
      },
      {
        name: "Carlos Mendoza",
        detail: "Último pago confirmado",
        status: "Pagado",
        amount: "$18,450.00",
      },
      {
        name: "Andrea Ruiz",
        detail: "Cotización enviada",
        status: "Pendiente",
        amount: "$0.00",
      },
    ],
    summaryLabel: "Deal summary",
    summaryTotal: "$18,450.00",
    summaryNote:
      "Use this screen for land sales, deposits, and contract handoff.",
    dueDate: "November 10, 2026",
    paymentState: "Pendiente",
    totalAmount: "$18,450.00",
    paidAmount: "$4,500.00",
    metrics: [
      {
        label: "Open Leads",
        value: "12",
        detail: "3 in negotiation",
        icon: FaHome,
      },
      {
        label: "Average Deal",
        value: "$18.4K",
        detail: "Land-only value",
        icon: FaMapMarkedAlt,
      },
      {
        label: "Docs Ready",
        value: "76%",
        detail: "Contracts reviewed",
        icon: FaFileContract,
      },
      {
        label: "Closing Window",
        value: "5 days",
        detail: "Typical turnaround",
        icon: FaSignature,
      },
    ],
    products: [
      {
        name: "Lot A-12",
        detail: "450 m2",
        code: "PRP-LT-012",
        qty: 1,
        unit: "$17,900.00",
        total: "$17,900.00",
        accent: "#93c5fd",
        icon: FaRulerCombined,
      },
      {
        name: "Legal Review",
        detail: "Documentation",
        code: "PRP-LEG-001",
        qty: 1,
        unit: "$550.00",
        total: "$550.00",
        accent: "#5ee3a7",
        icon: FaFileContract,
      },
    ],
    payments: [
      {
        icon: FaMoneyBillWave,
        title: "Deposit",
        subtitle: "Reserve the lot",
        active: true,
      },
      {
        icon: FaUniversity,
        title: "Transfer",
        subtitle: "Bank wire",
      },
      {
        icon: FaClipboardCheck,
        title: "Financing",
        subtitle: "Approved plan",
      },
    ],
    salesAnalysis: [
      { label: "Dia", value: "$4.5K", detail: "1 abono", progress: 42 },
      { label: "Semana", value: "$18.4K", detail: "2 cierres", progress: 73 },
      { label: "Mes", value: "$82.0K", detail: "Meta 91%", progress: 91 },
    ],
    workflowTitle: "Property flow",
    workflowItems: [
      "Validate parcel and boundaries",
      "Review contract and documents",
      "Confirm deposit and schedule signing",
    ],
  },
};

export function SaleWorkspace({ category }: { category: SaleCategory }) {
  const config = configs[category];

  return (
    <AppShell active="activity">
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          minHeight: "calc(100vh - 56px)",
          px: { xs: 2, md: 5 },
          py: { xs: 2.5, md: 4 },
          bgcolor: "#00181a",
          backgroundImage: `
            radial-gradient(circle at 20% 10%, ${alpha(config.heroAccent, 0.2)}, transparent 28%),
            radial-gradient(circle at 85% 0%, ${alpha(config.heroSecondary, 0.14)}, transparent 22%),
            radial-gradient(circle at 50% 100%, rgba(0, 0, 0, 0.28), transparent 26%)
          `,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.16,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: 1320,
            mx: "auto",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{
              mb: 3,
              justifyContent: "space-between",
              alignItems: {
                xs: "flex-start",
                md: "flex-end",
              },
            }}
          >
            <Box>
              <Chip
                label={config.badge}
                size="small"
                icon={<FaExchangeAlt />}
                sx={{
                  mb: 1.25,
                  bgcolor: alpha(config.heroAccent, 0.12),
                  color: config.heroAccent,
                  fontWeight: 800,
                  "& .MuiChip-icon": {
                    color: "inherit",
                  },
                }}
              />

              <Typography
                sx={{
                  color: "text.primary",
                  fontSize: { xs: 30, md: 38 },
                  fontWeight: 950,
                  lineHeight: 1,
                }}
              >
                {config.title}
              </Typography>

              <Typography
                sx={{
                  maxWidth: 720,
                  mt: 1,
                  color: "text.secondary",
                  fontSize: { xs: 14, md: 16 },
                  fontWeight: 600,
                }}
              >
                {config.subtitle}
              </Typography>
            </Box>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, minmax(0, 1fr))",
                xl: "repeat(4, minmax(0, 1fr))",
              },
              gap: 2,
              mb: 3,
            }}
          >
            {config.metrics.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "minmax(0, 1.45fr) minmax(340px, 0.95fr)",
              },
              gap: 3,
              alignItems: "start",
            }}
          >
            <Stack spacing={3}>
              <GlassCard>
                <SectionHeader
                  title="Business Context"
                  subtitle="Switch lanes or continue with the current sale."
                />

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "1.15fr 0.85fr",
                    },
                    gap: 2,
                  }}
                >
                  <Box>
                    <SectionLabel>Category</SectionLabel>

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "1fr",
                          sm: "repeat(3, minmax(0, 1fr))",
                        },
                        gap: 1.25,
                      }}
                    >
                      {saleCategories.map((item) => (
                        <CategoryTile
                          key={item}
                          href={`/sell/${item}`}
                          active={item === category}
                          icon={categoryIcon(item)}
                          label={categoryLabel(item)}
                          hint={categoryHint(item)}
                          accent={
                            item === category ? config.heroAccent : "#a9c3c5"
                          }
                        />
                      ))}
                    </Box>
                  </Box>

                  <Box>
                    <SectionLabel>Customer</SectionLabel>
                    {config.customerMode === "directory" ? (
                      <Box
                        sx={{
                          borderRadius: 3,
                          border: "1px solid rgba(255,255,255,0.14)",
                          bgcolor: alpha("#0a2628", 0.92),
                          p: 1.75,
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            fullWidth
                            placeholder="Search customer..."
                            variant="standard"
                            slotProps={{
                              input: {
                                disableUnderline: true,
                                startAdornment: (
                                  <Box
                                    sx={{
                                      mr: 1.2,
                                      color: "text.secondary",
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <FaSearch />
                                  </Box>
                                ),
                              },
                            }}
                            sx={{
                              "& .MuiInputBase-input": {
                                color: "text.primary",
                                fontSize: 14,
                                fontWeight: 700,
                                py: 0.4,
                              },
                            }}
                          />

                          <Button
                            variant="contained"
                            sx={{
                              whiteSpace: "nowrap",
                              bgcolor: alpha(config.heroAccent, 0.2),
                              color: config.heroAccent,
                              "&:hover": {
                                bgcolor: alpha(config.heroAccent, 0.28),
                              },
                            }}
                          >
                            Add new customer
                          </Button>
                        </Stack>

                        <Divider
                          sx={{
                            my: 1.6,
                            borderColor: "rgba(255,255,255,0.08)",
                          }}
                        />

                        <Stack spacing={1.1}>
                          {(config.customerList ?? []).map((customer) => (
                            <Box
                              key={customer.name}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 2,
                                p: 1.15,
                                borderRadius: 2.5,
                                border: "1px solid rgba(255,255,255,0.08)",
                                bgcolor: alpha("#ffffff", 0.03),
                              }}
                            >
                              <Box>
                                <Typography
                                  sx={{ fontSize: 12.5, fontWeight: 900 }}
                                >
                                  {customer.name}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: 11.5,
                                    color: "text.secondary",
                                  }}
                                >
                                  {customer.detail}
                                </Typography>
                              </Box>

                              <Stack
                                spacing={0.4}
                                sx={{
                                  alignItems: "flex-end",
                                }}
                              >
                                {" "}
                                <Chip
                                  size="small"
                                  label={customer.status}
                                  sx={{
                                    bgcolor:
                                      customer.status === "Pagado"
                                        ? alpha("#5ee3a7", 0.14)
                                        : alpha("#f59e0b", 0.14),
                                    color:
                                      customer.status === "Pagado"
                                        ? "secondary.main"
                                        : "#fbbf24",
                                    fontWeight: 800,
                                  }}
                                />
                                <Typography
                                  sx={{ fontSize: 11, color: "text.secondary" }}
                                >
                                  {customer.amount}
                                </Typography>
                              </Stack>
                            </Box>
                          ))}
                        </Stack>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          height: 122,
                          borderRadius: 3,
                          border: "1px solid rgba(255,255,255,0.14)",
                          bgcolor: alpha("#0a2628", 0.92),
                          p: 1.75,
                        }}
                      >
                        <TextField
                          fullWidth
                          placeholder="Search customer or add new..."
                          variant="standard"
                          slotProps={{
                            input: {
                              disableUnderline: true,
                              startAdornment: (
                                <Box
                                  sx={{
                                    mr: 1.2,
                                    color: "text.secondary",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <FaSearch />
                                </Box>
                              ),
                              endAdornment: (
                                <Box
                                  sx={{
                                    color: "text.secondary",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <FaChevronDown />
                                </Box>
                              ),
                            },
                          }}
                          sx={{
                            "& .MuiInputBase-input": {
                              color: "text.primary",
                              fontSize: 14,
                              fontWeight: 700,
                              py: 0.4,
                            },
                          }}
                        />

                        <Divider
                          sx={{
                            my: 1.6,
                            borderColor: "rgba(255,255,255,0.08)",
                          }}
                        />

                        <Stack
                          direction="row"
                          sx={{
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          {" "}
                          <Box>
                            <Typography sx={{ fontSize: 12, fontWeight: 800 }}>
                              {config.customer}
                            </Typography>
                            <Typography
                              sx={{ fontSize: 12, color: "text.secondary" }}
                            >
                              {config.customerEmail}
                            </Typography>
                          </Box>
                          <Chip
                            size="small"
                            label="VIP"
                            sx={{
                              bgcolor: alpha(config.heroAccent, 0.15),
                              color: config.heroAccent,
                              fontWeight: 800,
                            }}
                          />
                        </Stack>
                      </Box>
                    )}
                  </Box>
                </Box>
              </GlassCard>

              <GlassCard>
                <SectionHeader
                  title="Items"
                  subtitle="Review quantities, prices, and line totals before confirming."
                  action={
                    <Stack
                      direction="row"
                      spacing={0.75}
                      sx={{
                        alignItems: "center",
                        color: config.heroAccent,
                      }}
                    >
                      {" "}
                      <FaPlus size={12} />
                      <Typography sx={{ fontSize: 13, fontWeight: 800 }}>
                        Add item
                      </Typography>
                    </Stack>
                  }
                />

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "minmax(0, 1.7fr) 52px 80px 82px",
                      sm: "minmax(0, 1.8fr) 64px 96px 90px",
                      md: "minmax(0, 2.2fr) 76px 120px 92px",
                    },
                    gap: 1.2,
                    px: { xs: 0, md: 0.25 },
                    pb: 1.25,
                    color: "text.secondary",
                  }}
                >
                  <Typography sx={tableHeaderSx}>Description</Typography>
                  <Typography sx={tableHeaderSx}>Qty</Typography>
                  <Typography sx={tableHeaderSx}>Unit</Typography>
                  <Typography sx={tableHeaderSx}>Total</Typography>
                </Box>

                <Stack spacing={1.25}>
                  {config.products.map((product) => (
                    <ItemRow key={product.code} {...product} />
                  ))}
                </Stack>
              </GlassCard>

              <GlassCard>
                <SectionHeader
                  title="Payment Method"
                  subtitle="Keep the checkout flow fast with the preferred payment lane."
                />

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "repeat(3, minmax(0, 1fr))",
                    },
                    gap: 1.25,
                  }}
                >
                  {config.payments.map((payment) => (
                    <PaymentTile
                      key={payment.title}
                      {...payment}
                      accent={config.heroAccent}
                    />
                  ))}
                </Box>
              </GlassCard>

              <GlassCard>
                <SectionHeader
                  title="Sales Analysis"
                  subtitle="Track how sales are moving by day, week, and month."
                />

                <Stack spacing={1.5}>
                  {config.salesAnalysis.map((item) => (
                    <Box
                      key={item.label}
                      sx={{
                        p: 1.5,
                        borderRadius: "16px",
                        border: "1px solid rgba(255,255,255,0.08)",
                        bgcolor: alpha("#ffffff", 0.03),
                      }}
                    >
                      <Stack
                        direction="row"
                        sx={{
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontSize: 12,
                              color: "text.secondary",
                              fontWeight: 800,
                            }}
                          >
                            {item.label}
                          </Typography>
                          <Typography sx={{ fontSize: 18, fontWeight: 950 }}>
                            {item.value}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 11.5,
                              color: "text.secondary",
                              fontWeight: 600,
                            }}
                          >
                            {item.detail}
                          </Typography>
                        </Box>

                        <Typography
                          sx={{
                            fontSize: 12,
                            color: config.heroAccent,
                            fontWeight: 900,
                          }}
                        >
                          {item.progress}%
                        </Typography>
                      </Stack>

                      <LinearProgress
                        variant="determinate"
                        value={item.progress}
                        sx={{
                          mt: 1.2,
                          height: 6,
                          borderRadius: 99,
                          bgcolor: alpha("#ffffff", 0.08),
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 99,
                            bgcolor: config.heroAccent,
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              </GlassCard>
            </Stack>

            <Stack spacing={3} sx={{ position: "sticky", top: 70 }}>
              <SummaryCard config={config} accent={config.heroAccent} />

              <GlassCard sx={{ p: 2.25 }}>
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "text.secondary",
                        fontWeight: 800,
                      }}
                    >
                      {config.workflowTitle}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 16, fontWeight: 900, mt: 0.25 }}
                    >
                      Step-by-step lane
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      bgcolor: alpha(config.heroAccent, 0.13),
                      color: config.heroAccent,
                    }}
                  >
                    <FaChartLine />
                  </Box>
                </Stack>

                <Stack spacing={1.4} sx={{ mt: 2 }}>
                  {config.workflowItems.map((item, index) => (
                    <Stack
                      key={item}
                      direction="row"
                      spacing={1.2}
                      sx={{
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          bgcolor: alpha(config.heroAccent, 0.14),
                          color: config.heroAccent,
                          display: "grid",
                          placeItems: "center",
                          fontSize: 11,
                          fontWeight: 900,
                          flexShrink: 0,
                        }}
                      >
                        {index + 1}
                      </Box>
                      <Typography
                        sx={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "text.secondary",
                        }}
                      >
                        {item}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </GlassCard>
            </Stack>
          </Box>
        </Box>
      </Box>
    </AppShell>
  );
}

function categoryLabel(category: SaleCategory) {
  if (category === "grocery") return "Grocery";
  if (category === "hardware") return "Hardware";
  return "Property";
}

function categoryHint(category: SaleCategory) {
  if (category === "grocery") return "Fast-moving stock";
  if (category === "hardware") return "Tools & parts";
  return "Deals & services";
}

function categoryIcon(category: SaleCategory) {
  if (category === "grocery") return FaShoppingCart;
  if (category === "hardware") return FaTools;
  return FaHome;
}

function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        mb: 2,
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <Box>
        <Typography
          sx={{ color: "text.primary", fontSize: 17, fontWeight: 900 }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            mt: 0.35,
            color: "text.secondary",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      {action}
    </Stack>
  );
}

function GlassCard({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: object;
}) {
  return (
    <Card
      sx={{
        position: "relative",
        overflow: "hidden",
        p: 2.5,
        bgcolor: alpha("#001a1c", 0.78),
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.26)",
        backdropFilter: "blur(18px)",
        ...sx,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0))",
          pointerEvents: "none",
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
    </Card>
  );
}

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: IconType;
}) {
  return (
    <GlassCard sx={{ p: 2.1 }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {" "}
        <Box>
          <Typography
            sx={{ color: "text.secondary", fontSize: 12, fontWeight: 800 }}
          >
            {label}
          </Typography>
          <Typography
            sx={{ mt: 0.5, fontSize: 25, fontWeight: 950, lineHeight: 1 }}
          >
            {value}
          </Typography>
          <Typography
            sx={{
              mt: 0.75,
              color: "text.secondary",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {detail}
          </Typography>
        </Box>
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2,
            display: "grid",
            placeItems: "center",
            color: "primary.main",
            bgcolor: alpha("#19d3d8", 0.12),
          }}
        >
          <Icon size={16} />
        </Box>
      </Stack>
    </GlassCard>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <Box
      sx={{
        minWidth: 154,
        px: 1.75,
        py: 1.25,
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.1)",
        bgcolor: alpha("#001f21", 0.72),
      }}
    >
      <Typography
        sx={{ fontSize: 10, color: "text.secondary", fontWeight: 800 }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: 13, fontWeight: 900, mt: 0.1 }}>
        {value}
      </Typography>
    </Box>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        mb: 1.1,
        color: "text.secondary",
        fontSize: 11,
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: 0.8,
      }}
    >
      {children}
    </Typography>
  );
}

function CategoryTile({
  href,
  icon: Icon,
  label,
  hint,
  active,
  accent,
}: {
  href: string;
  icon: IconType;
  label: string;
  hint: string;
  active?: boolean;
  accent: string;
}) {
  return (
    <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
      <Box
        sx={{
          borderRadius: "16px",
          p: 1.75,
          height: "140px",
          border: active
            ? `1px solid ${alpha(accent, 0.65)}`
            : "1px solid rgba(255,255,255,0.12)",
          bgcolor: active ? alpha(accent, 0.12) : alpha("#ffffff", 0.03),
          boxShadow: active ? `0 0 0 1px ${alpha(accent, 0.14)} inset` : "none",
        }}
      >
        <Stack spacing={1.1}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              color: active ? accent : "text.secondary",
              bgcolor: active ? alpha(accent, 0.16) : alpha("#ffffff", 0.04),
            }}
          >
            <Icon size={16} />
          </Box>

          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 900 }}>
              {label}
            </Typography>
            <Typography
              sx={{ fontSize: 12, color: "text.secondary", fontWeight: 600 }}
            >
              {hint}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Link>
  );
}

function ItemRow({
  name,
  detail,
  code,
  qty,
  unit,
  total,
  accent,
  icon: Icon,
}: Product) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "minmax(0, 1.7fr) 52px 80px 82px",
          sm: "minmax(0, 1.8fr) 64px 96px 90px",
          md: "minmax(0, 2.2fr) 76px 120px 92px",
        },
        gap: 1.2,
        alignItems: "center",
        px: 1.25,
        py: 1.5,
        borderRadius: 3,
        border: "1px solid rgba(255,255,255,0.08)",
        bgcolor: alpha("#ffffff", 0.025),
      }}
    >
      <Stack
        direction="row"
        spacing={1.35}
        sx={{
          alignItems: "center",
          minWidth: 0,
        }}
      >
        {" "}
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2,
            display: "grid",
            placeItems: "center",
            color: accent,
            bgcolor: alpha(accent, 0.12),
            flexShrink: 0,
          }}
        >
          <Icon size={16} />
        </Box>
        <Box
          sx={{
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 900,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name} {detail}
          </Typography>
          <Typography sx={{ fontSize: 11, color: accent, fontWeight: 800 }}>
            {code}
          </Typography>
        </Box>
      </Stack>

      <Box>
        <Typography sx={valueCellSx}>{qty}</Typography>
      </Box>

      <Box>
        <Typography sx={valueCellSx}>{unit}</Typography>
      </Box>

      <Typography
        sx={{
          ...valueCellSx,
          color: accent,
        }}
      >
        {total}
      </Typography>
    </Box>
  );
}

function PaymentTile({
  icon: Icon,
  title,
  subtitle,
  active,
  accent,
}: Payment & { accent: string }) {
  return (
    <Box
      sx={{
        p: 1.8,
        borderRadius: 3,
        border: active
          ? `1px solid ${alpha(accent, 0.6)}`
          : "1px solid rgba(255,255,255,0.12)",
        bgcolor: active ? alpha(accent, 0.11) : alpha("#ffffff", 0.03),
      }}
    >
      <Stack
        direction="row"
        spacing={1.4}
        sx={{
          alignItems: "center",
        }}
      >
        {" "}
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2,
            display: "grid",
            placeItems: "center",
            color: active ? accent : "text.secondary",
            bgcolor: active ? alpha(accent, 0.16) : alpha("#ffffff", 0.04),
          }}
        >
          <Icon size={16} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 15, fontWeight: 900 }}>
            {title}
          </Typography>
          <Typography
            sx={{ color: "text.secondary", fontSize: 12, fontWeight: 600 }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

function SummaryCard({
  config,
  accent,
}: {
  config: WorkspaceConfig;
  accent: string;
}) {
  return (
    <GlassCard sx={{ p: 0, overflow: "hidden" }}>
      <Box
        sx={{
          p: 2.2,
          background: `linear-gradient(180deg, ${alpha(accent, 0.15)}, rgba(0,0,0,0) 100%)`,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {" "}
          <Box>
            <Typography
              sx={{ color: "text.secondary", fontSize: 11, fontWeight: 900 }}
            >
              {config.summaryLabel}
            </Typography>
            <Typography
              sx={{ fontSize: 26, fontWeight: 950, lineHeight: 1.05, mt: 0.4 }}
            >
              {config.invoice}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              color: accent,
              bgcolor: alpha(accent, 0.12),
            }}
          >
            <FaFileInvoiceDollar />
          </Box>
        </Stack>
      </Box>

      <Box sx={{ p: 2.2 }}>
        <Stack
          direction="row"
          spacing={1.4}
          sx={{
            mb: 2.1,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2.5,
              display: "grid",
              placeItems: "center",
              color: "#001f21",
              bgcolor: accent,
              fontSize: 22,
              fontWeight: 900,
            }}
          >
            EH
          </Box>
          <Box>
            <Typography sx={{ fontSize: 18, fontWeight: 950 }}>
              Enterprise Hub
            </Typography>
            <Typography
              sx={{ color: "text.secondary", fontSize: 12, fontWeight: 600 }}
            >
              {config.customer}
            </Typography>
          </Box>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 1,
            mb: 1.6,
          }}
        >
          <SummaryInfo label="Customer" value={config.customer} />
          <SummaryInfo label="Agent" value={config.agent} />
          <SummaryInfo label="Terminal" value={config.terminal} />
          <SummaryInfo label="Total" value={config.summaryTotal} />
        </Box>

        <Divider
          sx={{
            my: 2,
            borderStyle: "dashed",
            borderColor: "rgba(255,255,255,0.12)",
          }}
        />

        <Stack spacing={1.3}>
          {config.products.map((product) => (
            <Stack
              key={product.code}
              direction="row"
              spacing={2}
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Stack
                direction="row"
                spacing={1.2}
                sx={{
                  alignItems: "center",
                  minWidth: 0,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    display: "grid",
                    placeItems: "center",
                    color: product.accent,
                    bgcolor: alpha(product.accent, 0.12),
                    flexShrink: 0,
                  }}
                >
                  <ProductIcon icon={product.icon} />
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ fontSize: 13, fontWeight: 900 }} noWrap>
                    {product.qty}x {product.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    {product.code}
                  </Typography>
                </Box>
              </Stack>

              <Typography
                sx={{ color: product.accent, fontWeight: 900, fontSize: 14 }}
              >
                {product.total}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Divider
          sx={{
            my: 2,
            borderStyle: "dashed",
            borderColor: "rgba(255,255,255,0.12)",
          }}
        />

        <Stack spacing={1.2}>
          <TotalsRow
            label="Subtotal"
            value={config.products[0]?.total ?? "$0.00"}
          />
          <TotalsRow label="Processing" value="$4.32" />
          <TotalsRow label="Discount" value="-$0.00" />
        </Stack>

        {config.paymentState ? (
          <>
            <Divider
              sx={{
                my: 2,
                borderStyle: "dashed",
                borderColor: "rgba(255,255,255,0.12)",
              }}
            />

            <Box
              sx={{
                p: 1.6,
                borderRadius: 3,
                border: `1px solid ${alpha(accent, 0.18)}`,
                bgcolor: alpha(accent, 0.06),
              }}
            >
              <Stack
                direction="row"
                sx={{
                  mb: 1.5,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: 13, fontWeight: 900 }}>
                  Pago del terreno
                </Typography>

                <Chip
                  size="small"
                  label={config.paymentState}
                  sx={{
                    bgcolor:
                      config.paymentState === "Pagado"
                        ? alpha("#5ee3a7", 0.14)
                        : alpha("#f59e0b", 0.14),
                    color:
                      config.paymentState === "Pagado"
                        ? "secondary.main"
                        : "#fbbf24",
                    fontWeight: 800,
                  }}
                />
              </Stack>

              <Stack spacing={1.1}>
                <SummaryInfo
                  label="Fecha límite"
                  value={config.dueDate ?? "Sin fecha"}
                />
                <SummaryInfo
                  label="Monto total"
                  value={config.totalAmount ?? config.summaryTotal}
                />
                <SummaryInfo
                  label="Monto abonado"
                  value={config.paidAmount ?? "$0.00"}
                />
                <SummaryInfo
                  label="Saldo pendiente"
                  value={formatCurrencyDifference(
                    config.totalAmount,
                    config.paidAmount,
                  )}
                />
              </Stack>
            </Box>
          </>
        ) : null}

        <Stack
          direction="row"
          sx={{
            mt: 1.8,
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ color: accent, fontSize: 15, fontWeight: 900 }}>
            TOTAL
          </Typography>
          <Typography sx={{ color: accent, fontSize: 24, fontWeight: 950 }}>
            {config.summaryTotal}
          </Typography>
        </Stack>

        <Button
          fullWidth
          variant="contained"
          endIcon={<FaArrowRight />}
          sx={{
            mt: 2.8,
            py: 1.5,
            borderRadius: 2,
            bgcolor: accent,
            color: "#001f21",
            boxShadow: `0 12px 30px ${alpha(accent, 0.18)}`,
            "&:hover": {
              bgcolor: accent,
              filter: "brightness(0.95)",
            },
          }}
        >
          Confirm Sale
        </Button>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<FaPrint />}
          sx={{
            mt: 1,
            py: 1.45,
            borderRadius: 2,
            borderColor: "rgba(255,255,255,0.22)",
            color: "text.primary",
            "&:hover": {
              borderColor: accent,
              bgcolor: alpha(accent, 0.08),
            },
          }}
        >
          Generate Receipt
        </Button>

        <Typography
          sx={{
            mt: 2,
            color: "text.secondary",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {config.summaryNote}
        </Typography>

        <Typography
          align="center"
          sx={{
            mt: 2.6,
            color: "text.secondary",
            fontSize: 10,
            letterSpacing: 1.2,
            textTransform: "uppercase",
          }}
        >
          Powered by Enterprise Hub
        </Typography>
      </Box>
    </GlassCard>
  );
}

function SummaryInfo({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography
        sx={{ color: "text.secondary", fontSize: 11, fontWeight: 800 }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: 12.5, fontWeight: 800, mt: 0.15 }}>
        {value}
      </Typography>
    </Box>
  );
}

function ProductIcon({ icon: Icon }: { icon: IconType }) {
  return <Icon size={15} />;
}

function formatCurrencyDifference(total?: string, paid?: string) {
  const totalValue = parseCurrency(total);
  const paidValue = parseCurrency(paid);

  if (totalValue === null || paidValue === null) {
    return "$0.00";
  }

  return formatCurrency(Math.max(totalValue - paidValue, 0));
}

function parseCurrency(value?: string) {
  if (!value) return null;
  const numeric = Number(value.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(numeric) ? numeric : null;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function TotalsRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
      }}
    >
      {" "}
      <Typography
        sx={{ color: "text.secondary", fontSize: 13, fontWeight: 700 }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: 13.5, fontWeight: 900 }}>{value}</Typography>
    </Stack>
  );
}

const tableHeaderSx = {
  fontSize: 11,
  color: "text.secondary",
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: 0.8,
};

const valueCellSx = {
  fontSize: 15,
  fontWeight: 900,
  textAlign: "right",
};
