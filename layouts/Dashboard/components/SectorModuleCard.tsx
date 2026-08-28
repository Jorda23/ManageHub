"use client";

import Link from "next/link";
import { Box, Card, Typography } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";

import type { ModuleCard as ModuleCardData } from "@/shared/types/dashboard.types";
import { colors } from "@/theme/sharedColors";
import { cardStyles } from "./dashboard.styles";
import { IconBadge } from "./IconBadge";

export function SectorModuleCard({ eyebrow, title, description, image, href, stats }: ModuleCardData) {
  return (
    <Card elevation={0} sx={{ ...cardStyles, display: "flex", flexDirection: "column", overflow: "hidden", p: 0 }}>
      <Box
        sx={{
          height: { xs: 150, sm: 168 },
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.04), rgba(0,0,0,0.4)), url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 14,
            top: 14,
            height: 23,
            display: "flex",
            alignItems: "center",
            px: 1.25,
            borderRadius: "16px",
            bgcolor: "rgba(255,255,255,0.9)",
            color: colors.primary,
            fontSize: 9.5,
            fontWeight: 950,
            backdropFilter: "blur(8px)",
          }}
        >
          {eyebrow}
        </Box>
      </Box>

      <Box sx={{ p: 2, display: "flex", flexDirection: "column", flex: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, mb: 1 }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ color: colors.text, fontSize: 17, fontWeight: 950 }}>
              {title}
            </Typography>
            <Typography
              sx={{
                mt: 0.65,
                color: colors.muted,
                fontSize: 12,
                fontWeight: 600,
                lineHeight: 1.5,
              }}
            >
              {description}
            </Typography>
          </Box>

          <Link href={href} style={{ color: colors.primary }}>
            <IconBadge accent={colors.primary} compact>
              <FaArrowRight size={12} />
            </IconBadge>
          </Link>
        </Box>

        {stats && stats.length > 0 && (
          <Box
            sx={{
              mt: "auto",
              pt: 1.5,
              display: "grid",
              gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))`,
              gap: 1,
            }}
          >
            {stats.map((stat) => (
              <Box
                key={stat.label}
                sx={{
                  p: 1,
                  borderRadius: "8px",
                  bgcolor: colors.tableHead,
                  border: `1px solid ${colors.cardBorder}`,
                }}
              >
                <Typography
                  sx={{ color: colors.muted, fontSize: 8.5, fontWeight: 800, textTransform: "uppercase" }}
                >
                  {stat.label}
                </Typography>
                <Typography sx={{ mt: 0.3, color: colors.text, fontSize: 13, fontWeight: 950 }}>
                  {stat.value}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Card>
  );
}
