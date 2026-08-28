"use client";

import { Box, Typography } from "@mui/material";

import { colors } from "@/theme/sharedColors";
import { AppShellProps, sidebarSections } from "@/shared";

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
          py: 1.5,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          overflowY: "auto",
        }}
      >
        {sidebarSections.map((section) => (
          <Box
            key={section.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.6,
            }}
          >
            <Typography
              sx={{
                px: 1,
                color: colors.softMuted,
                fontSize: 9.5,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {section.title}
            </Typography>

            {section.items.map((item) => (
              <SidebarLink key={item.key} item={item} active={active} />
            ))}
          </Box>
        ))}
      </Box>

      <Box sx={{ flex: 1 }} />

      <UserCard />
    </Box>
  );
}
