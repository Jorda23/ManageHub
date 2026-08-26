"use client";

import { Box, Button, Typography } from "@mui/material";
import { FaBoxOpen, FaPlus } from "react-icons/fa";

import { colors } from "@/theme/sharedColors";

type InventoryHeaderProps = {
  onAddProduct: () => void;
};

export function InventoryHeader({ onAddProduct }: Readonly<InventoryHeaderProps>) {
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 2,
        px: {
          xs: 1.25,
          sm: 2,
          md: 2.5,
        },
        py: {
          xs: 1.25,
          sm: 1.75,
          md: 2,
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
          xs: 1.25,
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
            color: colors.primary,
            bgcolor: colors.primarySoft,
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
            Inventario de ferretería
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

      <Button
        type="button"
        variant="contained"
        size="small"
        startIcon={<FaPlus size={11} />}
        onClick={onAddProduct}
        sx={{
          minHeight: {
            xs: 32,
            sm: 34,
          },
          width: {
            xs: "100%",
            sm: "auto",
          },
          px: {
            xs: 1.2,
            sm: 1.75,
          },
          borderRadius: "8px",
          bgcolor: colors.primary,
          color: colors.cardBg,
          fontSize: {
            xs: 9,
            sm: 10,
          },
          fontWeight: 900,
          textTransform: "none",
          whiteSpace: "nowrap",
          boxShadow: "none",
          "@media (min-width: 400px)": {
            width: "auto",
          },
          "&:hover": {
            bgcolor: colors.primary,
            boxShadow: "none",
          },
        }}
      >
        Nuevo producto
      </Button>
    </Box>
  );
}
