import { Box, Chip, Paper, Typography } from "@mui/material";
import { FaBuilding } from "react-icons/fa";

type PropertyHeroHeaderProps = {
  badge: string;
  title: string;
  subtitle: string;
};

export function PropertyHeroHeader({ badge, title, subtitle }: Readonly<PropertyHeroHeaderProps>) {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        px: {
          xs: 1.75,
          sm: 2.25,
          md: 2.75,
        },
        py: {
          xs: 1.5,
          sm: 1.75,
          md: 2,
        },
        borderRadius: {
          xs: "14px",
          md: "16px",
        },
        border: "1px solid rgba(191, 219, 254, 0.4)",
        boxShadow: "0 10px 24px rgba(30, 58, 138, 0.13)",
        color: "white",
        background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 58%, #0f766e 100%)",
        minHeight: {
          xs: 104,
          sm: 108,
          md: 112,
        },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          minWidth: 0,
          pr: {
            xs: 5,
            sm: 10,
            md: 16,
          },
        }}
      >
        <Chip
          label={badge}
          size="small"
          sx={{
            height: 22,
            mb: 0.75,
            bgcolor: "rgba(255,255,255,0.14)",
            color: "#dbeafe",
            fontWeight: 800,
            fontSize: 10,
            "& .MuiChip-label": {
              px: 1,
            },
          }}
        />

        <Typography
          sx={{
            fontSize: {
              xs: 20,
              sm: 23,
              md: 28,
            },
            lineHeight: 1.12,
            fontWeight: 900,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            maxWidth: 720,
            color: "rgba(219, 234, 254, 0.92)",
            fontSize: {
              xs: 11.5,
              sm: 12.5,
              md: 13,
            },
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: {
              xs: 2,
              sm: 2,
            },
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          right: {
            xs: -18,
            sm: 12,
            md: 32,
          },
          bottom: {
            xs: -18,
            sm: -26,
            md: -30,
          },
          color: "rgba(255,255,255,0.1)",
          fontSize: {
            xs: 78,
            sm: 100,
            md: 118,
          },
          lineHeight: 0,
          transform: "rotate(-7deg)",
          pointerEvents: "none",
        }}
      >
        <FaBuilding />
      </Box>
    </Paper>
  );
}
