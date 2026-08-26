import type { ReactNode } from "react";

import { Box, Button, Typography } from "@mui/material";
import { FaPlusCircle } from "react-icons/fa";
import { colors } from "@/theme/sharedColors";

type PropertySectionHeaderProps = {
  icon: ReactNode;
  title: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function PropertySectionHeader({
  icon,
  title,
  actionLabel,
  onAction,
}: PropertySectionHeaderProps) {
  const hasAction = Boolean(actionLabel);

  return (
    <Box
      sx={{
        px: {
          xs: 1.8,
          md: 2.5,
        },
        py: 2,
        bgcolor: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1.2,
          alignItems: "center",
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "16px",
            display: "grid",
            placeItems: "center",
            color: colors.primaryLight,
            bgcolor: colors.primarySoft,
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>

        <Typography
          sx={{
            fontWeight: 950,
            fontSize: {
              xs: 16,
              md: 18,
            },
            color: colors.text,
            overflowWrap: "anywhere",
          }}
        >
          {title}
        </Typography>
      </Box>

      {hasAction ? (
        <Button
          type="button"
          size="small"
          variant={onAction ? "contained" : "text"}
          startIcon={onAction ? <FaPlusCircle size={13} /> : undefined}
          onClick={onAction}
          sx={{
            borderRadius: 2.25,
            px: onAction ? 1.6 : 1,
            fontSize: 11,
            fontWeight: 950,
            color: onAction ? "#ffffff" : colors.primary,
            bgcolor: onAction ? colors.primary : "transparent",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            whiteSpace: "nowrap",
            boxShadow: onAction ? "0 8px 18px rgba(37, 99, 235, 0.2)" : "none",
            "&:hover": {
              bgcolor: onAction ? "#172554" : colors.primarySoft,
            },
          }}
        >
          {actionLabel}
        </Button>
      ) : null}
    </Box>
  );
}
