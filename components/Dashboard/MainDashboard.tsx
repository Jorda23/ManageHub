"use client";

import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import {
  FaBars,
  FaBell,
  FaBoxes,
  FaBuilding,
  FaChartLine,
  FaClipboardCheck,
  FaDownload,
  FaExclamationTriangle,
  FaHome,
  FaLayerGroup,
  FaRegCreditCard,
  FaSearch,
  FaShoppingCart,
  FaSlidersH,
  FaTools,
  FaTractor,
  FaWarehouse,
} from "react-icons/fa";
import AppShell from "../AppShell/AppShell";

type MetricTone = "success" | "danger" | "warning" | "info";

type MetricCard = {
  label: string;
  value: string;
  detail: string;
  icon: ComponentType<{ size?: number }>;
  accent: string;
  tone: MetricTone;
};

type ModuleCard = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  href: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
};

type ActivityItem = {
  icon: ComponentType<{ size?: number }>;
  title: string;
  subtitle: string;
  time: string;
  amount?: string;
  accent: string;
};

type NavItem = {
  label: string;
  href: string;
  icon: ComponentType<{ size?: number }>;
  active?: boolean;
};

const colors = {
  pageBg: "#f3f7fa",
  sidebarBg: "#eef5f8",
  cardBg: "#ffffff",
  border: "#dbe6ed",
  borderSoft: "#edf2f6",
  text: "#0f172a",
  textDark: "#002b45",
  muted: "#64748b",
  mutedDark: "#40576a",
  primary: "#123f63",
  primaryDark: "#002b45",
  primarySoft: "#e8f2f7",
  success: "#16a34a",
  warning: "#f97316",
  danger: "#dc2626",
  info: "#2563eb",
};

const metrics: MetricCard[] = [
  {
    label: "Total Gross Sales",
    value: "$1,284,500.00",
    detail: "+12.5%",
    icon: FaRegCreditCard,
    accent: "#0ea5e9",
    tone: "success",
  },
  {
    label: "Hardware Inventory",
    value: "8,422 SKUs",
    detail: "14 Low Stock",
    icon: FaBoxes,
    accent: "#ef4444",
    tone: "danger",
  },
  {
    label: "Pending Payments",
    value: "$42,105.80",
    detail: "Due Today",
    icon: FaClipboardCheck,
    accent: "#f97316",
    tone: "warning",
  },
  {
    label: "Current Silo Volume",
    value: "12,400 MT",
    detail: "88% Capacity",
    icon: FaWarehouse,
    accent: "#2563eb",
    tone: "info",
  },
];

const modules: ModuleCard[] = [
  {
    eyebrow: "HARDWARE & TOOLS",
    title: "Central Supply Store",
    description:
      "Manage inventory tracking, procurement orders, and vendor relationships for construction assets.",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80",
    href: "/sell/hardware",
    stats: [
      { value: "124", label: "ORDERS TODAY" },
      { value: "98%", label: "FULFILLMENT" },
      { value: "4.2k", label: "ACTIVE SKUS" },
    ],
  },
  {
    eyebrow: "COMMODITIES",
    title: "Regional Grain Reserve",
    description:
      "Monitor silo capacities, moisture levels, and market pricing for corn, wheat, and soy reserves.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
    href: "/sell/grains",
    stats: [
      { value: "3.2k", label: "DAILY INTAKE" },
      { value: "8 Silos", label: "ACTIVE STORAGE" },
      { value: "$412", label: "MARKET INDEX" },
    ],
  },
  {
    eyebrow: "REAL ESTATE",
    title: "Portfolio Assets",
    description:
      "Track commercial properties, lease expirations, maintenance schedules, and investment yields.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    href: "/sell/property",
    stats: [
      { value: "42", label: "UNITS HELD" },
      { value: "94%", label: "OCCUPANCY" },
      { value: "12", label: "DUE RENEWALS" },
    ],
  },
];

const activities: ActivityItem[] = [
  {
    icon: FaShoppingCart,
    title: "Bulk Order Approved",
    subtitle: "Hardware Store: Order #8271 High-grade Cement Bulk",
    time: "2 mins ago",
    amount: "$12,450.00",
    accent: "#0ea5e9",
  },
  {
    icon: FaExclamationTriangle,
    title: "Silo Moisture Alert",
    subtitle: "Grain Reserve: North Silo reported high humidity level",
    time: "15 mins ago",
    accent: "#f97316",
  },
  {
    icon: FaBuilding,
    title: "Property Payment Received",
    subtitle: "Real Estate: Lot A-12 partial payment registered",
    time: "48 mins ago",
    amount: "$4,500.00",
    accent: "#16a34a",
  },
];

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: FaLayerGroup,
    active: true,
  },
  {
    label: "Hardware Store",
    href: "/sell/hardware",
    icon: FaTools,
  },
  {
    label: "Basic Grains",
    href: "/sell/grains",
    icon: FaTractor,
  },
  {
    label: "Real Estate",
    href: "/sell/property",
    icon: FaBuilding,
  },
];

export default function MainDashboard() {
  return (
    <AppShell active="dashboard">
      <Box
        sx={{
          width: "100%",
          maxWidth: "100vw",
          minHeight: "calc(100vh - 64px)",
          overflowX: "hidden",
          bgcolor: colors.pageBg,
          px: {
            xs: 1.5,
            sm: 2,
            md: 3,
          },
          py: {
            xs: 2,
            md: 3,
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1440,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            gap: {
              xs: 2,
              md: 3,
            },
            minWidth: 0,
          }}
        >
          <DashboardHero />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                xl: "repeat(4, minmax(0, 1fr))",
              },
              gap: {
                xs: 1.5,
                md: 2,
              },
              minWidth: 0,
            }}
          >
            {metrics.map((metric) => (
              <DashboardMetricCard key={metric.label} {...metric} />
            ))}
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                xl: "minmax(0, 1.55fr) minmax(320px, 0.75fr)",
              },
              gap: {
                xs: 2,
                md: 2,
              },
              alignItems: "start",
              minWidth: 0,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <SectionHeading
                title="Sector Management Modules"
                subtitle="Access each independent module for sales, inventory, grains, and property payments."
              />

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, minmax(0, 1fr))",
                    xl: "repeat(3, minmax(0, 1fr))",
                  },
                  gap: {
                    xs: 1.5,
                    md: 2,
                  },
                  minWidth: 0,
                }}
              >
                {modules.map((module) => (
                  <SectorModuleCard key={module.title} {...module} />
                ))}
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                minWidth: 0,
              }}
            >
              <OperationsHealth />
              <RecentActivity />
            </Box>
          </Box>
        </Box>
      </Box>
    </AppShell>
  );
}

function Sidebar() {
  return (
    <Box
      component="aside"
      sx={{
        display: {
          xs: "none",
          lg: "flex",
        },
        flexDirection: "column",
        minHeight: "100vh",
        position: "sticky",
        top: 0,
        borderRight: `1px solid ${colors.border}`,
        bgcolor: colors.sidebarBg,
      }}
    >
      <Box sx={{ px: 3, py: 3 }}>
        <Typography
          sx={{
            color: colors.primaryDark,
            fontSize: 20,
            fontWeight: 950,
            lineHeight: 1,
          }}
        >
          AssetHub
        </Typography>

        <Typography
          sx={{
            mt: 0.6,
            color: colors.muted,
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          Business Management Suite
        </Typography>
      </Box>

      <Box
        sx={{
          px: 2,
          display: "flex",
          flexDirection: "column",
          gap: 0.75,
        }}
      >
        {navItems.map((item) => (
          <NavLinkItem key={item.label} item={item} />
        ))}
      </Box>

      <Box sx={{ flex: 1 }} />

      <Box
        sx={{
          m: 2,
          p: 2,
          borderRadius: "16px",
          bgcolor: "#ffffff",
          border: `1px solid ${colors.border}`,
          boxShadow: "0 10px 28px rgba(15, 23, 42, 0.05)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.4 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: colors.primary,
              color: "#ffffff",
              fontSize: 13,
              fontWeight: 900,
            }}
          >
            AU
          </Avatar>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              noWrap
              sx={{
                color: colors.text,
                fontSize: 12,
                fontWeight: 900,
              }}
            >
              Admin User
            </Typography>

            <Typography
              noWrap
              sx={{
                color: colors.muted,
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              Global Manager
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function NavLinkItem({ item }: { item: NavItem }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      style={{
        color: "inherit",
        textDecoration: "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.4,
          px: 1.6,
          py: 1.35,
          borderRadius: "16px",
          bgcolor: item.active ? colors.primary : "transparent",
          color: item.active ? "#ffffff" : "#294254",
          fontSize: 13,
          fontWeight: item.active ? 900 : 750,
          transition: "0.18s ease",
          "&:hover": {
            bgcolor: item.active ? colors.primary : alpha(colors.primary, 0.08),
            transform: "translateX(2px)",
          },
        }}
      >
        <Icon size={14} />

        <Typography
          sx={{
            fontSize: 13,
            fontWeight: "inherit",
          }}
        >
          {item.label}
        </Typography>
      </Box>
    </Link>
  );
}

function Topbar() {
  return (
    <Box
      component="header"
      sx={{
        minHeight: {
          xs: 64,
          md: 68,
        },
        px: {
          xs: 1.5,
          sm: 2,
          md: 3,
        },
        py: {
          xs: 1.25,
          md: 0,
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1.5,
        borderBottom: `1px solid ${colors.border}`,
        bgcolor: "rgba(247,250,252,0.92)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <Box
        sx={{
          display: {
            xs: "flex",
            lg: "none",
          },
          alignItems: "center",
          gap: 1,
          minWidth: 0,
        }}
      >
        <IconButton
          size="small"
          sx={{
            width: 38,
            height: 38,
            borderRadius: "16px",

            border: `1px solid ${colors.border}`,
            color: colors.primary,
            bgcolor: "#ffffff",
          }}
        >
          <FaBars size={14} />
        </IconButton>

        <Typography
          sx={{
            color: colors.primaryDark,
            fontSize: 16,
            fontWeight: 950,
          }}
        >
          AssetHub
        </Typography>
      </Box>

      <Box
        sx={{
          flex: {
            xs: 1,
            md: "0 1 380px",
          },
          minWidth: 0,
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 1.05,
          borderRadius: "16px",
          bgcolor: "#edf2f6",
          color: colors.muted,
        }}
      >
        <FaSearch size={12} />

        <Typography
          noWrap
          sx={{
            fontSize: 12,
            color: colors.muted,
            fontWeight: 650,
          }}
        >
          Search assets, invoices, or stock...
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: colors.primary,
        }}
      >
        <TopbarIcon>
          <FaBell size={14} />

          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 7,
              height: 7,
              borderRadius: "50%",
              bgcolor: colors.danger,
              border: "1px solid #ffffff",
            }}
          />
        </TopbarIcon>

        <TopbarIcon>
          <FaSlidersH size={14} />
        </TopbarIcon>
      </Box>
    </Box>
  );
}

function TopbarIcon({ children }: { children: ReactNode }) {
  return (
    <IconButton
      size="small"
      sx={{
        position: "relative",
        width: 38,
        height: 38,
        borderRadius: "16px",

        border: `1px solid ${colors.border}`,
        bgcolor: "#ffffff",
        color: colors.primary,
        "&:hover": {
          bgcolor: colors.primarySoft,
        },
      }}
    >
      {children}
    </IconButton>
  );
}

function DashboardHero() {
  return (
    <Card
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "16px",
        p: {
          xs: 2.25,
          md: 3,
        },
        bgcolor: colors.cardBg,
        border: `1px solid ${colors.border}`,
        boxShadow: "0 18px 45px rgba(15, 23, 42, 0.07)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          right: -80,
          top: -100,
          width: 280,
          height: 280,
          borderRadius: "50%",
          bgcolor: alpha(colors.primary, 0.08),
          display: {
            xs: "none",
            md: "block",
          },
        }}
      />

      <Box
        sx={{
          position: "absolute",
          right: 60,
          bottom: -110,
          width: 220,
          height: 220,
          borderRadius: "50%",
          bgcolor: alpha("#0ea5e9", 0.08),
          display: {
            xs: "none",
            lg: "block",
          },
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(0, 1fr) auto",
          },
          gap: 2.5,
          alignItems: "center",
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Chip
            icon={<FaHome size={11} />}
            label="AssetHub Control Center"
            size="small"
            sx={{
              mb: 1.3,
              height: 25,
              borderRadius: "16px",

              bgcolor: colors.primarySoft,
              color: colors.primary,
              fontSize: 11,
              fontWeight: 900,
            }}
          />

          <Typography
            sx={{
              color: colors.text,
              fontSize: {
                xs: 28,
                sm: 32,
                md: 38,
              },
              fontWeight: 950,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
            }}
          >
            Global Dashboard
          </Typography>

          <Typography
            sx={{
              mt: 0.9,
              color: colors.muted,
              fontSize: {
                xs: 13,
                md: 14,
              },
              fontWeight: 600,
              lineHeight: 1.55,
              maxWidth: 680,
            }}
          >
            Comprehensive overview of hardware sales, grain reserves, property
            payments, inventory status, and operational performance.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1.2,
            flexWrap: "wrap",
            justifyContent: {
              xs: "flex-start",
              md: "flex-end",
            },
          }}
        >
          <Button
            variant="outlined"
            sx={{
              borderRadius: 2.25,
              px: 2,
              py: 1.1,
              fontSize: 12,
              fontWeight: 900,
              textTransform: "none",
              color: colors.primary,
              borderColor: colors.border,
              bgcolor: "#ffffff",
              "&:hover": {
                borderColor: colors.primary,
                bgcolor: colors.primarySoft,
              },
            }}
          >
            View Analytics
          </Button>

          <Button
            variant="contained"
            startIcon={<FaDownload size={12} />}
            sx={{
              bgcolor: colors.primary,
              color: "#ffffff",
              borderRadius: 2.25,
              px: 2.2,
              py: 1.1,
              fontSize: 12,
              fontWeight: 900,
              textTransform: "none",
              boxShadow: "0 12px 24px rgba(18, 63, 99, 0.22)",
              "&:hover": {
                bgcolor: colors.primaryDark,
                boxShadow: "0 14px 28px rgba(18, 63, 99, 0.28)",
              },
            }}
          >
            Export Report
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

function DashboardMetricCard({
  label,
  value,
  detail,
  icon: Icon,
  accent,
  tone,
}: MetricCard) {
  const detailColor =
    tone === "success"
      ? colors.success
      : tone === "danger"
        ? colors.danger
        : tone === "warning"
          ? colors.warning
          : colors.info;

  return (
    <Card
      elevation={0}
      sx={{
        p: 2.2,
        borderRadius: "16px",

        bgcolor: colors.cardBg,
        border: `1px solid ${colors.border}`,
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)",
        transition: "all 0.18s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 16px 36px rgba(15, 23, 42, 0.09)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 2,
          mb: 1.8,
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "16px",
            display: "grid",
            placeItems: "center",
            bgcolor: alpha(accent, 0.12),
            color: accent,
            flexShrink: 0,
          }}
        >
          <Icon size={18} />
        </Box>

        <Chip
          label={detail}
          size="small"
          sx={{
            height: 23,
            borderRadius: 999,
            bgcolor: alpha(detailColor, 0.1),
            color: detailColor,
            fontSize: 11,
            fontWeight: 900,
            "& .MuiChip-label": {
              px: 1,
            },
          }}
        />
      </Box>

      <Typography
        sx={{
          color: colors.muted,
          fontSize: 11,
          fontWeight: 850,
          mb: 0.6,
          textTransform: "uppercase",
          letterSpacing: "0.035em",
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          color: colors.text,
          fontSize: {
            xs: 19,
            md: 21,
          },
          fontWeight: 950,
          lineHeight: 1.15,
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </Typography>
    </Card>
  );
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <Box sx={{ mb: 1.5 }}>
      <Typography
        sx={{
          color: colors.text,
          fontSize: {
            xs: 17,
            md: 19,
          },
          fontWeight: 950,
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          mt: 0.35,
          color: colors.muted,
          fontSize: 12.5,
          fontWeight: 600,
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}

function SectorModuleCard({
  eyebrow,
  title,
  description,
  image,
  href,
  stats,
}: ModuleCard) {
  return (
    <Card
      elevation={0}
      sx={{
        overflow: "hidden",
        borderRadius: "16px",

        bgcolor: colors.cardBg,
        border: `1px solid ${colors.border}`,
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)",
        transition: "all 0.18s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 18px 40px rgba(15, 23, 42, 0.1)",
        },
      }}
    >
      <Box
        sx={{
          height: {
            xs: 168,
            sm: 188,
          },
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.36)), url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Chip
          label={eyebrow}
          size="small"
          sx={{
            position: "absolute",
            left: 14,
            top: 14,
            height: 23,
            borderRadius: "16px",
            bgcolor: "rgba(255,255,255,0.9)",
            color: colors.primary,
            fontSize: 9.5,
            fontWeight: 950,
            backdropFilter: "blur(8px)",
          }}
        />
      </Box>

      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 1,
            mb: 1,
          }}
        >
          <Typography
            sx={{
              color: colors.text,
              fontSize: 17,
              fontWeight: 950,
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>

          <Link href={href} style={{ color: colors.primary }}>
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: "16px",

                display: "grid",
                placeItems: "center",
                bgcolor: "#f8fafc",
                border: `1px solid ${colors.border}`,
                flexShrink: 0,
                transition: "0.18s ease",
                "&:hover": {
                  bgcolor: colors.primarySoft,
                  transform: "translateY(-1px)",
                },
              }}
            >
              <FaChartLine size={14} />
            </Box>
          </Link>
        </Box>

        <Typography
          sx={{
            color: colors.mutedDark,
            fontSize: 12.5,
            fontWeight: 600,
            lineHeight: 1.5,
            minHeight: {
              xs: "auto",
              xl: 58,
            },
          }}
        >
          {description}
        </Typography>

        <Divider sx={{ my: 1.8, borderColor: colors.borderSoft }} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 1,
          }}
        >
          {stats.map((stat) => (
            <Box
              key={stat.label}
              sx={{
                p: 1,
                borderRadius: "16px",

                bgcolor: "#f8fafc",
                border: `1px solid ${colors.borderSoft}`,
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  color: colors.text,
                  fontSize: {
                    xs: 17,
                    md: 19,
                  },
                  fontWeight: 950,
                  lineHeight: 1,
                  overflowWrap: "anywhere",
                }}
              >
                {stat.value}
              </Typography>

              <Typography
                sx={{
                  mt: 0.55,
                  color: colors.mutedDark,
                  fontSize: 8.5,
                  fontWeight: 900,
                  lineHeight: 1.2,
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Card>
  );
}

function OperationsHealth() {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",

        bgcolor: colors.cardBg,
        border: `1px solid ${colors.border}`,
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)",
      }}
    >
      <Box sx={{ px: 2, py: 1.8 }}>
        <Typography
          sx={{
            color: colors.text,
            fontSize: 16,
            fontWeight: 950,
          }}
        >
          Operations Health
        </Typography>

        <Typography
          sx={{
            color: colors.muted,
            fontSize: 12,
            mt: 0.35,
          }}
        >
          Performance by business line.
        </Typography>
      </Box>

      <Divider sx={{ borderColor: colors.borderSoft }} />

      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.8 }}>
        <HealthProgress
          label="Hardware fulfillment"
          value={98}
          color="#0ea5e9"
        />

        <HealthProgress
          label="Grain storage capacity"
          value={88}
          color="#2563eb"
        />

        <HealthProgress
          label="Property occupancy"
          value={94}
          color="#16a34a"
        />
      </Box>
    </Card>
  );
}

function HealthProgress({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 1,
          mb: 0.75,
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 850,
            color: colors.text,
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 950,
            color,
          }}
        >
          {value}%
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 8,
          borderRadius: 999,
          bgcolor: "#e5edf3",
          "& .MuiLinearProgress-bar": {
            bgcolor: color,
            borderRadius: 999,
          },
        }}
      />
    </Box>
  );
}

function RecentActivity() {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",

        bgcolor: colors.cardBg,
        border: `1px solid ${colors.border}`,
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)",
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1.8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              color: colors.text,
              fontSize: 16,
              fontWeight: 950,
            }}
          >
            Recent Activity
          </Typography>

          <Typography
            sx={{
              color: colors.muted,
              fontSize: 12,
              mt: 0.35,
            }}
          >
            Latest system events.
          </Typography>
        </Box>

        <Typography
          sx={{
            color: colors.primary,
            fontSize: 10,
            fontWeight: 950,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          VIEW ALL
        </Typography>
      </Box>

      <Divider sx={{ borderColor: colors.borderSoft }} />

      <Box>
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <Box key={activity.title}>
              <Box
                sx={{
                  px: 2,
                  py: 1.65,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "16px",

                    display: "grid",
                    placeItems: "center",
                    bgcolor: alpha(activity.accent, 0.1),
                    color: activity.accent,
                    flexShrink: 0,
                  }}
                >
                  <Icon size={15} />
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      color: colors.text,
                      fontSize: 12.5,
                      fontWeight: 950,
                    }}
                  >
                    {activity.title}
                  </Typography>

                  <Typography
                    noWrap
                    sx={{
                      color: colors.mutedDark,
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    {activity.subtitle}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    textAlign: "right",
                    display: {
                      xs: "none",
                      sm: "block",
                    },
                    flexShrink: 0,
                  }}
                >
                  <Typography
                    sx={{
                      color: colors.muted,
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {activity.time}
                  </Typography>

                  {activity.amount ? (
                    <Typography
                      sx={{
                        color: colors.text,
                        fontSize: 12,
                        fontWeight: 950,
                      }}
                    >
                      {activity.amount}
                    </Typography>
                  ) : null}
                </Box>
              </Box>

              {index < activities.length - 1 ? (
                <Divider sx={{ borderColor: colors.borderSoft }} />
              ) : null}
            </Box>
          );
        })}
      </Box>
    </Card>
  );
}