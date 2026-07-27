"use client";

import type { ReactNode } from "react";

import {
  Box,
  Chip,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";

import {
  FaBuilding,
  FaCalendarAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaMapMarkedAlt,
  FaRulerCombined,
} from "react-icons/fa";

export type AccountStatus =
  | "Al día"
  | "Pendiente"
  | "Atrasado"
  | "Pagado";

export type PropertyItem = {
  id: string;
  name: string;
  code: string;
  location: string;
  size: string;
  price: number;
  paid: number;
  buyerName: string;
  buyerEmail: string;
  dueDate: string;
  status: AccountStatus;
  accent: string;
  ownerName: string;
  ownerPhone?: string;
  ownerDocument?: string;
};

type PropertyCardProps = {
  property: PropertyItem;
  onClick?: (property: PropertyItem) => void;
};

const colors = {
  cardBorder: "#dce5e1",
  text: "#0f172a",
  muted: "#64748b",
  softMuted: "#94a3b8",
  primary: "#1e3a8a",
  primaryLight: "#2563eb",
  primarySoft: "#dbeafe",
  green: "#0f766e",
  greenSoft: "#dcfce7",
  orange: "#f97316",
  orangeSoft: "#ffedd5",
  danger: "#dc2626",
  dangerSoft: "#fee2e2",
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function getPendingAmount(property: PropertyItem): number {
  return Math.max(property.price - property.paid, 0);
}

function getStatusColors(status: AccountStatus) {
  switch (status) {
    case "Pagado":
      return {
        background: colors.greenSoft,
        color: colors.green,
        border: "#bbf7d0",
      };

    case "Atrasado":
      return {
        background: colors.dangerSoft,
        color: colors.danger,
        border: "#fecaca",
      };

    case "Pendiente":
      return {
        background: colors.orangeSoft,
        color: colors.orange,
        border: "#fed7aa",
      };

    default:
      return {
        background: colors.primarySoft,
        color: colors.primaryLight,
        border: "#bfdbfe",
      };
  }
}

export function PropertyCard({
  property,
  onClick,
}: PropertyCardProps) {
  const pendingAmount = getPendingAmount(property);

  const progress =
    property.price > 0
      ? Math.min(100, (property.paid / property.price) * 100)
      : 0;

  const statusColors = getStatusColors(property.status);

  const isClickable = Boolean(onClick);

  const handleClick = (): void => {
    onClick?.(property);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ): void => {
    if (!isClickable) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick?.(property);
    }
  };

  return (
    <Paper
      elevation={0}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      sx={{
        width: "100%",
        minWidth: 0,

        p: {
          xs: 1.25,
          sm: 1.5,
          md: 2,
        },

        borderRadius: {
          xs: "12px",
          sm: "14px",
          md: "16px",
        },

        border: `1px solid ${colors.cardBorder}`,
        bgcolor: "#ffffff",

        cursor: isClickable ? "pointer" : "default",

        transition:
          "transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease",

        "&:hover": {
          transform: {
            xs: "none",
            md: "translateY(-2px)",
          },
          borderColor: "#b7c7c2",
          boxShadow: {
            xs: "none",
            md: "0 12px 26px rgba(15, 23, 42, 0.08)",
          },
        },

        "&:focus-visible": {
          outline: `2px solid ${colors.primaryLight}`,
          outlineOffset: 2,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",

          gap: {
            xs: 1,
            sm: 1.2,
            md: 1.4,
          },

          minWidth: 0,
        }}
      >
        <PropertyCardHeader
          property={property}
          statusColors={statusColors}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",

            gap: {
              xs: 0.7,
              sm: 0.9,
            },
          }}
        >
          <InfoLine
            icon={<FaRulerCombined />}
            label="Medida"
            value={property.size}
          />

          <InfoLine
            icon={<FaMapMarkedAlt />}
            label="Ubicación"
            value={property.location}
          />

          <InfoLine
            icon={<FaBuilding />}
            label="Cliente"
            value={property.ownerName || "Cliente no registrado"}
          />

          <InfoLine
            icon={<FaCalendarAlt />}
            label="Próximo pago"
            value={property.dueDate}
          />
        </Box>

        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "repeat(3, minmax(0, 1fr))",
            },

            gap: {
              xs: 0.5,
              sm: 0.75,
              md: 1,
            },

            minWidth: 0,

            "@media (max-width: 340px)": {
              gridTemplateColumns: "1fr",
            },
          }}
        >
          <AmountBox
            label="Precio"
            value={formatCurrency(property.price)}
          />

          <AmountBox
            label="Abonado"
            value={formatCurrency(property.paid)}
          />

          <AmountBox
            label="Pendiente"
            value={formatCurrency(pendingAmount)}
          />
        </Box>

        <PaymentProgress
          progress={progress}
          accent={property.accent}
        />
      </Box>
    </Paper>
  );
}

type StatusColors = ReturnType<typeof getStatusColors>;

function PropertyCardHeader({
  property,
  statusColors,
}: {
  property: PropertyItem;
  statusColors: StatusColors;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",

        gap: {
          xs: 0.75,
          sm: 1.5,
        },

        minWidth: 0,
      }}
    >
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",

            gap: {
              xs: 0.45,
              sm: 0.75,
            },

            minWidth: 0,
          }}
        >
          <Typography
            noWrap
            title={property.name}
            sx={{
              minWidth: 0,
              color: colors.text,

              fontWeight: 950,

              fontSize: {
                xs: 12,
                sm: 13.5,
                md: 14.5,
              },
            }}
          >
            {property.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexShrink: 0,

              fontSize: {
                xs: 10,
                sm: 12,
              },
            }}
          >
            {property.status === "Atrasado" ? (
              <FaExclamationTriangle color={colors.danger} />
            ) : (
              <FaCheckCircle color={statusColors.color} />
            )}
          </Box>
        </Box>

        <Typography
          noWrap
          title={property.code}
          sx={{
            color: colors.softMuted,
            fontWeight: 700,

            fontSize: {
              xs: 8.5,
              sm: 10,
              md: 11,
            },
          }}
        >
          {property.code}
        </Typography>
      </Box>

      <Chip
        label={property.status}
        size="small"
        sx={{
          flexShrink: 0,

          height: {
            xs: 20,
            sm: 22,
            md: 24,
          },

          bgcolor: statusColors.background,
          color: statusColors.color,
          border: `1px solid ${statusColors.border}`,

          fontSize: {
            xs: 8,
            sm: 9.5,
            md: 11,
          },

          fontWeight: 950,

          "& .MuiChip-label": {
            px: {
              xs: 0.7,
              sm: 1,
            },
          },
        }}
      />
    </Box>
  );
}

function InfoLine({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Box
      sx={{
        display: "grid",

        gridTemplateColumns: {
          xs: "18px 58px minmax(0, 1fr)",
          sm: "20px 68px minmax(0, 1fr)",
          md: "22px 76px minmax(0, 1fr)",
        },

        alignItems: "center",

        gap: {
          xs: 0.5,
          sm: 0.75,
          md: 1,
        },

        minWidth: 0,
      }}
    >
      <Box
        sx={{
          width: {
            xs: 18,
            sm: 20,
            md: 22,
          },

          height: {
            xs: 18,
            sm: 20,
            md: 22,
          },

          borderRadius: "50%",
          bgcolor: colors.primarySoft,
          color: colors.primaryLight,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,

          fontSize: {
            xs: 8,
            sm: 9,
            md: 11,
          },
        }}
      >
        {icon}
      </Box>

      <Typography
        noWrap
        sx={{
          color: colors.muted,
          fontWeight: 700,

          fontSize: {
            xs: 8.5,
            sm: 10,
            md: 12,
          },
        }}
      >
        {label}:
      </Typography>

      <Typography
        noWrap
        title={value}
        sx={{
          minWidth: 0,
          color: colors.text,
          fontWeight: 900,

          fontSize: {
            xs: 8.5,
            sm: 10,
            md: 12,
          },
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function AmountBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Box
      sx={{
        minWidth: 0,

        p: {
          xs: 0.65,
          sm: 0.8,
          md: 1,
        },

        borderRadius: {
          xs: "10px",
          sm: "12px",
          md: "16px",
        },

        bgcolor: "#f8fafc",
        border: `1px solid ${colors.cardBorder}`,
        overflow: "hidden",
      }}
    >
      <Typography
        noWrap
        sx={{
          color: colors.muted,
          fontWeight: 900,
          textTransform: "uppercase",

          fontSize: {
            xs: 6.5,
            sm: 8,
            md: 10,
          },
        }}
      >
        {label}
      </Typography>

      <Typography
        noWrap
        title={value}
        sx={{
          mt: 0.1,
          color: colors.text,
          fontWeight: 950,

          fontSize: {
            xs: 8,
            sm: 10,
            md: 12,
          },
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function PaymentProgress({
  progress,
  accent,
}: {
  progress: number;
  accent: string;
}) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          mb: {
            xs: 0.35,
            sm: 0.5,
            md: 0.7,
          },

          gap: 1,
        }}
      >
        <Typography
          noWrap
          sx={{
            color: colors.softMuted,
            fontWeight: 950,

            fontSize: {
              xs: 6.5,
              sm: 8,
              md: 10.5,
            },
          }}
        >
          AVANCE DE PAGO
        </Typography>

        <Typography
          sx={{
            flexShrink: 0,
            color: accent,
            fontWeight: 950,

            fontSize: {
              xs: 7,
              sm: 8.5,
              md: 10.5,
            },
          }}
        >
          {Math.round(progress)}%
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={progress}
        aria-label={`Avance de pago ${Math.round(progress)}%`}
        sx={{
          height: {
            xs: 4,
            sm: 5,
            md: 7,
          },

          borderRadius: 999,
          bgcolor: "#e5e7eb",

          "& .MuiLinearProgress-bar": {
            bgcolor: accent,
            borderRadius: 999,
          },
        }}
      />
    </Box>
  );
}