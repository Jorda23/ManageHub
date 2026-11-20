"use client";

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FaSeedling, FaTools } from "react-icons/fa";
import { getCashierModules, isAdministrator } from "@/utils/authorization";
import { colors } from "@/theme/sharedColors";

export function CashierNavSection() {
  const router = useRouter();
  const modules = getCashierModules();
  if (!isAdministrator() || !modules.length) return null;

  return (
    <Box sx={{ px: 2, pb: 1.5, display: "flex", flexDirection: "column", gap: 0.6 }}>
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
        Cajas asignadas
      </Typography>
      {modules.map((module) => (
        <Button
          key={module}
          onClick={() => router.push(`/pos/${module}`)}
          startIcon={module === "hardware" ? <FaTools size={12} /> : <FaSeedling size={12} />}
          sx={{
            justifyContent: "flex-start",
            px: 1.2,
            py: 1.05,
            borderRadius: "12px",
            color: colors.primary,
            fontSize: 12,
            fontWeight: 800,
            textTransform: "none",
            "&:hover": { bgcolor: colors.primarySoft },
          }}
        >
          {module === "hardware" ? "Caja de ferretería" : "Caja de granos"}
        </Button>
      ))}
    </Box>
  );
}
