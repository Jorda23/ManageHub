"use client";

import { useState } from "react";
import { Box, Drawer } from "@mui/material";

import { colors } from "@/theme/sharedColors";

import { DesktopSidebar, MobileSidebarContent, MobileTopbar } from "./components";
import { AppShellProps } from "@/shared";

export const AppShell = ({ children, active }: AppShellProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <Box
      sx={{
        height: "100dvh",
        width: "100%",
        bgcolor: colors.pageBg,
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "272px minmax(0, 1fr)",
          },
          minHeight: 0,
        }}
      >
        <DesktopSidebar active={active} />

        <Box
          sx={{
            height: "100%",
            minHeight: 0,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <MobileTopbar onOpenMenu={() => setIsMobileMenuOpen(true)} />

          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              minWidth: 0,
              width: "100%",
              overflowX: "hidden",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
              overscrollBehavior: "contain",
              pt: {
                xs: "80px",
                lg: 0,
              },
              pb: {
                xs: "94px",
                lg: 0,
              },
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
              bgcolor: colors.cardBg,
              borderRight: `1px solid ${colors.cardBorder}`,
              boxShadow: "24px 0 60px rgba(15, 23, 42, 0.22)",
            },
          },
        }}
      >
        <MobileSidebarContent active={active} onClose={closeMobileMenu} />
      </Drawer>
    </Box>
  );
};
