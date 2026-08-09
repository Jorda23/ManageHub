import type { ReactNode } from "react";

import { Box, Typography } from "@mui/material";

import { FaShieldAlt, FaTractor } from "react-icons/fa";

import { FaCircleCheck } from "react-icons/fa6";

const colors = {
  white: "#ffffff",
  orange: "#f59e0b",
};

export function NarrativePanel() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100dvh",

        p: {
          md: 6,
          lg: 8,
        },

        display: {
          xs: "none",
          md: "flex",
        },

        flexDirection: "column",
        justifyContent: "space-between",

        color: colors.white,

        backgroundImage: `
          linear-gradient(
            rgba(7, 49, 37, 0.34),
            rgba(7, 59, 45, 0.88)
          ),
          url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=90")
        `,

        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          mt: "auto",
          mb: "auto",
          width: "100%",
          maxWidth: 480,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 5,
          }}
        >
          <Box
            sx={{
              width: 54,
              height: 54,
              borderRadius: "8px",

              display: "grid",
              placeItems: "center",

              bgcolor: "rgba(255,255,255,0.16)",

              border: "1px solid rgba(255,255,255,0.17)",

              backdropFilter: "blur(8px)",
            }}
          >
            <FaTractor size={22} />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 950,
                lineHeight: 1,
              }}
            >
              AssetHub
            </Typography>

            <Typography
              sx={{
                mt: 0.45,
                color: "#b7f7da",
                fontSize: 8.5,
                fontWeight: 900,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Business Management Suite
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            maxWidth: 460,

            fontSize: {
              md: 38,
              lg: 46,
            },

            fontWeight: 950,
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
          }}
        >
          Todo tu negocio en un solo lugar.
        </Typography>

        <Typography
          sx={{
            mt: 2,
            maxWidth: 440,

            color: "rgba(255,255,255,0.88)",

            fontSize: {
              md: 13,
              lg: 15,
            },

            fontWeight: 550,
            lineHeight: 1.65,
          }}
        >
          Optimiza la gestión de tus terrenos, inventarios y finanzas con una plataforma más
          avanzada para el productor moderno.
        </Typography>

        <Box
          sx={{
            mt: 3.5,
            display: "flex",
            alignItems: "center",
            gap: 1.2,
            flexWrap: "wrap",
          }}
        >
          <StatusChip
            icon={<FaCircleCheck size={10} />}
            label="Sistema en línea"
            accent={colors.orange}
          />

          <StatusChip icon={<FaShieldAlt size={10} />} label="Seguridad bancaria" />
        </Box>
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,

          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          color: "rgba(255,255,255,0.52)",

          fontSize: 8,
          fontWeight: 700,
          letterSpacing: "0.11em",
          textTransform: "uppercase",
        }}
      >
        <Typography
          sx={{
            fontSize: "inherit",
            fontWeight: "inherit",
            letterSpacing: "inherit",
          }}
        >
          Versión 2.4.0
        </Typography>

        <Typography
          sx={{
            fontSize: "inherit",
            fontWeight: "inherit",
            letterSpacing: "inherit",
          }}
        >
          © {new Date().getFullYear()} AssetHub Digital
        </Typography>
      </Box>
    </Box>
  );
}

type StatusChipProps = {
  icon: ReactNode;
  label: string;
  accent?: string;
};

function StatusChip({ icon, label, accent }: StatusChipProps) {
  return (
    <Box
      sx={{
        px: 1.5,
        py: 0.8,

        display: "flex",
        alignItems: "center",
        gap: 0.7,

        borderRadius: "999px",

        bgcolor: "rgba(255,255,255,0.12)",

        border: "1px solid rgba(255,255,255,0.1)",

        backdropFilter: "blur(8px)",

        color: "rgba(255,255,255,0.82)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          color: accent ?? "#c3e8db",
        }}
      >
        {icon}
      </Box>

      <Typography
        sx={{
          color: "inherit",
          fontSize: 9.5,
          fontWeight: 750,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}
