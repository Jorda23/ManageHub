import { Box, Button, Divider, Typography } from "@mui/material";

import { FaMapMarkedAlt, FaMoneyBillWave, FaPlus } from "react-icons/fa";

import { PropertyCard } from "@/components/PropertyCard";
import { EmptyState } from "@/components/EmptyState";

import { colors } from "@/theme/sharedColors";

import { sellButtonBaseSx, sellSecondaryButtonSx } from "@/theme/sellButtonStyles";

import { type PropertyItem } from "../../../shared/data/property.data";

import { PropertySectionCard } from "./PropertySectionCard";

type PropertyTerrainsSectionProps = {
  properties: PropertyItem[];

  onAddProperty: () => void;

  onRegisterPayment?: () => void;

  onEditProperty?: (property: PropertyItem) => void;
};

const scrollAreaSx = {
  maxHeight: {
    xs: 460,
    sm: 500,
    md: 540,
    lg: 580,
  },

  overflowY: "auto",
  overflowX: "hidden",

  scrollbarGutter: "stable",

  pr: {
    xs: 0.75,
    sm: 1,
    md: 1.25,
    lg: 1.5,
  },

  "&::-webkit-scrollbar": {
    width: {
      xs: 5,
      sm: 7,
      md: 8,
    },
  },

  "&::-webkit-scrollbar-track": {
    bgcolor: colors.tableHead,
    borderRadius: 999,
  },

  "&::-webkit-scrollbar-thumb": {
    bgcolor: colors.softMuted,
    borderRadius: 999,
    border: `2px solid ${colors.tableHead}`,
  },

  "&::-webkit-scrollbar-thumb:hover": {
    bgcolor: colors.muted,
  },

  scrollbarWidth: "thin",
  scrollbarColor: `${colors.softMuted} ${colors.tableHead}`,
};

export function PropertyTerrainsSection({
  properties,
  onAddProperty,
  onRegisterPayment,
  onEditProperty,
}: PropertyTerrainsSectionProps) {
  return (
    <PropertySectionCard>
      <Box
        sx={{
          px: {
            xs: 1.25,
            sm: 2,
            md: 3,
          },

          py: {
            xs: 1.25,
            sm: 1.75,
            md: 2.5,
          },

          display: "flex",

          flexDirection: {
            xs: "column",
            sm: "row",
          },

          justifyContent: "space-between",

          alignItems: {
            xs: "stretch",
            sm: "center",
          },

          gap: {
            xs: 1.5,
            sm: 2,
          },

          bgcolor: colors.cardBg,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",

            gap: {
              xs: 0.8,
              sm: 1.2,
            },

            minWidth: 0,
          }}
        >
          <Box
            sx={{
              width: {
                xs: 27,
                sm: 30,
              },

              height: {
                xs: 27,
                sm: 30,
              },

              borderRadius: {
                xs: "8px",
                sm: "10px",
              },

              display: "grid",
              placeItems: "center",

              color: colors.primary,
              bgcolor: colors.primarySoft,

              flexShrink: 0,
            }}
          >
            <FaMapMarkedAlt size={13} />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              noWrap
              sx={{
                color: colors.text,

                fontSize: {
                  xs: 13,
                  sm: 16,
                },

                fontWeight: 950,
                lineHeight: 1.2,
              }}
            >
              Terrenos registrados
            </Typography>

            <Typography
              noWrap
              sx={{
                mt: 0.2,

                color: colors.muted,

                fontSize: {
                  xs: 9.5,
                  sm: 11,
                },

                lineHeight: 1.3,
              }}
            >
              Ubicación, clientes y avance de pago
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",

            flexDirection: {
              xs: "column",
              sm: "row",
            },

            alignItems: {
              xs: "stretch",
              sm: "center",
            },

            gap: 1,

            width: {
              xs: "100%",
              sm: "auto",
            },
          }}
        >
          {onRegisterPayment && (
            <Button
              type="button"
              variant="outlined"
              size="small"
              startIcon={<FaMoneyBillWave size={12} />}
              onClick={onRegisterPayment}
              sx={{
                ...sellSecondaryButtonSx,

                minHeight: 36,

                width: {
                  xs: "100%",
                  sm: "auto",
                },

                px: 1.5,

                borderRadius: "9px",

                color: "#047857",

                bgcolor: "#ecfdf5",

                border: "1px solid #a7f3d0",

                textTransform: "none",

                fontSize: 12,

                fontWeight: 800,

                boxShadow: "none",

                "& .MuiButton-startIcon": {
                  mr: 0.75,
                  color: "#059669",
                },

                "&:hover": {
                  bgcolor: "#d1fae5",
                  color: "#065f46",

                  borderColor: "#6ee7b7",

                  boxShadow: "none",
                },

                "&:active": {
                  bgcolor: "#a7f3d0",
                },

                "&:focus-visible": {
                  outline: "2px solid #10b981",
                  outlineOffset: 2,
                },
              }}
            >
              Registrar abono
            </Button>
          )}

          <Button
            type="button"
            variant="contained"
            size="small"
            startIcon={<FaPlus size={11} />}
            onClick={onAddProperty}
            sx={{
              ...sellButtonBaseSx,

              minHeight: 36,

              width: {
                xs: "100%",
                sm: "auto",
              },

              px: 1.6,

              borderRadius: "9px",

              bgcolor: colors.primary,
              color: colors.cardBg,

              textTransform: "none",

              fontSize: 12,

              fontWeight: 800,

              boxShadow: "0 3px 8px rgba(37, 99, 235, 0.18)",

              "& .MuiButton-startIcon": {
                mr: 0.75,
              },

              "&:hover": {
                bgcolor: colors.primary,

                boxShadow: "0 4px 10px rgba(37, 99, 235, 0.22)",
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
            Nuevo terreno
          </Button>
        </Box>
      </Box>

      <Divider />

      <Box
        sx={{
          p: {
            xs: 1.5,
            sm: 2,
            md: 2.5,
          },
        }}
      >
        {properties.length === 0 ? (
          <EmptyState
            title="No hay terrenos registrados"
            description="Agrega un terreno para comenzar a gestionar tus propiedades."
            icon={<FaMapMarkedAlt size={40} />}
          />
        ) : (
          <Box sx={scrollAreaSx}>
            <Box
              sx={{
                display: "grid",

                gridTemplateColumns: {
                  xs: "minmax(0, 1fr)",
                  md: "repeat(2, minmax(0, 1fr))",
                  lg: "repeat(3, minmax(0, 1fr))",
                },

                gap: {
                  xs: 1.25,
                  sm: 1.5,
                  md: 2,
                },

                width: "100%",
                minWidth: 0,
              }}
            >
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} onEdit={onEditProperty} />
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </PropertySectionCard>
  );
}
