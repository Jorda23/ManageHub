"use client";

import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert, Box, Button, Card, Typography } from "@mui/material";
import { FaArrowRight, FaSeedling, FaTools } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { CashierScreen, type CashierProduct } from "./CashierScreen";
import { useHardwareProducts } from "@/hook/useHardware";
import { useGrainProducts } from "@/hook/useGrains";
import { getLoginDestination, getCashierModules, type CashierModule } from "@/utils/authorization";
import { registerGrainInvoice, registerHardwareInvoice } from "@/service/api";
import { downloadCartInvoicePdf } from "@/utils/generateCartInvoice";
import { useToast } from "@/components/Toast";
import { LogoutButton } from "@/components/AppShell/components/LogoutButton";
import { colors } from "@/theme/sharedColors";
import type { RegisterInvoiceRequest } from "@/shared/types/api.types";

function HardwareCashier() {
  const queryClient = useQueryClient();
  const { showError } = useToast();
  const { data = [], isLoading, error } = useHardwareProducts({ limit: 200, page: 1 });
  const mutation = useMutation({
    mutationFn: registerHardwareInvoice,
    onSuccess: async () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["hardware-products"] }),
        queryClient.invalidateQueries({ queryKey: ["hardware-sales"] }),
      ]),
  });
  const products: CashierProduct[] = data.map((product) => ({
    id: product.id,
    name: product.name,
    code: product.code,
    price: product.unitPrice,
    stock: product.currentStock,
    currency: product.currency,
    imageUrl: product.imageUrl,
  }));
  const checkout = useCallback(
    async (request: RegisterInvoiceRequest) => {
      const invoice = await mutation.mutateAsync(request);
      try {
        await downloadCartInvoicePdf(invoice, "hardware");
      } catch {
        showError(
          `La factura ${invoice.invoiceNumber} se registró, pero no se pudo descargar el PDF.`,
        );
      }
    },
    [mutation, showError],
  );

  return (
    <CashierScreen
      module="hardware"
      products={products}
      isLoading={isLoading}
      isSubmitting={mutation.isPending}
      error={error?.message}
      onCheckout={checkout}
    />
  );
}

function GrainCashier() {
  const queryClient = useQueryClient();
  const { showError } = useToast();
  const { data = [], isLoading, error } = useGrainProducts({ limit: 200, page: 1 });
  const mutation = useMutation({
    mutationFn: registerGrainInvoice,
    onSuccess: async () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["grain-products"] }),
        queryClient.invalidateQueries({ queryKey: ["grain-sales"] }),
      ]),
  });
  const products: CashierProduct[] = data.map((product) => ({
    id: product.id,
    name: product.name,
    code: product.code,
    price: product.unitPrice,
    stock: product.currentStock,
    currency: product.currency,
    unit: product.unit,
    imageUrl: product.imageUrl,
  }));
  const checkout = useCallback(
    async (request: RegisterInvoiceRequest) => {
      const invoice = await mutation.mutateAsync(request);
      try {
        await downloadCartInvoicePdf(invoice, "grains");
      } catch {
        showError(
          `La factura ${invoice.invoiceNumber} se registró, pero no se pudo descargar el PDF.`,
        );
      }
    },
    [mutation, showError],
  );

  return (
    <CashierScreen
      module="grains"
      products={products}
      isLoading={isLoading}
      isSubmitting={mutation.isPending}
      error={error?.message}
      onCheckout={checkout}
    />
  );
}

export function PointOfSaleWorkspace({ module }: { module?: CashierModule }) {
  if (module === "hardware") return <HardwareCashier />;
  if (module === "grains") return <GrainCashier />;
  return <CashierSelector />;
}

function CashierSelector() {
  const router = useRouter();
  const modules = getCashierModules();
  const isAdmin = getLoginDestination() === "/dashboard";
  const cards = modules.map((module) => ({
    id: module,
    title: module === "hardware" ? "Hogar" : "Grano",
    detail:
      module === "hardware" ? "Caja de herramientas y materiales" : "Caja de productos de granos",
    icon: module === "hardware" ? <FaTools size={22} /> : <FaSeedling size={22} />,
  }));

  return (
    <Box sx={{ minHeight: "100dvh", bgcolor: "#f4f7fb", px: 2, py: 3 }}>
      <Box sx={{ maxWidth: 1050, mx: "auto" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 6 }}>
          <Box>
            <Typography
              sx={{ color: colors.primary, fontSize: 11, fontWeight: 900, letterSpacing: ".12em" }}
            >
              ASSET HUB · PUNTO DE VENTA
            </Typography>
            <Typography sx={{ mt: 0.5, fontSize: 28, fontWeight: 950 }}>
              Selecciona una caja
            </Typography>
            <Typography sx={{ mt: 0.5, color: "#64748b" }}>
              Elige el módulo donde vas a registrar la venta.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {isAdmin && (
              <Button onClick={() => router.replace("/dashboard")} sx={{ textTransform: "none" }}>
                Administración
              </Button>
            )}
            <Box sx={{ width: 145 }}>
              <LogoutButton />
            </Box>
          </Box>
        </Box>
        {modules.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2,minmax(0,1fr))" },
              gap: 2,
            }}
          >
            {cards.map((card) => (
              <Card
                key={card.id}
                onClick={() => router.push(`/pos/${card.id}`)}
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
                  {card.icon}
                </Box>
                <Typography sx={{ mt: 2, fontSize: 20, fontWeight: 900 }}>{card.title}</Typography>
                <Typography sx={{ mt: 0.5, color: "#64748b" }}>{card.detail}</Typography>
                <Button
                  endIcon={<FaArrowRight />}
                  sx={{ mt: 2, p: 0, fontWeight: 850, textTransform: "none" }}
                >
                  Abrir caja
                </Button>
              </Card>
            ))}
          </Box>
        ) : (
          <Alert severity="info">
            Esta cuenta no tiene cajas asignadas. Contacta al administrador.
          </Alert>
        )}
      </Box>
    </Box>
  );
}
