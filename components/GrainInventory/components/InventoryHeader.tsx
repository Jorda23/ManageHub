"use client";

import { Box, Button, Typography } from "@mui/material";

import { FaBoxOpen, FaCashRegister, FaPlus } from "react-icons/fa";

import { colors } from "@/theme/sharedColors";

import { sellButtonBaseSx } from "@/theme/sellButtonStyles";

type InventoryHeaderProps = {
  onAddProduct: () => void;
  onRegisterSale?: () => void;
};

export function InventoryHeader({ onAddProduct, onRegisterSale }: Readonly<InventoryHeaderProps>) {
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 2,

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

        borderBottom: `1px solid ${colors.cardBorder}`,

        "@media (min-width: 400px)": {
          flexDirection: "row",
          alignItems: "center",
        },
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

            color: colors.green,
            bgcolor: colors.greenSoft,

            flexShrink: 0,
          }}
        >
          <FaBoxOpen size={13} />
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
            Inventario de granos
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
            Productos, existencias y niveles mínimos
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
        {onRegisterSale && (
          <Button
            type="button"
            variant="outlined"
            size="small"
            startIcon={<FaCashRegister size={12} />}
            onClick={onRegisterSale}
            sx={{
              minHeight: 36,

              width: {
                xs: "100%",
                sm: "auto",
              },

              px: 1.5,

              borderRadius: "9px",

              color: "#b45309",
              bgcolor: "#fffbeb",
              border: "1px solid #fde68a",

              textTransform: "none",
              fontSize: 12,
              fontWeight: 800,

              boxShadow: "none",

              "& .MuiButton-startIcon": {
                mr: 0.75,
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
          startIcon={<FaPlus size={11} />}
          onClick={onAddProduct}
          sx={{
            ...sellButtonBaseSx,

            minHeight: 36,

            width: {
              xs: "100%",
              sm: "auto",
            },

            px: 1.6,

            borderRadius: "9px",

            bgcolor: colors.green,
            color: colors.cardBg,

            textTransform: "none",
            fontSize: 12,
            fontWeight: 800,

            boxShadow: "0 3px 8px rgba(22, 163, 74, 0.18)",

            "& .MuiButton-startIcon": {
              mr: 0.75,
            },

            "&:hover": {
              bgcolor: colors.green,

              boxShadow: "0 4px 10px rgba(22, 163, 74, 0.22)",
            },

            "&:active": {
              transform: "translateY(1px)",
            },

            "&:focus-visible": {
              outline: `2px solid ${colors.green}`,
              outlineOffset: 2,
            },
          }}
        >
          Nuevo ingreso
        </Button>
      </Box>
    </Box>
  );
}
