import type { ReactNode } from "react";

import { Card } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { colors } from "@/theme/sharedColors";

type PropertySectionCardProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

export function PropertySectionCard({ children, sx }: PropertySectionCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        borderRadius: "16px",
        border: `1px solid ${colors.cardBorder}`,
        bgcolor: colors.cardBg,
        overflow: "hidden",
        boxShadow: "0 10px 28px rgba(15, 23, 42, 0.06)",
        minWidth: 0,
        ...sx,
      }}
    >
      {children}
    </Card>
  );
}
