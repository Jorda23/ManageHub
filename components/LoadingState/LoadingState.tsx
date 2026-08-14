import { Box, CircularProgress, Typography } from "@mui/material";

type LoadingStateProps = {
  message?: string;
  minHeight?: number | string;
};

export function LoadingState({
  message = "Cargando información...",
  minHeight = 260,
}: LoadingStateProps) {
  return (
    <Box
      role="status"
      aria-live="polite"
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        px: 2,
        py: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

          gap: 2,
        }}
      >
        <Box
          sx={{
            position: "relative",

            width: 64,
            height: 64,

            display: "grid",
            placeItems: "center",

            borderRadius: "20px",

            bgcolor: "background.paper",

            border: "1px solid",
            borderColor: "divider",

            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
          }}
        >
          <Box
            sx={{
              position: "absolute",

              width: 44,
              height: 44,

              borderRadius: "50%",

              bgcolor: "primary.main",

              opacity: 0.08,

              animation: "loadingPulse 1.8s ease-in-out infinite",

              "@keyframes loadingPulse": {
                "0%, 100%": {
                  transform: "scale(0.85)",
                  opacity: 0.05,
                },

                "50%": {
                  transform: "scale(1.15)",
                  opacity: 0.12,
                },
              },
            }}
          />

          <CircularProgress
            size={28}
            thickness={4}
            sx={{
              position: "relative",
              zIndex: 1,
            }}
          />
        </Box>

        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 13,
                sm: 14,
              },

              fontWeight: 700,

              color: "text.primary",
            }}
          >
            {message}
          </Typography>

          <Typography
            sx={{
              mt: 0.5,

              fontSize: {
                xs: 10.5,
                sm: 11.5,
              },

              color: "text.secondary",
            }}
          >
            Esto puede tomar unos segundos
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
