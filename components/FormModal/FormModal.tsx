"use client";

import type { FormEvent, ReactNode } from "react";
import {
  Box,
  Button,
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
}: FormModalProps) {
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
  slotProps={{
    paper: {
      elevation: 0,
      sx: {
        width: {
          xs: "calc(100% - 32px)",
          sm: "calc(100% - 64px)",
        },
        maxWidth: `${maxWidth}px`,
        m: {
          xs: 2,
          sm: 4,
        },
        borderRadius: "16px",
        overflow: "hidden",
        bgcolor: "#ffffff",
        border: `1px solid ${colors.border}`,
        boxShadow: "0 28px 80px rgba(15, 23, 42, 0.24)",
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
      >
        <Box
          sx={{
            position: "relative",
            px: {
              xs: 2.5,
              sm: 3.5,
            },
            py: 2.75,
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
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                minWidth: 0,
              }}
            >
              {icon && (
                <Box
                  sx={{
                    width: 42,
                    height: 42,
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
                      xs: 18,
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
                      mt: 0.5,
                      color: colors.muted,
                      fontSize: 12,
                      lineHeight: 1.5,
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
          sx={{
            px: {
              xs: 2.5,
              sm: 3.5,
            },
            pt: "28px !important",
            pb: 3,
            bgcolor: "#ffffff",
          }}
        >
          {children}
        </DialogContent>

        <DialogActions
          sx={{
            px: {
              xs: 2.5,
              sm: 3.5,
            },
            py: 2.5,
            gap: 1.25,
            bgcolor: "#f8fbfa",
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          <Button
            type="button"
            variant="outlined"
            onClick={handleClose}
            disabled={isSubmitting}
            sx={{
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
            startIcon={submitIcon}
            sx={{
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
            {submitLabel}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}