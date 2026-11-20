"use client";

import { useEffect, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";

import { colors } from "@/theme/sharedColors";

import { LogoutButton } from "./LogoutButton";
import { getEffectiveRoles } from "@/utils/authorization";

const roleLabels: Record<string, string> = {
  admin: "Administrador",
  hardware: "Ferretería",
  grains: "Granos básicos",
  property: "Terrenos",
};

export function UserCard() {
  const [username, setUsername] = useState("Usuario");
  const [roleLabel, setRoleLabel] = useState("Asset Hub");

  useEffect(() => {
    const savedUsername = localStorage.getItem("username") ?? sessionStorage.getItem("username");
    const roles = getEffectiveRoles();
    setUsername(savedUsername || "Usuario");
    setRoleLabel(roles.map((role) => roleLabels[role]).join(" · "));
  }, []);

  const initials = username.trim().slice(0, 2).toLocaleUpperCase();

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
          {initials || "US"}
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
            {username}
          </Typography>

          <Typography
            noWrap
            sx={{
              color: colors.muted,
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {roleLabel}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 1.5 }}>
        <LogoutButton />
      </Box>
    </Box>
  );
}
