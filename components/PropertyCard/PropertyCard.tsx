"use client";

import type { KeyboardEvent, ReactNode } from "react";

import { Box, Chip, LinearProgress, Paper, Typography } from "@mui/material";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaHome,
  FaMapMarkedAlt,
  FaRulerCombined,
} from "react-icons/fa";

import {
  colors,
  formatCurrency,
  getPendingAmount,
  getStatusColors,
  type PropertyItem,
} from "@/Modules/Property/propertyWorkspaceData";

type PropertyCardProps = {
  property: PropertyItem;
  onClick?: (property: PropertyItem) => void;
};

type StatusColors = ReturnType<typeof getStatusColors>;

export function PropertyCard({ property, onClick }: PropertyCardProps) {
  const pendingAmount = getPendingAmount(property);

  const progress = property.price > 0 ? Math.min(100, (property.paid / property.price) * 100) : 0;

  const statusColors = getStatusColors(property.status);
  const isClickable = Boolean(onClick);

  const handleClick = (): void => {
    onClick?.(property);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
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
        overflow: "hidden",
        borderRadius: {
          xs: "12px",
          sm: "14px",
          md: "16px",
        },
        border: `1px solid ${colors.cardBorder}`,
        bgcolor: "#ffffff",
        cursor: isClickable ? "pointer" : "default",
        transition: "transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease",
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
      <PropertyImage property={property} />

      <Box
        sx={{
          p: {
            xs: 1.25,
            sm: 1.5,
            md: 2,
          },
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
        <PropertyCardHeader property={property} statusColors={statusColors} />

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
          <InfoLine icon={<FaRulerCombined />} label="Medida" value={property.size} />
          <InfoLine icon={<FaMapMarkedAlt />} label="Ubicación" value={property.location} />
          <InfoLine
            icon={<FaBuilding />}
            label="Cliente"
            value={property.ownerName || "Cliente no registrado"}
          />
          <InfoLine icon={<FaCalendarAlt />} label="Próximo pago" value={property.dueDate} />
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
            "@media (max-width: 390px)": {
              gridTemplateColumns: "1fr",
            },
          }}
        >
          <AmountBox label="Precio" value={formatCurrency(property.price)} />
          <AmountBox label="Abonado" value={formatCurrency(property.paid)} />
          <AmountBox label="Pendiente" value={formatCurrency(pendingAmount)} />
        </Box>

        <PaymentProgress progress={progress} accent={property.accent} />
      </Box>
    </Paper>
  );
}

function PropertyImage({ property }: { property: PropertyItem }) {
  const hasImage = Boolean(property.imageUrl?.trim());

  return (
    <Box
      role="img"
      aria-label={`Imagen de ${property.name}`}
      sx={{
        position: "relative",
        width: "100%",
        height: {
          xs: 150,
          sm: 170,
          md: 180,
        },
        bgcolor: colors.primarySoft,
        backgroundImage: hasImage
          ? `
              linear-gradient(
                to bottom,
                rgba(15, 23, 42, 0.03),
                rgba(15, 23, 42, 0.38)
              ),
              url("${property.imageUrl}")
            `
          : "linear-gradient(135deg, #dbeafe, #bfdbfe)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
      }}
    >
      {!hasImage ? (
        <Box
          aria-hidden="true"
          sx={{
            display: "grid",
            placeItems: "center",
            color: "rgba(37, 99, 235, 0.5)",
            fontSize: {
              xs: 34,
              sm: 40,
            },
          }}
        >
          <FaHome />
        </Box>
      ) : null}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "linear-gradient(to top, rgba(15,23,42,0.45), transparent 55%)",
        }}
      />

      <Typography
        noWrap
        title={property.location}
        sx={{
          position: "absolute",
          left: {
            xs: 12,
            sm: 16,
          },
          right: {
            xs: 12,
            sm: 16,
          },
          bottom: {
            xs: 10,
            sm: 14,
          },
          color: "#ffffff",
          fontSize: {
            xs: 12,
            sm: 13,
          },
          fontWeight: 900,
          textShadow: "0 1px 4px rgba(0,0,0,0.45)",
        }}
      >
        {property.location}
      </Typography>
    </Box>
  );
}

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
      <Box
        sx={{
          minWidth: 0,
          flex: 1,
        }}
      >
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
                xs: 14,
                sm: 14,
                md: 15,
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
                xs: 11,
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
              xs: 11,
              sm: 11,
              md: 12,
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
            xs: 24,
            sm: 24,
            md: 26,
          },
          bgcolor: statusColors.bg,
          color: statusColors.color,
          border: `1px solid ${statusColors.border}`,
          fontSize: {
            xs: 10,
            sm: 10,
            md: 11,
          },
          fontWeight: 950,
          "& .MuiChip-label": {
            px: {
              xs: 0.9,
              sm: 1,
            },
          },
        }}
      />
    </Box>
  );
}

function InfoLine({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "22px 74px minmax(0, 1fr)",
          sm: "22px 76px minmax(0, 1fr)",
        },
        alignItems: "center",
        gap: {
          xs: 0.75,
          sm: 1,
        },
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          bgcolor: colors.primarySoft,
          color: colors.primaryLight,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
          fontSize: {
            xs: 10,
            sm: 11,
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
            xs: 11,
            sm: 11,
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
            xs: 11,
            sm: 11,
            md: 12,
          },
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function AmountBox({ label, value }: { label: string; value: string }) {
  return (
    <Box
      sx={{
        minWidth: 0,
        p: {
          xs: 0.9,
          sm: 1,
        },
        borderRadius: {
          xs: "12px",
          sm: "14px",
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
            xs: 9,
            sm: 9,
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
          mt: 0.15,
          color: colors.text,
          fontWeight: 950,
          fontSize: {
            xs: 11,
            sm: 11,
            md: 12,
          },
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function PaymentProgress({ progress, accent }: { progress: number; accent: string }) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 0.55,
          gap: 1,
        }}
      >
        <Typography
          noWrap
          sx={{
            color: colors.softMuted,
            fontWeight: 950,
            fontSize: {
              xs: 10,
              sm: 10,
              md: 11,
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
              xs: 11,
              sm: 11,
              md: 12,
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
            xs: 6,
            sm: 6,
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
