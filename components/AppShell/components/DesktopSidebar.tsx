"use client";

import { Box } from "@mui/material";

import { colors } from "@/theme/sharedColors";
import { AppShellProps, navItems } from "@/shared";

import { SidebarHeader } from "./SidebarHeader";
import { SidebarLink } from "./SidebarLink";
import { UserCard } from "./UserCard";

type DesktopSidebarProps = {
  active?: AppShellProps["active"];
};

export function DesktopSidebar({ active }: Readonly<DesktopSidebarProps>) {
  return (
    <Box
      component="aside"
      sx={{
        display: {
          xs: "none",
          lg: "flex",
        },
        flexDirection: "column",
        height: "100%",
        minHeight: 0,
        position: "sticky",
        top: 0,
        borderRight: `1px solid ${colors.cardBorder}`,
        bgcolor: colors.tableHead,
        overflow: "hidden",
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
