"use client";

import { memo, type KeyboardEvent, type ReactNode } from "react";

import { Box, Chip, IconButton, LinearProgress, Paper, Typography } from "@mui/material";

import {
  FaBuilding,
  FaCalendarAlt,
  FaEdit,
  FaHome,
  FaMapMarkerAlt,
  FaRulerCombined,
} from "react-icons/fa";

import { getPendingAmount, getStatusColors, type PropertyItem } from "@/shared/data/property.data";

import { colors } from "@/theme/sharedColors";
import { formatCurrency } from "@/shared";
import { getImageKitUrl } from "@/utils/imagekit";

type PropertyCardProps = {
  property: PropertyItem;
  onClick?: (property: PropertyItem) => void;
  onEdit?: (property: PropertyItem) => void;
};

export const PropertyCard = memo(function PropertyCard({
  property,
  onClick,
  onEdit,
}: Readonly<PropertyCardProps>) {
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
        height: "100%",
        minWidth: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        border: `1px solid ${colors.cardBorder}`,
        bgcolor: "#ffffff",
        cursor: isClickable ? "pointer" : "default",
        transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",

        "&:hover": {
          transform: {
            xs: "none",
            md: "translateY(-3px)",
          },
          borderColor: {
            md: "#cbd5e1",
          },
          boxShadow: {
            xs: "none",
            md: "0 14px 32px rgba(15, 23, 42, 0.08)",
          },
        },

        "&:focus-visible": {
          outline: `2px solid ${colors.primaryLight}`,
          outlineOffset: 2,
        },
      }}
    >
      <PropertyImage property={property} statusColors={statusColors} onEdit={onEdit} />

      <Box
        sx={{
          p: {
            xs: 1.5,
            sm: 1.75,
            md: 2,
          },
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          flex: 1,
          minWidth: 0,
        }}
      >
        <PropertyIdentity property={property} />

        <PropertyMetadata property={property} />

        <FinancialSummary property={property} pendingAmount={pendingAmount} />

        <PaymentProgress progress={progress} accent={property.accent} />
      </Box>
    </Paper>
  );
});

type StatusColors = ReturnType<typeof getStatusColors>;

function PropertyImage({
  property,
  statusColors,
  onEdit,
}: {
  property: PropertyItem;
  statusColors: StatusColors;
  onEdit?: (property: PropertyItem) => void;
}) {
  const hasImage = Boolean(property.imageUrl?.trim());

  return (
    <Box
      role="img"
      aria-label={`Imagen de ${property.name}`}
      sx={{
        position: "relative",
        width: "100%",
        height: {
          xs: 138,
          sm: 150,
          md: 160,
        },
        bgcolor: colors.primarySoft,
        backgroundImage: hasImage
          ? `
            linear-gradient(
              to top,
              rgba(15, 23, 42, 0.32),
              rgba(15, 23, 42, 0.02) 55%
            ),
            url("${getImageKitUrl(property.imageUrl, {
              width: 800,
              quality: 80,
              format: "auto",
            })}")
          `
          : "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
    >
      {!hasImage && (
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            color: "rgba(37, 99, 235, 0.28)",
            fontSize: {
              xs: 36,
              md: 42,
            },
          }}
        >
          <FaHome />
        </Box>
      )}

      <Chip
        label={property.status}
        size="small"
        sx={{
          position: "absolute",
          top: 12,
          left: 12,
          height: 26,
          bgcolor: statusColors.bg,
          color: statusColors.color,
          border: `1px solid ${statusColors.border}`,
          fontSize: 10,
          fontWeight: 900,
          backdropFilter: "blur(8px)",

          "& .MuiChip-label": {
            px: 1.1,
          },
        }}
      />

      {onEdit && (
        <IconButton
          type="button"
          size="small"
          aria-label={`Editar ${property.name}`}
          onClick={(event) => {
            event.stopPropagation();
            onEdit(property);
          }}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 30,
            height: 30,
            bgcolor: "rgba(255,255,255,0.92)",
            border: "1px solid rgba(255,255,255,0.65)",
            color: colors.text,
            boxShadow: "0 4px 12px rgba(15,23,42,0.12)",

            "&:hover": {
              bgcolor: "#ffffff",
              color: colors.primary,
            },
          }}
        >
          <FaEdit size={12} />
        </IconButton>
      )}
    </Box>
  );
}

function PropertyIdentity({ property }: { property: PropertyItem }) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography
        title={property.name}
        sx={{
          color: colors.text,
          fontWeight: 900,
          fontSize: {
            xs: 15,
            sm: 16,
            md: 17,
          },
          lineHeight: 1.25,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {property.name}
      </Typography>

      <Box
        sx={{
          mt: 0.45,
          display: "flex",
          alignItems: "center",
          gap: 0.65,
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: colors.primaryLight,
            fontSize: 11,
            flexShrink: 0,
          }}
        >
          <FaMapMarkerAlt />
        </Box>

        <Typography
          noWrap
          title={property.location}
          sx={{
            minWidth: 0,
            color: colors.muted,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {property.location}
        </Typography>

        <Box
          sx={{
            width: 3,
            height: 3,
            borderRadius: "50%",
            bgcolor: "#cbd5e1",
            flexShrink: 0,
          }}
        />

        <Typography
          noWrap
          title={property.code}
          sx={{
            color: colors.softMuted,
            fontSize: 11,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {property.code}
        </Typography>
      </Box>
    </Box>
  );
}

function PropertyMetadata({ property }: { property: PropertyItem }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(3, minmax(0, 1fr))",
        },
        gap: {
          xs: 0.7,
          sm: 1,
        },
        py: 1.25,
        borderTop: `1px solid ${colors.cardBorder}`,
        borderBottom: `1px solid ${colors.cardBorder}`,
      }}
    >
      <MetadataItem icon={<FaRulerCombined />} label="Medida" value={property.size} />

      <MetadataItem
        icon={<FaBuilding />}
        label="Cliente"
        value={property.ownerName || "Sin registrar"}
      />

      <MetadataItem icon={<FaCalendarAlt />} label="Próximo pago" value={property.dueDate} />
    </Box>
  );
}

function MetadataItem({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.7,
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          width: 26,
          height: 26,
          flexShrink: 0,
          borderRadius: "8px",
          display: "grid",
          placeItems: "center",
          bgcolor: colors.primarySoft,
          color: colors.primaryLight,
          fontSize: 11,
        }}
      >
        {icon}
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          noWrap
          sx={{
            color: colors.softMuted,
            fontSize: 9,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.03em",
          }}
        >
          {label}
        </Typography>

        <Typography
          noWrap
          title={value}
          sx={{
            mt: 0.05,
            color: colors.text,
            fontSize: 11,
            fontWeight: 800,
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

function FinancialSummary({
  property,
  pendingAmount,
}: {
  property: PropertyItem;
  pendingAmount: number;
}) {
  const currency = property.currency ?? "NIO";

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr 1fr",
          sm: "1fr 1fr 1.25fr",
        },
        gap: 1,
      }}
    >
      <FinancialItem label="Precio" value={formatCurrency(property.price, currency)} />

      <FinancialItem label="Abonado" value={formatCurrency(property.paid, currency)} />

      <Box
        sx={{
          gridColumn: {
            xs: "1 / -1",
            sm: "auto",
          },
          minWidth: 0,
          p: 1.15,
          borderRadius: "12px",
          bgcolor: "#f8fafc",
          border: `1px solid ${colors.cardBorder}`,
        }}
      >
        <Typography
          sx={{
            color: colors.softMuted,
            fontSize: 9,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          Pendiente
        </Typography>

        <Typography
          noWrap
          title={formatCurrency(pendingAmount, currency)}
          sx={{
            mt: 0.15,
            color: pendingAmount > 0 ? colors.text : colors.green,
            fontWeight: 950,
            fontSize: {
              xs: 14,
              md: 15,
            },
          }}
        >
          {formatCurrency(pendingAmount, currency)}
        </Typography>
      </Box>
    </Box>
  );
}

function FinancialItem({ label, value }: { label: string; value: string }) {
  return (
    <Box
      sx={{
        minWidth: 0,
        px: 0.25,
        py: 0.5,
      }}
    >
      <Typography
        sx={{
          color: colors.softMuted,
          fontSize: 9,
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
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
          fontWeight: 850,
          fontSize: {
            xs: 12,
            md: 13,
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
    <Box
      sx={{
        mt: "auto",
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          mb: 0.6,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography
          sx={{
            color: colors.softMuted,
            fontSize: 10,
            fontWeight: 800,
          }}
        >
          Avance de pago
        </Typography>

        <Typography
          sx={{
            color: accent,
            fontSize: 12,
            fontWeight: 900,
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
          height: 6,
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
