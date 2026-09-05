import { Box, Button, CircularProgress, Divider, InputAdornment, TextField } from "@mui/material";

import { FaMapMarkedAlt, FaMoneyBillWave, FaPlus, FaSearch } from "react-icons/fa";

import { PropertyCard } from "@/components/PropertyCard";
import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";

import { colors } from "@/theme/sharedColors";
import { sellButtonBaseSx, sellSecondaryButtonSx } from "@/theme/sellButtonStyles";

import { useInfiniteScroll } from "@/hook/useInfiniteScroll";

import type { PropertyItem } from "../../../shared/data/property.data";

import { PropertySectionCard } from "./PropertySectionCard";

type PropertyTerrainsSectionProps = {
  properties: PropertyItem[];
  search?: string;
  onSearchChange?: (value: string) => void;
  isInitialLoading?: boolean;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
  onAddProperty: () => void;
  onRegisterPayment?: () => void;
  onEditProperty?: (property: PropertyItem) => void;
};

const actionButtonSx = {
  minHeight: 38,

  px: {
    xs: 1.25,
    sm: 1.75,
  },

  borderRadius: "10px",

  fontSize: {
    xs: 11,
    sm: 12,
  },

  fontWeight: 800,
  textTransform: "none",
  whiteSpace: "nowrap",
};

const scrollAreaSx = {
  overflowY: {
    xs: "auto",
    md: "visible",
  },

  overflowX: "hidden",

  pr: {
    xs: 0.5,
    md: 0,
  },

  "&::-webkit-scrollbar": {
    width: 6,
  },

  "&::-webkit-scrollbar-track": {
    bgcolor: "transparent",
  },

  "&::-webkit-scrollbar-thumb": {
    bgcolor: "#cbd5e1",
    borderRadius: 999,
  },

  scrollbarWidth: "thin",
};

export function PropertyTerrainsSection({
  properties,
  search = "",
  onSearchChange,
  isInitialLoading = false,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
  onAddProperty,
  onRegisterPayment,
  onEditProperty,
}: Readonly<PropertyTerrainsSectionProps>) {
  const { rootRef, sentinelRef } = useInfiniteScroll<HTMLDivElement>({
    hasMore,
    isLoadingMore,

    onLoadMore: () => {
      onLoadMore?.();
    },
  });

  const hasProperties = properties.length > 0;

  const renderPropertiesContent = () => {
    if (isInitialLoading && !hasProperties) {
      return <LoadingState message="Cargando terrenos..." />;
    }

    if (!hasProperties && search) {
      return (
        <EmptyState
          title="Sin resultados"
          description={`No se encontraron terrenos que coincidan con "${search}".`}
          icon={<FaMapMarkedAlt size={36} />}
        />
      );
    }

    if (!hasProperties) {
      return (
        <EmptyState
          title="No hay terrenos registrados"
          description="Agrega un terreno para comenzar a gestionar tus propiedades."
          icon={<FaMapMarkedAlt size={36} />}
        />
      );
    }

    return (
      <Box ref={rootRef} sx={scrollAreaSx}>
        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              md: "repeat(3, minmax(0, 1fr))",
              xl: "repeat(4, minmax(0, 1fr))",
            },

            gap: {
              xs: 1.25,
              sm: 1.5,
              md: 1.75,
            },

            width: "100%",
            minWidth: 0,
          }}
        >
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} onEdit={onEditProperty} />
          ))}
        </Box>

        {isLoadingMore && (
          <Box
            sx={{
              py: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress
              size={20}
              thickness={4}
              sx={{
                color: colors.primary,
              }}
            />
          </Box>
        )}

        {hasMore && (
          <Box
            ref={sentinelRef}
            aria-hidden="true"
            sx={{
              height: 1,
            }}
          />
        )}
      </Box>
    );
  };

  return (
    <PropertySectionCard>
      <Box
        sx={{
          px: {
            xs: 1.5,
            sm: 2,
            md: 2.5,
          },

          py: {
            xs: 1.25,
            sm: 1.5,
          },

          display: "flex",

          flexDirection: {
            xs: "column",
            md: "row",
          },

          justifyContent: "space-between",

          alignItems: {
            xs: "stretch",
            md: "center",
          },

          gap: 1.25,

          bgcolor: colors.cardBg,
        }}
      >
        <TextField
          size="small"
          placeholder="Buscar por terreno o cliente..."
          value={search}
          onChange={(event) => {
            onSearchChange?.(event.target.value);
          }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Box
                    sx={{
                      display: "grid",
                      placeItems: "center",
                      color: colors.softMuted,
                      fontSize: 12,
                    }}
                  >
                    <FaSearch />
                  </Box>
                </InputAdornment>
              ),
            },
          }}
          sx={{
            width: "100%",

            maxWidth: {
              md: 420,
            },

            "& .MuiOutlinedInput-root": {
              minHeight: 40,
              borderRadius: "10px",

              bgcolor: "#ffffff",

              fontSize: 12,
              fontWeight: 600,
              color: colors.text,

              "& fieldset": {
                borderColor: colors.cardBorder,
              },

              "&:hover fieldset": {
                borderColor: "#94a3b8",
              },

              "&.Mui-focused": {
                bgcolor: "#ffffff",
              },

              "&.Mui-focused fieldset": {
                borderColor: colors.primaryLight,
                borderWidth: 1.5,
              },
            },

            "& .MuiInputBase-input::placeholder": {
              color: colors.softMuted,
              opacity: 1,
            },
          }}
        />

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
            justifyContent: {
              xs: "stretch",
              md: "flex-end",
            },
            gap: {
              xs: 0.75,
              sm: 1,
            },
            width: {
              xs: "100%",
              md: "auto",
            },
          }}
        >
          {onRegisterPayment && (
            <Button
              type="button"
              variant="outlined"
              size="small"
              startIcon={<FaMoneyBillWave size={11} />}
              onClick={onRegisterPayment}
              sx={{
                ...sellSecondaryButtonSx,
                ...actionButtonSx,

                flex: {
                  xs: 1,
                  sm: "initial",
                },

                color: "#047857",
                bgcolor: "#f0fdf4",
                borderColor: "#bbf7d0",

                boxShadow: "none",

                "& .MuiButton-startIcon": {
                  mr: 0.7,
                  color: "#059669",
                },

                "&:hover": {
                  bgcolor: "#dcfce7",
                  borderColor: "#86efac",
                  color: "#065f46",
                  boxShadow: "none",
                },

                "&:active": {
                  bgcolor: "#bbf7d0",
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
            startIcon={<FaPlus size={10} />}
            onClick={onAddProperty}
            sx={{
              ...sellButtonBaseSx,
              ...actionButtonSx,

              flex: {
                xs: 1,
                sm: "initial",
              },

              bgcolor: colors.primary,
              color: "#ffffff",

              boxShadow: "0 4px 10px rgba(37, 99, 235, 0.16)",

              "& .MuiButton-startIcon": {
                mr: 0.7,
              },

              "&:hover": {
                bgcolor: colors.primary,
                boxShadow: "0 6px 14px rgba(37, 99, 235, 0.20)",
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

      <Divider
        sx={{
          borderColor: colors.cardBorder,
        }}
      />

      <Box
        sx={{
          p: {
            xs: 1.25,
            sm: 1.75,
            md: 2,
          },
        }}
      >
        {renderPropertiesContent()}
      </Box>
    </PropertySectionCard>
  );
}
