"use client";

import { useState, type ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  FaBookOpen,
  FaEye,
  FaEyeSlash,
  FaHeadset,
  FaLock,
  FaShieldAlt,
  FaTractor,
  FaUserAlt,
} from "react-icons/fa";
import { FaArrowRightToBracket, FaCircleCheck } from "react-icons/fa6";

const colors = {
  green: "#164c38",
  greenDark: "#073b2d",
  greenSoft: "#dff7ec",
  white: "#ffffff",
  text: "#101828",
  muted: "#667085",
  border: "#d8e2de",
  inputBg: "#f8faf9",
  orange: "#f59e0b",
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

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
            minHeight: {
              xs: "100dvh",
              md: "100dvh",
            },
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
              Ingresa tus credenciales para acceder al panel de control
              centralizado.
            </Typography>

            <Box
              component="form"
              onSubmit={(event) => {
                event.preventDefault();
              }}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Field
                label="Correo electrónico"
                placeholder="admin@assethub.com"
                icon={<FaUserAlt size={13} />}
                autoComplete="email"
              />

              <Field
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                icon={<FaLock size={13} />}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                endAdornment={
                  <IconButton
                    type="button"
                    size="small"
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                    onClick={() => {
                      setShowPassword((current) => !current);
                    }}
                    sx={{
                      width: 30,
                      height: 30,
                      color: "#7a8883",
                    }}
                  >
                    {showPassword ? (
                      <FaEyeSlash size={13} />
                    ) : (
                      <FaEye size={13} />
                    )}
                  </IconButton>
                }
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      sx={{
                        p: 0.25,
                        mr: 0.6,
                        color: "#aab7b2",

                        "&.Mui-checked": {
                          color: colors.green,
                        },
                      }}
                    />
                  }
                  label="Recordar sesión"
                  sx={{
                    m: 0,

                    "& .MuiFormControlLabel-label": {
                      color: colors.muted,
                      fontSize: 11.5,
                      fontWeight: 500,
                    },
                  }}
                />

                <Button
                  type="button"
                  variant="text"
                  sx={{
                    p: 0,
                    minWidth: 0,
                    color: colors.green,
                    fontSize: 11.5,
                    fontWeight: 700,
                    textTransform: "none",

                    "&:hover": {
                      bgcolor: "transparent",
                      textDecoration: "underline",
                    },
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </Button>
              </Box>

              <Button
                href="/dashboard"
                type="submit"
                fullWidth
                variant="contained"
                endIcon={<FaArrowRightToBracket size={13} />}
                sx={{
                  mt: 0.7,
                  minHeight: 48,
                  borderRadius: "6px",
                  bgcolor: colors.green,
                  color: colors.white,
                  fontSize: 12.5,
                  fontWeight: 900,
                  textTransform: "none",
                  boxShadow: "0 10px 20px rgba(22,76,56,0.25)",

                  "&:hover": {
                    bgcolor: colors.greenDark,
                    boxShadow: "0 13px 26px rgba(22,76,56,0.32)",
                  },
                }}
              >
                Ingresar al panel
              </Button>
            </Box>

            <Divider
              sx={{
                my: 4,
                borderColor: "#edf1ef",
              }}
            />

            <Typography
              sx={{
                color: colors.muted,
                fontSize: 11,
                textAlign: "center",
                mb: 1.3,
              }}
            >
              ¿Necesitas ayuda con tu acceso?
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2.2,
                flexWrap: "wrap",
              }}
            >
              <SupportLink icon={<FaHeadset size={12} />} label="Soporte" />

              <SupportLink
                icon={<FaBookOpen size={12} />}
                label="Guía de usuario"
              />
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

function NarrativePanel() {
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
          Optimiza la gestión de tus terrenos, inventarios y finanzas con una
          plataforma más avanzada para el productor moderno.
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

          <StatusChip
            icon={<FaShieldAlt size={10} />}
            label="Seguridad bancaria"
          />
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

function StatusChip({
  icon,
  label,
  accent,
}: {
  icon: ReactNode;
  label: string;
  accent?: string;
}) {
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

function SupportLink({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <Button
      type="button"
      variant="text"
      startIcon={icon}
      sx={{
        p: 0,
        minWidth: 0,
        color: colors.green,
        fontSize: 11,
        fontWeight: 800,
        textTransform: "none",

        "&:hover": {
          bgcolor: "transparent",
          textDecoration: "underline",
        },
      }}
    >
      {label}
    </Button>
  );
}

type FieldProps = {
  label: string;
  placeholder: string;
  icon: ReactNode;
  type?: string;
  autoComplete?: string;
  endAdornment?: ReactNode;
};

function Field({
  label,
  placeholder,
  icon,
  type = "text",
  autoComplete,
  endAdornment,
}: FieldProps) {
  return (
    <Box>
      <Typography
        component="label"
        sx={{
          display: "block",
          mb: 0.7,
          color: colors.text,
          fontSize: 9.5,
          fontWeight: 950,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </Typography>

      <TextField
        fullWidth
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        variant="outlined"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Box
                  sx={{
                    color: "#7a8883",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {icon}
                </Box>
              </InputAdornment>
            ),
            endAdornment: endAdornment ? (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ) : undefined,
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            minHeight: 48,
            borderRadius: "6px",
            bgcolor: colors.inputBg,
            color: colors.text,
            fontWeight: 650,

            "& fieldset": {
              borderColor: colors.border,
            },

            "&:hover fieldset": {
              borderColor: "#a6b5af",
            },

            "&.Mui-focused": {
              bgcolor: colors.white,
              boxShadow: "0 0 0 3px rgba(22,76,56,0.08)",
            },

            "&.Mui-focused fieldset": {
              borderColor: colors.green,
              borderWidth: 1.2,
            },
          },

          "& .MuiInputBase-input": {
            color: colors.text,
            fontSize: 12.5,
            fontWeight: 650,
            py: 1.2,

            "&::placeholder": {
              color: "#8b9893",
              opacity: 1,
            },
          },
        }}
      />
    </Box>
  );
}
