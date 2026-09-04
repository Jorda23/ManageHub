import { Box, Button, CircularProgress, Divider, TextField } from "@mui/material";

import { FaMapMarkedAlt, FaMoneyBillWave, FaPlus, FaSearch } from "react-icons/fa";

import { PropertyCard } from "@/components/PropertyCard";
import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";

import { colors } from "@/theme/sharedColors";

import { sellButtonBaseSx, sellSecondaryButtonSx } from "@/theme/sellButtonStyles";

import { useInfiniteScroll } from "@/hook/useInfiniteScroll";

import { type PropertyItem } from "../../../shared/data/property.data";

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

const scrollAreaSx = {
  maxHeight: {
    xs: 460,
    sm: 500,
    md: 540,
    lg: 600,
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
  search = "",
  onSearchChange,
  isInitialLoading = false,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
  onAddProperty,
  onRegisterPayment,
  onEditProperty,
}: PropertyTerrainsSectionProps) {
  const { rootRef, sentinelRef } = useInfiniteScroll<HTMLDivElement>({
    hasMore,
    isLoadingMore,
    onLoadMore: () => {
      onLoadMore?.();
    },
  });

  return (
    <PropertySectionCard>
      <Box
        sx={{
          px: {
            xs: 1,
            sm: 2,
            md: 3,
          },

          py: {
            xs: 1,
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
            xs: 1,
            sm: 2,
          },

          bgcolor: colors.cardBg,
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: 0,

            width: {
              xs: "100%",
              sm: "auto",
            },

            maxWidth: {
              sm: 420,
            },
          }}
        >
          <TextField
            size="small"
            placeholder="Buscar terreno por nombre o cliente..."
            value={search}
            onChange={(event) => onSearchChange?.(event.target.value)}
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <Box
                    component="span"
                    sx={{
                      mr: {
                        xs: 0.75,
                        sm: 1,
                      },

                      display: "grid",
                      placeItems: "center",

                      color: colors.softMuted,

                      fontSize: {
                        xs: 12,
                        sm: 13,
                      },
                    }}
                  >
                    <FaSearch size={12} />
                  </Box>
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                minHeight: {
                  xs: 36,
                  sm: 40,
                },

                borderRadius: {
                  xs: "8px",
                  sm: "10px",
                },

                bgcolor: "#fbfdfc",

                fontSize: {
                  xs: 12,
                  sm: 13,
                },

                fontWeight: 600,
                color: colors.text,

                "& fieldset": {
                  borderColor: colors.cardBorder,
                },

                "&:hover fieldset": {
                  borderColor: "#94a3b8",
                },

                "&.Mui-focused fieldset": {
                  borderColor: colors.primaryLight,
                  borderWidth: 1.5,
                },
              },

              "& .MuiInputBase-input": {
                px: {
                  xs: 0.75,
                  sm: 1.25,
                },

                py: {
                  xs: 0.75,
                  sm: 1,
                },
              },

              "& .MuiInputBase-input::placeholder": {
                color: colors.softMuted,
                opacity: 1,
              },
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",

            flexDirection: "row",

            alignItems: "center",

            gap: {
              xs: 0.75,
              sm: 1,
            },

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
              startIcon={<FaMoneyBillWave size={11} />}
              onClick={onRegisterPayment}
              sx={{
                ...sellSecondaryButtonSx,

                flex: {
                  xs: 1,
                  sm: "initial",
                },

                minWidth: 0,

                minHeight: {
                  xs: 34,
                  sm: 36,
                },

                width: {
                  xs: 0,
                  sm: "auto",
                },

                px: {
                  xs: 0.75,
                  sm: 1.5,
                },

                borderRadius: {
                  xs: "8px",
                  sm: "9px",
                },

                color: "#047857",

                bgcolor: "#ecfdf5",

                border: "1px solid #a7f3d0",

                textTransform: "none",

                fontSize: {
                  xs: 11,
                  sm: 12,
                },

                fontWeight: 800,

                whiteSpace: "nowrap",

                boxShadow: "none",

                "& .MuiButton-startIcon": {
                  mr: {
                    xs: 0.5,
                    sm: 0.75,
                  },

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
            startIcon={<FaPlus size={10} />}
            onClick={onAddProperty}
            sx={{
              ...sellButtonBaseSx,

              flex: {
                xs: 1,
                sm: "initial",
              },

              minWidth: 0,

              minHeight: {
                xs: 34,
                sm: 36,
              },

              width: {
                xs: 0,
                sm: "auto",
              },

              px: {
                xs: 0.75,
                sm: 1.6,
              },

              borderRadius: {
                xs: "8px",
                sm: "9px",
              },

              bgcolor: colors.primary,
              color: colors.cardBg,

              textTransform: "none",

              fontSize: {
                xs: 11,
                sm: 12,
              },

              fontWeight: 800,

              whiteSpace: "nowrap",

              boxShadow: "0 3px 8px rgba(37, 99, 235, 0.18)",

              "& .MuiButton-startIcon": {
                mr: {
                  xs: 0.5,
                  sm: 0.75,
                },
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
        {isInitialLoading && properties.length === 0 ? (
          <LoadingState message="Cargando terrenos..." />
        ) : properties.length === 0 ? (
          search ? (
            <EmptyState
              title="Sin resultados"
              description={`No se encontraron terrenos que coincidan con "${search}".`}
              icon={<FaMapMarkedAlt size={40} />}
            />
          ) : (
            <EmptyState
              title="No hay terrenos registrados"
              description="Agrega un terreno para comenzar a gestionar tus propiedades."
              icon={<FaMapMarkedAlt size={40} />}
            />
          )
        ) : (
          <Box ref={rootRef} sx={scrollAreaSx}>
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

            {isLoadingMore ? (
              <Box
                sx={{
                  pt: 2,
                  display: "flex",
                  justifyContent: "center",
                  color: colors.softMuted,
                }}
              >
                <CircularProgress size={22} thickness={5} />
              </Box>
            ) : null}

            {hasMore ? (
              <Box
                ref={sentinelRef}
                aria-hidden="true"
                sx={{
                  height: 1,
                }}
              />
            ) : null}
          </Box>
        )}
      </Box>
    </PropertySectionCard>
  );
}
