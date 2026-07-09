"use client";

import type { ReactNode } from "react";
import {
  alpha,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  FaArrowRight,
  FaBoxes,
  FaBuilding,
  FaCheckCircle,
  FaLock,
  FaShieldAlt,
  FaTools,
  FaTractor,
  FaUserAlt,
} from "react-icons/fa";

const colors = {
  pageBg: "#071a1d",
  cardBg: "#ffffff",
  text: "#0f172a",
  muted: "#64748b",
  primary: "#123f63",
  primaryDark: "#002b45",
  primarySoft: "#e8f2f7",
  accent: "#19d3d8",
  green: "#5ee3a7",
  border: "#dbe6ed",
};

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "grid",
        placeItems: "center",
        px: {
          xs: 1.5,
          sm: 2,
          md: 4,
        },
        py: {
          xs: 2,
          md: 5,
        },
        bgcolor: colors.pageBg,
        backgroundImage: `
          radial-gradient(circle at 12% 18%, rgba(25, 211, 216, 0.22), transparent 24%),
          radial-gradient(circle at 88% 12%, rgba(94, 227, 167, 0.18), transparent 22%),
          radial-gradient(circle at 50% 100%, rgba(0, 0, 0, 0.34), transparent 30%)
        `,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.14,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 420,
          height: 420,
          borderRadius: "50%",
          bgcolor: "rgba(25,211,216,0.12)",
          filter: "blur(8px)",
          top: -160,
          left: -120,
          display: {
            xs: "none",
            md: "block",
          },
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 1120,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(0, 1.05fr) minmax(360px, 0.85fr)",
          },
          borderRadius: {
            xs: "24px",
            md: "32px",
          },
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.16)",
          boxShadow: "0 34px 100px rgba(0,0,0,0.38)",
          bgcolor: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(18px)",
        }}
      >
        <BrandPanel />

        <Card
          elevation={0}
          sx={{
            borderRadius: 0,
            bgcolor: colors.cardBg,
            p: {
              xs: 2.4,
              sm: 3,
              md: 4,
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Chip
              icon={<FaShieldAlt size={12} />}
              label="Secure access"
              size="small"
              sx={{
                mb: 1.4,
                height: 26,
                borderRadius: "999px",
                bgcolor: colors.primarySoft,
                color: colors.primary,
                fontWeight: 900,
                fontSize: 11,
              }}
            />

            <Typography
              sx={{
                color: colors.text,
                fontSize: {
                  xs: 28,
                  md: 34,
                },
                fontWeight: 950,
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
              }}
            >
              Sign in to Enterprise Hub
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: colors.muted,
                fontSize: 14,
                fontWeight: 600,
                lineHeight: 1.55,
              }}
            >
              Use your business account to continue into the dashboard.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Field
              label="Email"
              placeholder="admin@enterprisehub.com"
              icon={<FaUserAlt />}
            />

            <Field
              label="Password"
              placeholder="Enter your password"
              icon={<FaLock />}
              type="password"
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 1.5,
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#16a34a",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 12.5,
                    color: colors.muted,
                    fontWeight: 700,
                  }}
                >
                  Secure sign-in enabled
                </Typography>
              </Box>

              <Button
                size="small"
                variant="text"
                sx={{
                  minWidth: 0,
                  p: 0,
                  color: colors.primary,
                  fontWeight: 900,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                Forgot password?
              </Button>
            </Box>

            <Button
              href="/dashboard"
              fullWidth
              variant="contained"
              endIcon={<FaArrowRight />}
              sx={{
                mt: 0.5,
                py: 1.45,
                borderRadius: "16px",
                bgcolor: colors.primary,
                color: "#ffffff",
                fontWeight: 950,
                textTransform: "none",
                boxShadow: "0 16px 32px rgba(18,63,99,0.28)",
                "&:hover": {
                  bgcolor: colors.primaryDark,
                  boxShadow: "0 18px 36px rgba(18,63,99,0.34)",
                },
              }}
            >
              Log in to dashboard
            </Button>
          </Box>

          <Divider
            sx={{
              my: 3,
              borderColor: colors.border,
            }}
          />

          <Box
            sx={{
              p: 1.4,
              borderRadius: "16px",
              bgcolor: "#f8fafc",
              border: `1px solid ${colors.border}`,
            }}
          >
            <Typography
              sx={{
                color: colors.muted,
                fontSize: 12.5,
                fontWeight: 650,
                lineHeight: 1.45,
              }}
            >
              No account yet? Contact your administrator for access.
            </Typography>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}

function BrandPanel() {
  return (
    <Box
      sx={{
        display: {
          xs: "none",
          md: "flex",
        },
        minHeight: 620,
        p: 4,
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #002b45 0%, #123f63 52%, #0f766e 100%)",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          right: -90,
          top: -90,
          width: 260,
          height: 260,
          borderRadius: "50%",
          bgcolor: "rgba(255,255,255,0.09)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          left: -100,
          bottom: -120,
          width: 300,
          height: 300,
          borderRadius: "50%",
          bgcolor: "rgba(25,211,216,0.14)",
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 950,
            lineHeight: 1,
          }}
        >
          AssetHub
        </Typography>

        <Typography
          sx={{
            mt: 0.75,
            color: "rgba(255,255,255,0.72)",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          Business Management Suite
        </Typography>
      </Box>

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          sx={{
            fontSize: 42,
            fontWeight: 950,
            lineHeight: 1.05,
            letterSpacing: "-0.05em",
            maxWidth: 420,
          }}
        >
          Manage sales, grains and properties in one place.
        </Typography>

        <Typography
          sx={{
            mt: 1.5,
            color: "rgba(255,255,255,0.74)",
            fontSize: 14,
            fontWeight: 600,
            lineHeight: 1.6,
            maxWidth: 440,
          }}
        >
          Centralized access for ferretería inventory, grain sales and property
          payment tracking.
        </Typography>

        <Box
          sx={{
            mt: 3,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 1.2,
          }}
        >
          <FeaturePill icon={<FaTools />} label="Hardware" />
          <FeaturePill icon={<FaTractor />} label="Grains" />
          <FeaturePill icon={<FaBuilding />} label="Property" />
        </Box>
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 1.2,
        }}
      >
        <MiniStat value="3" label="Modules" />
        <MiniStat value="24/7" label="Access" />
        <MiniStat value="100%" label="Control" />
      </Box>
    </Box>
  );
}

function Field({
  label,
  placeholder,
  icon,
  type = "text",
}: {
  label: string;
  placeholder: string;
  icon: ReactNode;
  type?: string;
}) {
  return (
    <Box>
      <Typography
        sx={{
          mb: 0.8,
          color: colors.text,
          fontSize: 11,
          fontWeight: 950,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        {label}
      </Typography>

      <TextField
        fullWidth
        type={type}
        placeholder={placeholder}
        variant="outlined"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Box
                  sx={{
                    color: colors.muted,
                    display: "flex",
                    alignItems: "center",
                    fontSize: 14,
                  }}
                >
                  {icon}
                </Box>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "16px",
            bgcolor: "#f8fafc",
            fontWeight: 700,
            color: colors.text,
            "& fieldset": {
              borderColor: colors.border,
            },
            "&:hover fieldset": {
              borderColor: "#94a3b8",
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.primary,
              borderWidth: 1.5,
            },
          },
          "& .MuiInputBase-input": {
            color: colors.text,
            fontSize: 14,
            fontWeight: 700,
            py: 1.45,
            "&::placeholder": {
              color: colors.muted,
              opacity: 0.72,
            },
          },
        }}
      />
    </Box>
  );
}

function FeaturePill({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <Box
      sx={{
        px: 1.2,
        py: 1,
        borderRadius: "16px",
        bgcolor: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.14)",
        display: "flex",
        alignItems: "center",
        gap: 0.8,
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          color: colors.green,
          display: "flex",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      <Typography
        noWrap
        sx={{
          color: "#ffffff",
          fontSize: 11,
          fontWeight: 900,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <Box
      sx={{
        p: 1.4,
        borderRadius: "18px",
        bgcolor: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.14)",
      }}
    >
      <Typography
        sx={{
          color: "#ffffff",
          fontSize: 19,
          fontWeight: 950,
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>

      <Typography
        sx={{
          mt: 0.5,
          color: "rgba(255,255,255,0.72)",
          fontSize: 10,
          fontWeight: 800,
          textTransform: "uppercase",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}
