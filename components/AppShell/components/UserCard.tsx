"use client";

import { Avatar, Box, Typography } from "@mui/material";

import { colors } from "@/theme/sharedColors";

import { LogoutButton } from "./LogoutButton";

export function UserCard() {
  return (
    <Box
      sx={{
        m: 2,
        p: 2,
        borderRadius: "16px",
        bgcolor: colors.cardBg,
        border: `1px solid ${colors.cardBorder}`,
        boxShadow: "0 10px 28px rgba(15, 23, 42, 0.05)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.4 }}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: colors.primary,
            color: colors.cardBg,
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

      <Box sx={{ mt: 1.5 }}>
        <LogoutButton />
      </Box>
    </Box>
  );
}
