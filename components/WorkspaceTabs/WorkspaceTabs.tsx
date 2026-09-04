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
        display: "flex",
        alignItems: "center",

        gap: {
          xs: 0.75,
          sm: 1,
        },

        width: "100%",

        py: {
          xs: 1,
          sm: 1.5,
        },

        borderBottom: `1px solid ${colors.cardBorder}`,

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
              flex: {
                xs: "1 1 0",
                sm: "0 0 auto",
              },

              minHeight: {
                xs: 38,
                sm: 42,
              },

              minWidth: {
                xs: 0,
                sm: "auto",
              },

              px: {
                xs: 1,
                sm: 1.75,
              },

              py: {
                xs: 0.75,
                sm: 1,
              },

              borderRadius: {
                xs: "8px",
                sm: "10px",
              },

              textTransform: "none",

              whiteSpace: "nowrap",

              overflow: "hidden",

              textOverflow: "ellipsis",

              fontSize: {
                xs: 11.5,
                sm: 13,
              },

              fontWeight: 700,

              lineHeight: 1.2,

              color: isActive ? "#ffffff" : colors.muted,

              bgcolor: isActive ? colors.primary : "#ffffff",

              border: `1px solid ${isActive ? colors.primary : colors.cardBorder}`,

              boxShadow: isActive
                ? "0 4px 10px rgba(37, 99, 235, 0.18)"
                : "0 1px 2px rgba(15, 23, 42, 0.04)",

              transition:
                "background-color 150ms ease, color 150ms ease, border-color 150ms ease, box-shadow 150ms ease, transform 150ms ease",

              "& .MuiButton-startIcon": {
                mr: {
                  xs: 0.5,
                  sm: 0.75,
                },

                color: "inherit",

                "& > *": {
                  fontSize: {
                    xs: 12,
                    sm: 14,
                  },
                },
              },

              "&:hover": {
                bgcolor: isActive ? colors.primary : colors.primarySoft,

                color: isActive ? "#ffffff" : colors.primary,

                borderColor: isActive ? colors.primary : "rgba(37, 99, 235, 0.28)",
              },

              "&:active": {
                transform: "translateY(1px)",
              },

              "&:focus-visible": {
                outline: `2px solid ${colors.primary}`,
                outlineOffset: 2,
              },
            }}
          >
            {tab.label}
          </Button>
        );
      })}
    </Box>
  );
}
