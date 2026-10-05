import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { FaMapMarkedAlt, FaMoneyBillWave, FaPlus, FaSearch } from "react-icons/fa";

import { PropertyCard } from "@/components/PropertyCard";
import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";

import { colors } from "@/theme/sharedColors";
import { sellButtonBaseSx, sellSecondaryButtonSx } from "@/theme/sellButtonStyles";

import { useInfiniteScroll } from "@/hook/useInfiniteScroll";

import { selectMenuSx } from "@/shared/utils/selectStyles";

import type { PropertyItem } from "../../../shared/data/property.data";

import { PropertySectionCard } from "./PropertySectionCard";

type PropertyTerrainsSectionProps = {
  properties: PropertyItem[];

  search?: string;

  onSearchChange?: (value: string) => void;

  propertyOrder?: "created" | "alphabetical" | "numeric";

  onPropertyOrderChange?: (value: "created" | "alphabetical" | "numeric") => void;

  isInitialLoading?: boolean;

  hasMore?: boolean;

  isLoadingMore?: boolean;

  onLoadMore?: () => void;

  onAddProperty: () => void;

  onRegisterPayment?: () => void;

  onEditProperty?: (property: PropertyItem) => void;

  onDeleteProperty?: (property: PropertyItem) => void;
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

const sortSelectSx = {
  width: {
    xs: "100%",
    sm: 180,
  },

  minWidth: 0,

  minHeight: 40,

  borderRadius: "10px",

  bgcolor: "#ffffff",

  color: colors.text,

  fontSize: 12,

  fontWeight: 700,

  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",

  transition: "border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease",

  "& .MuiSelect-select": {
    display: "flex",

    alignItems: "center",

    minHeight: "unset !important",

    py: 1,

    pl: 1.5,

    pr: "34px !important",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: colors.cardBorder,

    transition: "border-color 160ms ease",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#94a3b8",
  },

  "&.Mui-focused": {
    bgcolor: "#ffffff",

    boxShadow: `0 0 0 3px ${colors.primary}12`,
  },

  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: colors.primary,

    borderWidth: "1px",
  },

  "& .MuiSelect-icon": {
    right: 9,

    color: colors.softMuted,

    fontSize: 20,

    transition: "transform 160ms ease, color 160ms ease",
  },

  "&.Mui-focused .MuiSelect-icon": {
    color: colors.primary,
  },

  "& .MuiSelect-iconOpen": {
    transform: "rotate(180deg)",
  },
};

export function PropertyTerrainsSection({
  properties,

  search = "",

  onSearchChange,

  propertyOrder = "created",

  onPropertyOrderChange,

  isInitialLoading = false,

  hasMore = false,

  isLoadingMore = false,

  onLoadMore,

  onAddProperty,

  onRegisterPayment,

  onEditProperty,

  onDeleteProperty,
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
            <PropertyCard
              key={property.id}
              property={property}
              onEdit={onEditProperty}
              onDelete={onDeleteProperty}
            />
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
          <Box
            sx={{
              display: "flex",

              alignItems: {
                xs: "stretch",
                sm: "center",
              },

              flexDirection: {
                xs: "column",
                sm: "row",
              },

              gap: {
                xs: 0.5,
                sm: 0.75,
              },

              width: {
                xs: "100%",
                sm: "auto",
              },

              minWidth: 0,
            }}
          >
            <Typography
              component="span"
              sx={{
                color: colors.muted,

                fontSize: 12,

                fontWeight: 600,

                lineHeight: 1,

                whiteSpace: "nowrap",
              }}
            >
              Ordenar por:
            </Typography>

            <FormControl
              size="small"
              sx={{
                width: {
                  xs: "100%",
                  sm: 180,
                },

                minWidth: 0,
              }}
            >
              <Select
                value={propertyOrder}
                onChange={(event) => {
                  const value = event.target.value;
                  onPropertyOrderChange?.(
                    value === "alphabetical" || value === "numeric" ? value : "created",
                  );
                }}
                inputProps={{
                  "aria-label": "Ordenar propiedades por",
                }}
                MenuProps={{
                  slotProps: {
                    paper: {
                      sx: {
                        ...selectMenuSx,

                        mt: 0.5,

                        borderRadius: "10px",

                        border: `1px solid ${colors.cardBorder}`,

                        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.10)",

                        "& .MuiMenuItem-root": {
                          minHeight: 38,

                          px: 1.5,

                          mx: 0.5,

                          my: 0.25,

                          borderRadius: "7px",

                          fontSize: 12,

                          fontWeight: 600,

                          color: colors.text,

                          transition: "background-color 140ms ease, color 140ms ease",

                          "&:hover": {
                            bgcolor: "#f8fafc",
                          },

                          "&.Mui-selected": {
                            bgcolor: `${colors.primary}0D`,

                            color: colors.primary,

                            fontWeight: 700,

                            "&:hover": {
                              bgcolor: `${colors.primary}14`,
                            },
                          },
                        },
                      },
                    },
                  },
                }}
                sx={sortSelectSx}
              >
                <MenuItem value="created">Más recientes</MenuItem>

                <MenuItem value="alphabetical">Orden alfabético</MenuItem>

                <MenuItem value="numeric">Orden numérico</MenuItem>
              </Select>
            </FormControl>
          </Box>

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
