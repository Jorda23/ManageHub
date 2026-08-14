"use client";

import { Box, Card, Typography } from "@mui/material";

import { LoginForm } from "./components/LoginForm";
import { NarrativePanel } from "./components/NarrativePanel";

const colors = {
  green: "#164c38",
  white: "#ffffff",
  text: "#101828",
  muted: "#667085",
};

export default function LoginPage() {
  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        minHeight: "100dvh",
        bgcolor: colors.white,

        overflow: {
          xs: "auto",
          md: "hidden",
        },
      }}
    >
      <Card
        elevation={0}
        square
        sx={{
          width: "100%",
          minHeight: "100dvh",

          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(420px, 1fr) minmax(480px, 1fr)",
          },

          overflow: "hidden",

          border: 0,
          borderRadius: 0,
          boxShadow: "none",

          bgcolor: colors.white,
        }}
      >
        <NarrativePanel />

        <Box
          sx={{
            minHeight: "100dvh",
            bgcolor: colors.white,

            px: {
              xs: 3,
              sm: 6,
              md: 8,
              lg: 12,
            },

            py: {
              xs: 5,
              sm: 6,
              md: 6,
            },

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 440,
              mx: "auto",
            }}
          >
            <Typography
              sx={{
                color: colors.green,
                fontSize: 10,
                fontWeight: 950,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                mb: 1.1,
              }}
            >
              Acceso administrativo
            </Typography>

            <Typography
              component="h1"
              sx={{
                color: colors.text,

                fontSize: {
                  xs: 30,
                  sm: 34,
                  md: 38,
                },

                fontWeight: 950,
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
              }}
            >
              Bienvenido de nuevo
            </Typography>

            <Typography
              sx={{
                mt: 1.4,
                mb: 3.5,

                color: colors.muted,

                fontSize: {
                  xs: 13,
                  md: 14,
                },

                fontWeight: 500,
                lineHeight: 1.6,
              }}
            >
              Ingresa tus credenciales para acceder al panel de control centralizado.
            </Typography>

            <LoginForm />
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
