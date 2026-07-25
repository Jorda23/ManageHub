"use client";

import type { FormEvent, ReactNode } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import { FaTimes } from "react-icons/fa";

type FormModalProps = {
  open: boolean;
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  submitIcon?: ReactNode;
  maxWidth?: number;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const colors = {
  primary: "#064e3b",
  primaryLight: "#0f766e",
  primarySoft: "#dcfce7",
  text: "#0f172a",
  muted: "#64748b",
  border: "#dce5e1",
};

export function FormModal({
  open,
  title,
  description,
  icon,
  children,
  submitLabel = "Guardar",
  cancelLabel = "Cancelar",
  isSubmitting = false,
  submitIcon,
  maxWidth = 600,
  onClose,
  onSubmit,
}: Readonly<FormModalProps>) {
  const handleClose = (): void => {
    if (isSubmitting) {
      return;
    }

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={false}
      scroll="paper"
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            width: {
              xs: "calc(100% - 24px)",
              sm: "calc(100% - 64px)",
            },
            maxWidth: `${maxWidth}px`,

            maxHeight: {
              xs: "calc(100dvh - 24px)",
              sm: "calc(100dvh - 64px)",
            },

            m: {
              xs: 1.5,
              sm: 4,
            },
            borderRadius: {
              xs: "14px",
              sm: "16px",
            },
            overflow: "hidden",
            bgcolor: "#ffffff",
            border: `1px solid ${colors.border}`,
            boxShadow: "0 28px 80px rgba(15, 23, 42, 0.24)",

            display: "flex",
            flexDirection: "column",
          },
        },
        backdrop: {
          sx: {
            bgcolor: "rgba(15, 23, 42, 0.56)",
            backdropFilter: "blur(5px)",
          },
        },
      }}
    >
      <Box
        component="form"
        noValidate
        onSubmit={onSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          maxHeight: "inherit",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "relative",
            flexShrink: 0,
            px: {
              xs: 2,
              sm: 3.5,
            },
            py: {
              xs: 2,
              sm: 2.75,
            },
            bgcolor: "#f8fbfa",
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: 4,
              bgcolor: colors.primary,
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: {
                  xs: 1,
                  sm: 1.5,
                },
                minWidth: 0,
              }}
            >
              {icon && (
                <Box
                  sx={{
                    width: {
                      xs: 38,
                      sm: 42,
                    },
                    height: {
                      xs: 38,
                      sm: 42,
                    },
                    borderRadius: "12px",
                    display: "grid",
                    placeItems: "center",
                    color: colors.primary,
                    bgcolor: colors.primarySoft,
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </Box>
              )}

              <Box sx={{ minWidth: 0 }}>
                <Typography
                  component="h2"
                  sx={{
                    color: colors.text,
                    fontSize: {
                      xs: 16,
                      sm: 20,
                    },
                    fontWeight: 950,
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </Typography>

                {description && (
                  <Typography
                    sx={{
                      mt: 0.4,
                      color: colors.muted,
                      fontSize: {
                        xs: 10.5,
                        sm: 12,
                      },
                      lineHeight: 1.45,
                    }}
                  >
                    {description}
                  </Typography>
                )}
              </Box>
            </Box>

            <IconButton
              type="button"
              aria-label="Cerrar modal"
              onClick={handleClose}
              disabled={isSubmitting}
              size="small"
              sx={{
                width: 34,
                height: 34,
                color: colors.muted,
                bgcolor: "#ffffff",
                border: `1px solid ${colors.border}`,
                flexShrink: 0,

                "&:hover": {
                  color: colors.text,
                  bgcolor: "#f1f5f3",
                },
              }}
            >
              <FaTimes size={13} />
            </IconButton>
          </Box>
        </Box>

        <DialogContent
          dividers={false}
          sx={{
            flex: "1 1 auto",
            minHeight: 0,
            overflowY: "auto",
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",

            px: {
              xs: 2,
              sm: 3.5,
            },
            pt: {
              xs: "20px !important",
              sm: "28px !important",
            },
            pb: {
              xs: 2.5,
              sm: 3,
            },
            bgcolor: "#ffffff",

            "&::-webkit-scrollbar": {
              width: 7,
            },

            "&::-webkit-scrollbar-track": {
              bgcolor: "#f1f5f3",
            },

            "&::-webkit-scrollbar-thumb": {
              bgcolor: "#b8c5c0",
              borderRadius: 999,
            },

            "&::-webkit-scrollbar-thumb:hover": {
              bgcolor: "#94a3b8",
            },
          }}
        >
          {children}
        </DialogContent>

        <DialogActions
          sx={{
            flexShrink: 0,
            px: {
              xs: 2,
              sm: 3.5,
            },
            py: {
              xs: 1.75,
              sm: 2.5,
            },
            gap: 1.25,
            bgcolor: "#f8fbfa",
            borderTop: `1px solid ${colors.border}`,

            flexDirection: {
              xs: "column-reverse",
              sm: "row",
            },

            "& > :not(style) ~ :not(style)": {
              ml: {
                xs: 0,
                sm: 1.25,
              },
            },
          }}
        >
          <Button
            type="button"
            variant="outlined"
            onClick={handleClose}
            disabled={isSubmitting}
            fullWidth
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
              minHeight: 42,
              px: 2.5,
              borderRadius: "9px",
              borderColor: "#cbd5e1",
              color: colors.text,
              fontSize: 12,
              fontWeight: 800,
              textTransform: "none",

              "&:hover": {
                borderColor: colors.muted,
                bgcolor: "#ffffff",
              },
            }}
          >
            {cancelLabel}
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            fullWidth
            startIcon={
              isSubmitting ? (
                <CircularProgress size={15} thickness={5} color="inherit" />
              ) : (
                submitIcon
              )
            }
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
              minHeight: 42,
              px: 2.75,
              borderRadius: "9px",
              bgcolor: colors.primary,
              color: "#ffffff",
              fontSize: 12,
              fontWeight: 900,
              textTransform: "none",
              boxShadow: "0 8px 18px rgba(6, 78, 59, 0.2)",

              "&:hover": {
                bgcolor: colors.primaryLight,
                boxShadow: "0 10px 22px rgba(6, 78, 59, 0.28)",
              },
            }}
          >
            {isSubmitting ? "Guardando..." : submitLabel}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
