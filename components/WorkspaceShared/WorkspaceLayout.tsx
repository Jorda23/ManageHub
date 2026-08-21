"use client";

import Link from "next/link";
import {
  alpha,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  FaArrowRight,
  FaBuilding,
  FaChartLine,
  FaChevronDown,
  FaExchangeAlt,
  FaFileInvoiceDollar,
  FaPlus,
  FaPrint,
  FaSearch,
  FaTools,
  FaTruckLoading,
} from "react-icons/fa";

import { saleCategories, type SaleCategory } from "@/components/SaleWorkspace/saleWorkspaceData";
import type {
  IconType,
  WorkspaceAnalysisItem,
  WorkspaceConfig,
  WorkspaceProduct,
  WorkspacePayment,
} from "./workspaceTypes";
import { AppShell } from "../AppShell";

type WorkspaceLayoutProps = {
  config: WorkspaceConfig;
};

export function WorkspaceLayout({ config }: WorkspaceLayoutProps) {
  const category = config.category;

  return (
    <AppShell active={category}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          minHeight: "calc(100vh - 48px)",
          px: { xs: 2, md: 4 },
          py: { xs: 2.5, md: 3 },
          bgcolor: "#f5f8fb",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 1320, mx: "auto" }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{
              mb: 3,
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "flex-end" },
            }}
          >
            <Box>
              <Chip
                label={config.badge}
                size="small"
                icon={<FaExchangeAlt />}
                sx={{
                  mb: 1.25,
                  bgcolor: alpha(config.heroAccent, 0.15),
                  color: config.heroAccent,
                  fontWeight: 900,
                  "& .MuiChip-icon": {
                    color: "inherit",
                  },
                }}
              />

              <Typography
                sx={{
                  color: "#001f33",
                  fontSize: { xs: 30, md: 38 },
                  fontWeight: 950,
                  lineHeight: 1,
                }}
              >
                {config.title}
              </Typography>

              <Typography
                sx={{
                  maxWidth: 720,
                  mt: 1,
                  color: "#4b6475",
                  fontSize: { xs: 14, md: 16 },
                  fontWeight: 600,
                }}
              >
                {config.subtitle}
              </Typography>
            </Box>

            <Button
              variant="contained"
              sx={{
                bgcolor: "#123f63",
                color: "#ffffff",
                borderRadius: 1.5,
                px: 2.4,
                py: 1.2,
                fontSize: 12,
                fontWeight: 900,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#002b45",
                  boxShadow: "none",
                },
              }}
            >
              Nuevo registro
            </Button>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, minmax(0, 1fr))",
                xl: "repeat(4, minmax(0, 1fr))",
              },
              gap: 2,
              mb: 3,
            }}
          >
            {config.metrics.map((metric) => (
              <MetricCard key={metric.label} {...metric} accent={config.heroAccent} />
            ))}
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "minmax(0, 1.45fr) minmax(340px, 0.95fr)",
              },
              gap: 3,
              alignItems: "start",
            }}
          >
            <Stack spacing={3}>
              <GlassCard>
                <SectionHeader
                  title="Módulos del sistema"
                  subtitle="Cambia de módulo o continúa con el registro actual."
                />

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "1.15fr 0.85fr",
                    },
                    gap: 2,
                  }}
                >
                  <Box>
                    <SectionLabel>Categoría</SectionLabel>

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "1fr",
                          sm: "repeat(3, minmax(0, 1fr))",
                        },
                        gap: 1.25,
                      }}
                    >
                      {saleCategories.map((item) => (
                        <CategoryTile
                          key={item}
                          href={`/sell/${item}`}
                          active={item === category}
                          icon={categoryIcon(item)}
                          label={categoryLabel(item)}
                          hint={categoryHint(item)}
                          accent={item === category ? config.heroAccent : "#607383"}
                        />
                      ))}
                    </Box>
                  </Box>

                  <Box>
                    <SectionLabel>{category === "property" ? "Comprador" : "Cliente"}</SectionLabel>

                    {config.customerMode === "directory" ? (
                      <CustomerDirectory config={config} accent={config.heroAccent} />
                    ) : (
                      <QuickCustomer config={config} />
                    )}
                  </Box>
                </Box>
              </GlassCard>

              <GlassCard>
                <SectionHeader
                  title={category === "property" ? "Propiedad" : "Productos"}
                  subtitle={
                    category === "property"
                      ? "Revisa el terreno, valor, documentación y saldo asociado."
                      : "Revisa cantidades, precios y totales antes de confirmar."
                  }
                  action={
                    <Stack
                      direction="row"
                      spacing={0.75}
                      sx={{ alignItems: "center", color: config.heroAccent }}
                    >
                      <FaPlus size={12} />
                      <Typography sx={{ fontSize: 13, fontWeight: 900 }}>
                        {category === "property" ? "Agregar propiedad" : "Agregar item"}
                      </Typography>
                    </Stack>
                  }
                />

                <ItemsTableHeader category={category} />

                <Stack spacing={1.25}>
                  {config.products.map((product) => (
                    <ItemRow key={product.code} {...product} />
                  ))}
                </Stack>
              </GlassCard>

              <GlassCard>
                <SectionHeader
                  title={category === "property" ? "Método de abono" : "Método de pago"}
                  subtitle={
                    category === "property"
                      ? "Registra el abono usando el método seleccionado."
                      : "Mantén el flujo de venta rápido con el método preferido."
                  }
                />

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "repeat(3, minmax(0, 1fr))",
                    },
                    gap: 1.25,
                  }}
                >
                  {config.payments.map((payment) => (
                    <PaymentTile key={payment.title} {...payment} accent={config.heroAccent} />
                  ))}
                </Box>
              </GlassCard>

              <GlassCard>
                <SectionHeader
                  title={category === "property" ? "Análisis de pagos" : "Análisis de ventas"}
                  subtitle={
                    category === "property"
                      ? "Consulta cómo se están moviendo los abonos por período."
                      : "Consulta cómo se están moviendo las ventas por día, semana y mes."
                  }
                />

                <Stack spacing={1.5}>
                  {config.salesAnalysis.map((item) => (
                    <AnalysisRow key={item.label} item={item} accent={config.heroAccent} />
                  ))}
                </Stack>
              </GlassCard>
            </Stack>

            <Stack spacing={3} sx={{ position: { lg: "sticky" }, top: 24 }}>
              <SummaryCard config={config} accent={config.heroAccent} />

              <GlassCard sx={{ p: 2.25 }}>
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#607383",
                        fontWeight: 900,
                      }}
                    >
                      {config.workflowTitle}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: 950,
                        mt: 0.25,
                        color: "#001f33",
                      }}
                    >
                      Pasos del proceso
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      bgcolor: alpha(config.heroAccent, 0.13),
                      color: config.heroAccent,
                    }}
                  >
                    <FaChartLine />
                  </Box>
                </Stack>

                <Stack spacing={1.4} sx={{ mt: 2 }}>
                  {config.workflowItems.map((item, index) => (
                    <Stack key={item} direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          bgcolor: alpha(config.heroAccent, 0.14),
                          color: config.heroAccent,
                          display: "grid",
                          placeItems: "center",
                          fontSize: 11,
                          fontWeight: 900,
                          flexShrink: 0,
                        }}
                      >
                        {index + 1}
                      </Box>

                      <Typography
                        sx={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#4b6475",
                        }}
                      >
                        {item}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </GlassCard>
            </Stack>
          </Box>
        </Box>
      </Box>
    </AppShell>
  );
}

function CustomerDirectory({ config, accent }: { config: WorkspaceConfig; accent: string }) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        border: "1px solid #dfe7ee",
        bgcolor: "#ffffff",
        p: 1.75,
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <TextField
          fullWidth
          placeholder="Buscar comprador..."
          variant="standard"
          slotProps={{
            input: {
              disableUnderline: true,
              startAdornment: (
                <Box
                  sx={{
                    mr: 1.2,
                    color: "#607383",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FaSearch />
                </Box>
              ),
            },
          }}
          sx={{
            "& .MuiInputBase-input": {
              color: "#001f33",
              fontSize: 14,
              fontWeight: 700,
              py: 0.4,
            },
          }}
        />

        <Button
          variant="contained"
          sx={{
            whiteSpace: "nowrap",
            bgcolor: alpha(accent, 0.2),
            color: "#001f33",
            boxShadow: "none",
            textTransform: "none",
            fontWeight: 900,
            "&:hover": {
              bgcolor: alpha(accent, 0.28),
              boxShadow: "none",
            },
          }}
        >
          Nuevo
        </Button>
      </Stack>

      <Divider sx={{ my: 1.6, borderColor: "#e1e8ee" }} />

      <Stack spacing={1.1}>
        {(config.customerList ?? []).map((customer) => (
          <Box
            key={customer.name}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              p: 1.15,
              borderRadius: 2.5,
              border: "1px solid #e1e8ee",
              bgcolor: "#f8fafc",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 12.5,
                  fontWeight: 950,
                  color: "#001f33",
                }}
              >
                {customer.name}
              </Typography>

              <Typography sx={{ fontSize: 11.5, color: "#607383" }}>{customer.detail}</Typography>
            </Box>

            <Stack spacing={0.4} sx={{ alignItems: "flex-end" }}>
              <StatusChip status={customer.status} />
              <Typography sx={{ fontSize: 11, color: "#607383" }}>{customer.amount}</Typography>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

function QuickCustomer({ config }: { config: WorkspaceConfig }) {
  return (
    <Box
      sx={{
        height: 122,
        borderRadius: 3,
        border: "1px solid #dfe7ee",
        bgcolor: "#ffffff",
        p: 1.75,
      }}
    >
      <TextField
        fullWidth
        placeholder="Buscar cliente o crear nuevo..."
        variant="standard"
        slotProps={{
          input: {
            disableUnderline: true,
            startAdornment: (
              <Box
                sx={{
                  mr: 1.2,
                  color: "#607383",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaSearch />
              </Box>
            ),
            endAdornment: (
              <Box
                sx={{
                  color: "#607383",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaChevronDown />
              </Box>
            ),
          },
        }}
        sx={{
          "& .MuiInputBase-input": {
            color: "#001f33",
            fontSize: 14,
            fontWeight: 700,
            py: 0.4,
          },
        }}
      />

      <Divider sx={{ my: 1.6, borderColor: "#e1e8ee" }} />

      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography sx={{ fontSize: 12, fontWeight: 900, color: "#001f33" }}>
            {config.customer}
          </Typography>

          <Typography sx={{ fontSize: 12, color: "#607383" }}>{config.customerEmail}</Typography>
        </Box>

        <Chip
          size="small"
          label="Activo"
          sx={{
            bgcolor: alpha("#123f63", 0.1),
            color: "#123f63",
            fontWeight: 900,
          }}
        />
      </Stack>
    </Box>
  );
}

function ItemsTableHeader({ category }: { category: SaleCategory }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "minmax(0, 1.7fr) 52px 80px 82px",
          sm: "minmax(0, 1.8fr) 64px 96px 90px",
          md: "minmax(0, 2.2fr) 76px 120px 92px",
        },
        gap: 1.2,
        px: { xs: 0, md: 0.25 },
        pb: 1.25,
        color: "#607383",
      }}
    >
      <Typography sx={tableHeaderSx}>
        {category === "property" ? "Propiedad" : "Descripción"}
      </Typography>
      <Typography sx={tableHeaderSx}>Cant.</Typography>
      <Typography sx={tableHeaderSx}>{category === "property" ? "Valor" : "Unit"}</Typography>
      <Typography sx={tableHeaderSx}>Total</Typography>
    </Box>
  );
}

function AnalysisRow({ item, accent }: { item: WorkspaceAnalysisItem; accent: string }) {
  return (
    <Box
      sx={{
        p: 1.5,
        borderRadius: "16px",
        border: "1px solid #e1e8ee",
        bgcolor: "#ffffff",
      }}
    >
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography sx={{ fontSize: 12, color: "#607383", fontWeight: 900 }}>
            {item.label}
          </Typography>

          <Typography sx={{ fontSize: 18, fontWeight: 950, color: "#001f33" }}>
            {item.value}
          </Typography>

          <Typography sx={{ fontSize: 11.5, color: "#607383", fontWeight: 600 }}>
            {item.detail}
          </Typography>
        </Box>

        <Typography sx={{ fontSize: 12, color: accent, fontWeight: 950 }}>
          {item.progress}%
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={item.progress}
        sx={{
          mt: 1.2,
          height: 6,
          borderRadius: 99,
          bgcolor: "#edf2f6",
          "& .MuiLinearProgress-bar": {
            borderRadius: 99,
            bgcolor: accent,
          },
        }}
      />
    </Box>
  );
}

function categoryLabel(category: SaleCategory) {
  if (category === "grains") return "Basic Grains";
  if (category === "hardware") return "Hardware";
  return "Real Estate";
}

function categoryHint(category: SaleCategory) {
  if (category === "grains") return "Granos e inventario";
  if (category === "hardware") return "Herramientas y materiales";
  return "Terrenos y abonos";
}

function categoryIcon(category: SaleCategory) {
  if (category === "grains") return FaTruckLoading;
  if (category === "hardware") return FaTools;
  return FaBuilding;
}

function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        mb: 2,
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <Box>
        <Typography sx={{ color: "#001f33", fontSize: 17, fontWeight: 950 }}>{title}</Typography>

        <Typography
          sx={{
            mt: 0.35,
            color: "#607383",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      {action}
    </Stack>
  );
}

function GlassCard({ children, sx }: { children: React.ReactNode; sx?: object }) {
  return (
    <Card
      sx={{
        position: "relative",
        overflow: "hidden",
        p: 2.5,
        bgcolor: "#ffffff",
        border: "1px solid #dfe7ee",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.04)",
        ...sx,
      }}
    >
      {children}
    </Card>
  );
}

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  detail: string;
  icon: IconType;
  accent: string;
}) {
  return (
    <GlassCard sx={{ p: 2.1 }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
      >
        <Box>
          <Typography sx={{ color: "#607383", fontSize: 12, fontWeight: 900 }}>{label}</Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 25,
              fontWeight: 950,
              lineHeight: 1,
              color: "#001f33",
            }}
          >
            {value}
          </Typography>

          <Typography
            sx={{
              mt: 0.75,
              color: "#607383",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {detail}
          </Typography>
        </Box>

        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2,
            display: "grid",
            placeItems: "center",
            color: accent,
            bgcolor: alpha(accent, 0.12),
          }}
        >
          <Icon size={16} />
        </Box>
      </Stack>
    </GlassCard>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        mb: 1.1,
        color: "#607383",
        fontSize: 11,
        fontWeight: 950,
        textTransform: "uppercase",
        letterSpacing: 0.8,
      }}
    >
      {children}
    </Typography>
  );
}

function CategoryTile({
  href,
  icon: Icon,
  label,
  hint,
  active,
  accent,
}: {
  href: string;
  icon: IconType;
  label: string;
  hint: string;
  active?: boolean;
  accent: string;
}) {
  return (
    <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
      <Box
        sx={{
          borderRadius: "16px",
          p: 1.75,
          height: "140px",
          border: active ? `1px solid ${alpha(accent, 0.65)}` : "1px solid #dfe7ee",
          bgcolor: active ? alpha(accent, 0.12) : "#f8fafc",
          boxShadow: active ? `0 0 0 1px ${alpha(accent, 0.14)} inset` : "none",
          transition: "0.18s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
          },
        }}
      >
        <Stack spacing={1.1}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              color: active ? accent : "#607383",
              bgcolor: active ? alpha(accent, 0.16) : "#edf2f6",
            }}
          >
            <Icon size={16} />
          </Box>

          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 950, color: "#001f33" }}>
              {label}
            </Typography>

            <Typography sx={{ fontSize: 12, color: "#607383", fontWeight: 600 }}>{hint}</Typography>
          </Box>
        </Stack>
      </Box>
    </Link>
  );
}

function ItemRow({ name, detail, code, qty, unit, total, accent, icon: Icon }: WorkspaceProduct) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "minmax(0, 1.7fr) 52px 80px 82px",
          sm: "minmax(0, 1.8fr) 64px 96px 90px",
          md: "minmax(0, 2.2fr) 76px 120px 92px",
        },
        gap: 1.2,
        alignItems: "center",
        px: 1.25,
        py: 1.5,
        borderRadius: 3,
        border: "1px solid #e1e8ee",
        bgcolor: "#f8fafc",
      }}
    >
      <Stack direction="row" spacing={1.35} sx={{ alignItems: "center", minWidth: 0 }}>
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2,
            display: "grid",
            placeItems: "center",
            color: accent,
            bgcolor: alpha(accent, 0.12),
            flexShrink: 0,
          }}
        >
          <Icon size={16} />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 950,
              color: "#001f33",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name} {detail}
          </Typography>

          <Typography sx={{ fontSize: 11, color: accent, fontWeight: 900 }}>{code}</Typography>
        </Box>
      </Stack>

      <Typography sx={valueCellSx}>{qty}</Typography>
      <Typography sx={valueCellSx}>{unit}</Typography>
      <Typography sx={{ ...valueCellSx, color: accent }}>{total}</Typography>
    </Box>
  );
}

function PaymentTile({
  icon: Icon,
  title,
  subtitle,
  active,
  accent,
}: WorkspacePayment & { accent: string }) {
  return (
    <Box
      sx={{
        p: 1.8,
        borderRadius: 3,
        border: active ? `1px solid ${alpha(accent, 0.6)}` : "1px solid #dfe7ee",
        bgcolor: active ? alpha(accent, 0.11) : "#f8fafc",
      }}
    >
      <Stack direction="row" spacing={1.4} sx={{ alignItems: "center" }}>
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2,
            display: "grid",
            placeItems: "center",
            color: active ? accent : "#607383",
            bgcolor: active ? alpha(accent, 0.16) : "#edf2f6",
          }}
        >
          <Icon size={16} />
        </Box>

        <Box>
          <Typography sx={{ fontSize: 15, fontWeight: 950, color: "#001f33" }}>{title}</Typography>

          <Typography sx={{ color: "#607383", fontSize: 12, fontWeight: 600 }}>
            {subtitle}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

function SummaryCard({ config, accent }: { config: WorkspaceConfig; accent: string }) {
  const isProperty = config.category === "property";

  return (
    <GlassCard sx={{ p: 0, overflow: "hidden" }}>
      <Box
        sx={{
          p: 2.2,
          background: `linear-gradient(180deg, ${alpha(accent, 0.15)}, rgba(255,255,255,0) 100%)`,
          borderBottom: "1px solid #e1e8ee",
        }}
      >
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box>
            <Typography sx={{ color: "#607383", fontSize: 11, fontWeight: 950 }}>
              {config.summaryLabel}
            </Typography>

            <Typography
              sx={{
                fontSize: 26,
                fontWeight: 950,
                lineHeight: 1.05,
                mt: 0.4,
                color: "#001f33",
              }}
            >
              {config.invoice}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              color: accent,
              bgcolor: alpha(accent, 0.12),
            }}
          >
            <FaFileInvoiceDollar />
          </Box>
        </Stack>
      </Box>

      <Box sx={{ p: 2.2 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 1,
            mb: 1.6,
          }}
        >
          <SummaryInfo label={isProperty ? "Comprador" : "Cliente"} value={config.customer} />
          <SummaryInfo label="Agente" value={config.agent} />
          <SummaryInfo label="Terminal" value={config.terminal} />
          <SummaryInfo label="Total" value={config.summaryTotal} />
        </Box>

        <Divider sx={{ my: 2, borderStyle: "dashed", borderColor: "#dfe7ee" }} />

        <Stack spacing={1.3}>
          {config.products.map((product) => (
            <Stack
              key={product.code}
              direction="row"
              spacing={2}
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 950, color: "#001f33" }} noWrap>
                  {product.qty}x {product.name}
                </Typography>

                <Typography sx={{ color: "#607383", fontSize: 11, fontWeight: 600 }}>
                  {product.code}
                </Typography>
              </Box>

              <Typography sx={{ color: product.accent, fontWeight: 950, fontSize: 14 }}>
                {product.total}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Divider sx={{ my: 2, borderStyle: "dashed", borderColor: "#dfe7ee" }} />

        <Stack spacing={1.2}>
          <TotalsRow
            label={isProperty ? "Valor base" : "Subtotal"}
            value={config.products[0]?.total ?? "$0.00"}
          />
          <TotalsRow
            label={isProperty ? "Gastos legales" : "Procesamiento"}
            value={isProperty ? "$550.00" : "$4.32"}
          />
          <TotalsRow label="Descuento" value="-$0.00" />
        </Stack>

        {config.paymentState ? (
          <>
            <Divider sx={{ my: 2, borderStyle: "dashed", borderColor: "#dfe7ee" }} />

            <Box
              sx={{
                p: 1.6,
                borderRadius: 3,
                border: `1px solid ${alpha(accent, 0.18)}`,
                bgcolor: alpha(accent, 0.06),
              }}
            >
              <Stack
                direction="row"
                sx={{
                  mb: 1.5,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: 13, fontWeight: 950, color: "#001f33" }}>
                  Estado de cuenta
                </Typography>

                <StatusChip status={config.paymentState} />
              </Stack>

              <Stack spacing={1.1}>
                <SummaryInfo label="Fecha límite" value={config.dueDate ?? "Sin fecha"} />
                <SummaryInfo
                  label="Monto total"
                  value={config.totalAmount ?? config.summaryTotal}
                />
                <SummaryInfo label="Monto abonado" value={config.paidAmount ?? "$0.00"} />
                <SummaryInfo
                  label="Saldo pendiente"
                  value={formatCurrencyDifference(config.totalAmount, config.paidAmount)}
                />
              </Stack>
            </Box>
          </>
        ) : null}

        <Stack direction="row" sx={{ mt: 1.8, justifyContent: "space-between" }}>
          <Typography sx={{ color: accent, fontSize: 15, fontWeight: 950 }}>TOTAL</Typography>

          <Typography sx={{ color: accent, fontSize: 24, fontWeight: 950 }}>
            {config.summaryTotal}
          </Typography>
        </Stack>

        <Button
          fullWidth
          variant="contained"
          endIcon={<FaArrowRight />}
          sx={{
            mt: 2.8,
            py: 1.5,
            borderRadius: 2,
            bgcolor: accent,
            color: "#001f33",
            boxShadow: `0 12px 30px ${alpha(accent, 0.18)}`,
            fontWeight: 950,
            textTransform: "none",
            "&:hover": {
              bgcolor: accent,
              filter: "brightness(0.95)",
            },
          }}
        >
          {isProperty ? "Registrar abono" : "Confirmar venta"}
        </Button>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<FaPrint />}
          sx={{
            mt: 1,
            py: 1.45,
            borderRadius: 2,
            borderColor: "#d0dbe3",
            color: "#001f33",
            fontWeight: 900,
            textTransform: "none",
            "&:hover": {
              borderColor: accent,
              bgcolor: alpha(accent, 0.08),
            },
          }}
        >
          {isProperty ? "Generar estado de cuenta" : "Generar recibo"}
        </Button>

        <Typography
          sx={{
            mt: 2,
            color: "#607383",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {config.summaryNote}
        </Typography>

        <Typography
          align="center"
          sx={{
            mt: 2.6,
            color: "#607383",
            fontSize: 10,
            letterSpacing: 1.2,
            textTransform: "uppercase",
          }}
        >
          Powered by AssetHub
        </Typography>
      </Box>
    </GlassCard>
  );
}

function StatusChip({ status }: { status: "Pagado" | "Pendiente" | "Atrasado" | "Al día" }) {
  const statusConfig = {
    Pagado: {
      bg: alpha("#16a34a", 0.12),
      color: "#16a34a",
    },
    "Al día": {
      bg: alpha("#0ea5e9", 0.12),
      color: "#0ea5e9",
    },
    Pendiente: {
      bg: alpha("#f59e0b", 0.14),
      color: "#b45309",
    },
    Atrasado: {
      bg: alpha("#ef4444", 0.12),
      color: "#dc2626",
    },
  }[status];

  return (
    <Chip
      size="small"
      label={status}
      sx={{
        bgcolor: statusConfig.bg,
        color: statusConfig.color,
        fontWeight: 900,
      }}
    />
  );
}

function SummaryInfo({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography sx={{ color: "#607383", fontSize: 11, fontWeight: 900 }}>{label}</Typography>

      <Typography sx={{ fontSize: 12.5, fontWeight: 900, mt: 0.15, color: "#001f33" }}>
        {value}
      </Typography>
    </Box>
  );
}

function TotalsRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
      <Typography sx={{ color: "#607383", fontSize: 13, fontWeight: 700 }}>{label}</Typography>

      <Typography sx={{ fontSize: 13.5, fontWeight: 950, color: "#001f33" }}>{value}</Typography>
    </Stack>
  );
}

function formatCurrencyDifference(total?: string, paid?: string) {
  const totalValue = parseCurrency(total);
  const paidValue = parseCurrency(paid);

  if (totalValue === null || paidValue === null) {
    return "$0.00";
  }

  return formatCurrency(Math.max(totalValue - paidValue, 0));
}

function parseCurrency(value?: string) {
  if (!value) return null;

  const numeric = Number(value.replace(/[^0-9.-]/g, ""));

  return Number.isFinite(numeric) ? numeric : null;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

const tableHeaderSx = {
  fontSize: 11,
  color: "#607383",
  fontWeight: 950,
  textTransform: "uppercase",
  letterSpacing: 0.8,
};

const valueCellSx = {
  fontSize: 15,
  fontWeight: 950,
  textAlign: "right",
  color: "#001f33",
};
