"use client";

import { Box, Button, TextField, type SxProps, type Theme } from "@mui/material";

import { FaCashRegister, FaPlus, FaSearch } from "react-icons/fa";

import { colors } from "@/theme/sharedColors";

import { sellButtonBaseSx } from "@/theme/sellButtonStyles";

type InventoryHeaderProps = {
  search?: string;

  onSearchChange?: (value: string) => void;

  onAddProduct: () => void;

  onRegisterSale?: () => void;
};

const searchInputSx: SxProps<Theme> = {
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
};

export function InventoryHeader({
  search = "",
  onSearchChange,
  onAddProduct,
  onRegisterSale,
}: Readonly<InventoryHeaderProps>) {
  return (
    <Box
      sx={{
        position: "relative",

        zIndex: 2,

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

        borderBottom: `1px solid ${colors.cardBorder}`,
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
          placeholder="Buscar producto por nombre..."
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
          sx={searchInputSx}
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

          flexShrink: 0,
        }}
      >
        {onRegisterSale && (
          <Button
            type="button"
            variant="outlined"
            size="small"
            startIcon={<FaCashRegister size={11} />}
            onClick={onRegisterSale}
            sx={{
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

              color: "#b45309",

              bgcolor: "#fffbeb",

              border: "1px solid #fde68a",

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

                color: "#d97706",
              },

              "&:hover": {
                bgcolor: "#fef3c7",

                color: "#92400e",

                borderColor: "#fcd34d",

                boxShadow: "none",
              },

              "&:active": {
                bgcolor: "#fde68a",
              },

              "&:focus-visible": {
                outline: "2px solid #f59e0b",

                outlineOffset: 2,
              },
            }}
          >
            Nueva venta
          </Button>
        )}

        <Button
          type="button"
          variant="contained"
          size="small"
          startIcon={<FaPlus size={10} />}
          onClick={onAddProduct}
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
          Nuevo producto
        </Button>
      </Box>
    </Box>
  );
}
