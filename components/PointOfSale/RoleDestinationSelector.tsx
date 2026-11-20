"use client";

import { Box, Button, Card, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaBuilding, FaLayerGroup, FaSeedling, FaTools } from "react-icons/fa";
import { LogoutButton } from "@/components/AppShell/components/LogoutButton";
import { getEffectiveRoles } from "@/utils/authorization";
import { colors } from "@/theme/sharedColors";

export function RoleDestinationSelector() {
  const router = useRouter();
  const roles = getEffectiveRoles();
  const destinations = [
    ...(roles.includes("admin")
      ? [
          {
            id: "admin",
            title: "Administración",
            detail: "Dashboard, inventarios y configuración",
            href: "/dashboard",
            icon: <FaLayerGroup size={22} />,
          },
        ]
      : []),
    ...(roles.includes("hardware")
      ? [
          {
            id: "hardware",
            title: "Caja de hogar",
            detail: "Productos para el hogar",
            href: "/pos/hardware",
            icon: <FaTools size={22} />,
          },
        ]
      : []),
    ...(roles.includes("grains")
      ? [
          {
            id: "grains",
            title: "Caja de granos básicos",
            detail: "Productos de granos e inventario",
            href: "/pos/grains",
            icon: <FaSeedling size={22} />,
          },
        ]
      : []),
    ...(roles.includes("property")
      ? [
          {
            id: "property",
            title: "Gestión de terrenos",
            detail: "Propiedades y pagos",
            href: "/sell/property",
            icon: <FaBuilding size={22} />,
          },
        ]
      : []),
  ];

  return (
    <Box sx={{ minHeight: "100dvh", bgcolor: "#f4f7fb", px: 2, py: 3 }}>
      <Box sx={{ maxWidth: 1050, mx: "auto" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 6 }}>
          <Box>
            <Typography
              sx={{ color: colors.primary, fontSize: 11, fontWeight: 900, letterSpacing: ".12em" }}
            >
              ASSET HUB · ACCESOS
            </Typography>
            <Typography sx={{ mt: 0.5, fontSize: 28, fontWeight: 950 }}>
              ¿A qué módulo vas?
            </Typography>
            <Typography sx={{ mt: 0.5, color: "#64748b" }}>
              Tu cuenta tiene acceso a más de un espacio de trabajo.
            </Typography>
          </Box>
          <Box sx={{ width: 145 }}>
            <LogoutButton />
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2,minmax(0,1fr))" },
            gap: 2,
          }}
        >
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              onClick={() => router.push(destination.href)}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid #e2e8f0",
                boxShadow: "0 12px 34px rgba(15,23,42,.06)",
                cursor: "pointer",
                transition: ".18s",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 18px 38px rgba(15,23,42,.12)",
                },
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: 2,
                  bgcolor: "#eff6ff",
                  color: colors.primary,
                }}
              >
                {destination.icon}
              </Box>
              <Typography sx={{ mt: 2, fontSize: 20, fontWeight: 900 }}>
                {destination.title}
              </Typography>
              <Typography sx={{ mt: 0.5, color: "#64748b" }}>{destination.detail}</Typography>
              <Button
                endIcon={<FaArrowRight />}
                sx={{ mt: 2, p: 0, fontWeight: 850, textTransform: "none" }}
              >
                Abrir módulo
              </Button>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
