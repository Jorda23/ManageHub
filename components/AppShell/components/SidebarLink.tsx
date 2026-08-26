"use client";

import Link from "next/link";
import { alpha, Box, Typography } from "@mui/material";

import { colors } from "@/theme/sharedColors";
import { NavItem, AppShellProps } from "@/shared";

type SidebarLinkProps = {
  item: NavItem;
  active?: AppShellProps["active"];
  onClick?: () => void;
};

export function SidebarLink({ item, active, onClick }: Readonly<SidebarLinkProps>) {
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
          bgcolor: isActive ? colors.primary : "transparent",
          color: isActive ? colors.cardBg : colors.text,
          fontSize: 13,
          fontWeight: isActive ? 900 : 750,
          transition: "0.18s ease",
          "&:hover": {
            bgcolor: isActive ? colors.primary : alpha(colors.primary, 0.08),
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
