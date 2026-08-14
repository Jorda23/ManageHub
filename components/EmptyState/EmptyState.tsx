import type { ReactNode } from "react";

import { Box, Typography } from "@mui/material";
import { FaBoxOpen } from "react-icons/fa";
import { sharedColors } from "@/theme/sharedColors";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

export function EmptyState({
  title,
  description,
  icon = <FaBoxOpen size={20} />,
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        py: {
          xs: 4,
          sm: 5,
          md: 6,
        },
        px: {
          xs: 1.5,
          sm: 2,
        },
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: {
            xs: 44,
            sm: 48,
            md: 52,
          },
          height: {
            xs: 44,
            sm: 48,
            md: 52,
          },
          mx: "auto",
          mb: 1.5,
          borderRadius: {
            xs: "13px",
            sm: "16px",
          },
          display: "grid",
          placeItems: "center",
          bgcolor: sharedColors.cardBg,
          color: sharedColors.muted,
        }}
      >
        {icon}
      </Box>

      <Typography
        sx={{
          color: sharedColors.text,
          fontSize: {
            xs: 13,
            sm: 14,
          },
          fontWeight: 900,
        }}
      >
        {title}
      </Typography>

      {description && (
        <Typography
          sx={{
            mt: 0.5,
            color: sharedColors.muted,
            fontSize: {
              xs: 10.5,
              sm: 12,
            },
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
}
