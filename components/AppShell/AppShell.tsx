"use client";

import { useState } from "react";
import Link from "next/link";
import type { ReactNode } from "react";
import { alpha, Avatar, Box, Drawer, IconButton, Typography } from "@mui/material";
import { FaBars, FaBuilding, FaLayerGroup, FaTimes, FaTools, FaTractor } from "react-icons/fa";

type AppShellProps = {
  children: ReactNode;
  active?: "dashboard" | "hardware" | "grains" | "property" | "activity";
};

const navItems = [
  {
    label: "Inicio",
    mobileLabel: "Inicio",
    href: "/dashboard",
    icon: FaLayerGroup,
    key: "dashboard",
  },
  {
    label: "Ferretería",
    mobileLabel: "Ferretería",
    href: "/sell/hardware",
    icon: FaTools,
    key: "hardware",
  },
  {
    label: "Granos basicos",
    mobileLabel: "Granos",
    href: "/sell/grains",
    icon: FaTractor,
    key: "grains",
  },
  {
    label: "Terrenos",
    mobileLabel: "Terrenos",
    href: "/sell/property",
    icon: FaBuilding,
    key: "property",
  },
] as const;

const shellColors = {
  pageBg: "#f3f7fa",
  sidebarBg: "#f8fafc",
  sidebarMobileBg: "#ffffff",
  border: "#dbe6ed",
  text: "#0f172a",
  muted: "#64748b",
  primary: "#123f63",
  primaryDark: "#002b45",
  primarySoft: "#e8f2f7",
  activeBg: "#123f63",
  activeText: "#ffffff",
  navText: "#334155",
  navIcon: "#64748b",
};
export default function AppShell({ children, active }: AppShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: shellColors.pageBg,
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "272px minmax(0, 1fr)",
          },
        }}
      >
        <DesktopSidebar active={active} />

        <Box
          sx={{
            minWidth: 0,
            pb: {
              xs: "78px",
              lg: 0,
            },
          }}
        >
          <MobileTopbar onOpenMenu={() => setIsMobileMenuOpen(true)} />

          <Box
            sx={{
              minWidth: 0,
              width: "100%",
              overflowX: "hidden",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>

      <Drawer
        open={isMobileMenuOpen}
        onClose={closeMobileMenu}
        ModalProps={{
          keepMounted: true,
        }}
        slotProps={{
          backdrop: {
            sx: {
              bgcolor: "rgba(15, 23, 42, 0.42)",
              backdropFilter: "blur(2px)",
            },
          },
          paper: {
            sx: {
              width: 292,
              bgcolor: shellColors.sidebarMobileBg,
              borderRight: `1px solid ${shellColors.border}`,
              boxShadow: "24px 0 60px rgba(15, 23, 42, 0.22)",
            },
          },
        }}
      >
        <MobileSidebarContent active={active} onClose={closeMobileMenu} />
      </Drawer>
    </Box>
  );
}

function MobileTopbar({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <Box
      component="header"
      sx={{
        width: "100%",
        display: {
          xs: "flex",
          lg: "none",
        },
        position: "fixed",
        top: 0,
        zIndex: 20,
        minHeight: 64,
        px: 1.5,
        py: 1.2,
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1.5,
        bgcolor: "rgba(247,250,252,0.94)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${shellColors.border}`,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          size="small"
          onClick={onOpenMenu}
          sx={{
            width: 40,
            height: 40,
            borderRadius: "14px",
            border: `1px solid ${shellColors.border}`,
            bgcolor: "#ffffff",
            color: shellColors.primary,
          }}
        >
          <FaBars size={15} />
        </IconButton>

        <Box>
          <Typography
            sx={{
              color: shellColors.primaryDark,
              fontSize: 16,
              fontWeight: 950,
              lineHeight: 1,
            }}
          >
            AssetHub
          </Typography>

          <Typography
            sx={{
              color: shellColors.muted,
              fontSize: 10.5,
              fontWeight: 700,
              mt: 0.35,
            }}
          >
            Business Suite
          </Typography>
        </Box>
      </Box>

      <Avatar
        sx={{
          width: 34,
          height: 34,
          bgcolor: shellColors.primary,
          color: "#ffffff",
          fontSize: 12,
          fontWeight: 900,
        }}
      >
        AU
      </Avatar>
    </Box>
  );
}

function DesktopSidebar({ active }: { active?: AppShellProps["active"] }) {
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
        borderRight: `1px solid ${shellColors.border}`,
        bgcolor: shellColors.sidebarBg,
      }}
    >
      <SidebarHeader />

      <Box
        sx={{
          px: 2,
          display: "flex",
          flexDirection: "column",
          gap: 0.75,
        }}
      >
        {navItems.map((item) => (
          <SidebarLink key={item.key} item={item} active={active} />
        ))}
      </Box>

      <Box sx={{ flex: 1 }} />

      <UserCard />
    </Box>
  );
}

function MobileSidebarContent({
  active,
  onClose,
}: {
  active?: AppShellProps["active"];
  onClose: () => void;
}) {
  return (
    <Box
      sx={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#ffffff",
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${shellColors.border}`,
          bgcolor: "#f8fafc",
        }}
      >
        <Box>
          <Typography
            sx={{
              color: shellColors.primaryDark,
              fontSize: 18,
              fontWeight: 950,
              lineHeight: 1,
            }}
          >
            AssetHub
          </Typography>

          <Typography
            sx={{
              mt: 0.45,
              color: shellColors.muted,
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            Business Management Suite
          </Typography>
        </Box>

        <IconButton
          size="small"
          onClick={onClose}
          sx={{
            width: 38,
            height: 38,
            borderRadius: "14px",
            border: `1px solid ${shellColors.border}`,
            bgcolor: "#ffffff",
            color: shellColors.primary,
            boxShadow: "0 8px 18px rgba(15, 23, 42, 0.08)",
            "&:hover": {
              bgcolor: shellColors.primarySoft,
            },
          }}
        >
          <FaTimes size={13} />
        </IconButton>
      </Box>

      <Box
        sx={{
          px: 1.5,
          py: 2,
          display: "flex",
          flexDirection: "column",
          gap: 0.75,
        }}
      >
        {navItems.map((item) => (
          <SidebarLink key={item.key} item={item} active={active} onClick={onClose} />
        ))}
      </Box>

      <Box sx={{ flex: 1 }} />

      <UserCard />
    </Box>
  );
}

function MobileBottomNav({ active }: { active?: AppShellProps["active"] }) {
  return (
    <Box
      component="nav"
      sx={{
        display: {
          xs: "block",
          lg: "none",
        },
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 30,
        px: 1.2,
        pb: "max(10px, env(safe-area-inset-bottom))",
        pt: 1,
        bgcolor: "rgba(247,250,252,0.92)",
        backdropFilter: "blur(14px)",
        borderTop: `1px solid ${shellColors.border}`,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 0.75,
          maxWidth: 620,
          mx: "auto",
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            active === item.key || (active === "activity" && item.key === "dashboard");

          return (
            <Link
              key={item.key}
              href={item.href}
              style={{
                color: "inherit",
                textDecoration: "none",
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  minHeight: 54,
                  px: 0.5,
                  py: 0.65,
                  borderRadius: "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.4,
                  bgcolor: isActive ? shellColors.primary : "transparent",
                  color: isActive ? "#ffffff" : shellColors.muted,
                  transition: "0.18s ease",
                  border: isActive ? `1px solid ${shellColors.primary}` : "1px solid transparent",
                  boxShadow: isActive ? "0 10px 22px rgba(18,63,99,0.22)" : "none",
                }}
              >
                <Icon size={15} />

                <Typography
                  noWrap
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    fontSize: 10.5,
                    fontWeight: isActive ? 900 : 750,
                    lineHeight: 1.1,
                  }}
                >
                  {item.mobileLabel}
                </Typography>
              </Box>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
}

function SidebarHeader() {
  return (
    <Box sx={{ px: 3, py: 3 }}>
      <Typography
        sx={{
          color: shellColors.primaryDark,
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
          color: shellColors.muted,
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        Business Management Suite
      </Typography>
    </Box>
  );
}

function SidebarLink({
  item,
  active,
  onClick,
}: {
  item: (typeof navItems)[number];
  active?: AppShellProps["active"];
  onClick?: () => void;
}) {
  const Icon = item.icon;

  const isActive = active === item.key || (active === "activity" && item.key === "dashboard");

  return (
    <Link
      href={item.href}
      onClick={onClick}
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
          bgcolor: isActive ? shellColors.primary : "transparent",
          color: isActive ? "#ffffff" : "#294254",
          fontSize: 13,
          fontWeight: isActive ? 900 : 750,
          transition: "0.18s ease",
          "&:hover": {
            bgcolor: isActive ? shellColors.primary : alpha(shellColors.primary, 0.08),
            transform: {
              xs: "none",
              lg: "translateX(2px)",
            },
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

function UserCard() {
  return (
    <Box
      sx={{
        m: 2,
        p: 2,
        borderRadius: "16px",
        bgcolor: "#ffffff",
        border: `1px solid ${shellColors.border}`,
        boxShadow: "0 10px 28px rgba(15, 23, 42, 0.05)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.4 }}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: shellColors.primary,
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
              color: shellColors.text,
              fontSize: 12,
              fontWeight: 900,
            }}
          >
            Admin User
          </Typography>

          <Typography
            noWrap
            sx={{
              color: shellColors.muted,
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            Global Manager
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
