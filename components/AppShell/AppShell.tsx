"use client";

import Link from "next/link";
import { alpha, Avatar, Box, Stack, Typography } from "@mui/material";
import {
  FaBuilding,
  FaLayerGroup,
  FaTools,
  FaTractor,
} from "react-icons/fa";

type AppShellProps = {
  children: React.ReactNode;
  active?: "dashboard" | "hardware" | "grains" | "property" | "activity";
};

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: FaLayerGroup,
    key: "dashboard",
  },
  {
    label: "Hardware Store",
    href: "/sell/hardware",
    icon: FaTools,
    key: "hardware",
  },
  {
    label: "Basic Grains",
    href: "/sell/grains",
    icon: FaTractor,
    key: "grains",
  },
  {
    label: "Real Estate",
    href: "/sell/property",
    icon: FaBuilding,
    key: "property",
  },
] as const;

export default function AppShell({ children, active }: AppShellProps) {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        bgcolor: "#202226",
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
        backgroundSize: "14px 14px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          mx: "auto",
          overflow: "auto",
          bgcolor: "#f5f8fb",
          border: "1px solid rgba(255,255,255,0.65)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.34)",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "260px minmax(0, 1fr)",
          },
        }}
      >
        <Box
          component="aside"
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            borderRight: "1px solid #d8e1e8",
            bgcolor: "#edf3f7",
          }}
        >
          <Box sx={{ px: 3, py: 3 }}>
            <Typography
              sx={{
                color: "#002b45",
                fontSize: 17,
                fontWeight: 950,
              }}
            >
              AssetHub
            </Typography>
          </Box>

          <Stack spacing={0.75} sx={{ px: 2 }}>
            {navItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                active === item.key ||
                (active === "activity" && item.key === "dashboard");

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1.4}
                    sx={{
                      alignItems: "center",
                      px: 1.6,
                      py: 1.35,
                      borderRadius: 1.5,
                      bgcolor: isActive ? "#123f63" : "transparent",
                      color: isActive ? "#ffffff" : "#294254",
                      fontSize: 13,
                      fontWeight: isActive ? 800 : 700,
                      transition: "0.18s ease",
                      "&:hover": {
                        bgcolor: isActive
                          ? "#123f63"
                          : alpha("#123f63", 0.08),
                      },
                    }}
                  >
                    <Icon size={14} />
                    <span>{item.label}</span>
                  </Stack>
                </Link>
              );
            })}
          </Stack>

          <Box sx={{ flex: 1 }} />

          <Box
            sx={{
              p: 2,
              borderTop: "1px solid #d8e1e8",
            }}
          >
            <Stack direction="row" spacing={1.4} sx={{ alignItems: "center" }}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: "#123f63",
                  color: "#ffffff",
                  fontSize: 13,
                  fontWeight: 900,
                }}
              >
                AU
              </Avatar>

              <Box>
                <Typography
                  sx={{
                    color: "#001f33",
                    fontSize: 12,
                    fontWeight: 900,
                  }}
                >
                  Admin User
                </Typography>

                <Typography
                  sx={{
                    color: "#607383",
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  Global Manager
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>

        <Box sx={{ minWidth: 0 }}>{children}</Box>
      </Box>
    </Box>
  );
}