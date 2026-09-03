"use client";

import { Box, Button, Typography } from "@mui/material";
import { FaBoxOpen, FaPlus } from "react-icons/fa";

import { colors } from "@/theme/sharedColors";
import { sellButtonBaseSx, sellSecondaryButtonSx } from "@/theme/sellButtonStyles";

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
        px: { xs: 1.25, sm: 2, md: 3 },
        py: { xs: 1.25, sm: 1.75, md: 2.5 },
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "stretch", sm: "center" },
        gap: { xs: 1.25, sm: 2 },
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
          gap: { xs: 0.8, sm: 1.2 },
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            width: { xs: 27, sm: 30 },
            height: { xs: 27, sm: 30 },
            borderRadius: { xs: "8px", sm: "10px" },
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
              fontSize: { xs: 13, sm: 16 },
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
              fontSize: { xs: 9.5, sm: 11 },
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
          flexDirection: { xs: "column", sm: "row" },
          gap: 1,
          width: { xs: "100%", sm: "auto" },
        }}
      >
        {onRegisterSale && (
          <Button
            type="button"
            variant="outlined"
            size="small"
            onClick={onRegisterSale}
            sx={sellSecondaryButtonSx}
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
            bgcolor: colors.green,
            color: colors.cardBg,
            "&:hover": {
              bgcolor: colors.green,
              boxShadow: "none",
            },
          }}
        >
          Nuevo ingreso
        </Button>
      </Box>
    </Box>
  );
}
