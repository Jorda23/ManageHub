"use client";

import type { ReactNode } from "react";

import { Box, Button } from "@mui/material";

import { colors } from "@/theme/sharedColors";

export type WorkspaceTabItem<T extends string> = {
  value: T;
  label: string;
  icon?: ReactNode;
};

type WorkspaceTabsProps<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  tabs: WorkspaceTabItem<T>[];
};

export function WorkspaceTabs<T extends string>({
  value,
  onChange,
  tabs,
}: Readonly<WorkspaceTabsProps<T>>) {
  return (
    <Box
      role="tablist"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        p: 0.5,
        maxWidth: "100%",
        bgcolor: "#ffffff",
        border: `1px solid ${colors.cardBorder}`,
        borderRadius: "12px",
        boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
        overflowX: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {tabs.map((tab) => {
        const isActive = value === tab.value;

        return (
          <Button
            key={tab.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.value)}
            startIcon={tab.icon}
            disableElevation
            disableRipple
            sx={{
              minHeight: 40,
              minWidth: "auto",
              px: {
                xs: 1.5,
                sm: 2,
              },
              borderRadius: "9px",
              whiteSpace: "nowrap",
              textTransform: "none",
              fontSize: 12.5,
              fontWeight: isActive ? 800 : 700,
              lineHeight: 1,
              color: isActive ? "#ffffff" : colors.muted,
              bgcolor: isActive ? colors.primary : "transparent",
              transition:
                "background-color 160ms ease, color 160ms ease, box-shadow 160ms ease",

              "& .MuiButton-startIcon": {
                mr: 0.8,
                color: "inherit",
              },

              "&:hover": {
                bgcolor: isActive
                  ? colors.primary
                  : colors.primarySoft,
                color: isActive
                  ? "#ffffff"
                  : colors.primary,
              },

              "&:focus-visible": {
                outline: `2px solid ${colors.primary}`,
                outlineOffset: 2,
              },

              ...(isActive && {
                boxShadow:
                  "0 2px 6px rgba(15, 23, 42, 0.12)",
              }),
            }}
          >
            {tab.label}
          </Button>
        );
      })}
    </Box>
  );
}