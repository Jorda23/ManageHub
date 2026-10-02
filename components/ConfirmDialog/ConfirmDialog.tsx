"use client";

import type { ReactNode } from "react";

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

import { FaExclamationTriangle, FaTimes } from "react-icons/fa";

import { colors } from "@/theme/sharedColors";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  icon?: ReactNode;
  isPending?: boolean;
  isDanger?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  icon,
  isPending = false,
  isDanger = true,
  onConfirm,
  onClose,
}: Readonly<ConfirmDialogProps>) {
  const handleClose = (): void => {
    if (isPending) {
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
            width: { xs: "calc(100% - 24px)", sm: "calc(100% - 64px)" },
            maxWidth: 440,

            maxHeight: {
              xs: "calc(100dvh - 24px)",
              sm: "calc(100dvh - 64px)",
            },

            m: {
              xs: 1.5,
              sm: 4,
            },
            borderRadius: "16px",
            overflow: "hidden",
            bgcolor: "#ffffff",
            border: `1px solid ${colors.cardBorder}`,
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
        sx={{
          position: "relative",
          flexShrink: 0,
          px: {
            xs: 2,
            sm: 3,
          },
          py: {
            xs: 2,
            sm: 2.5,
          },
          display: "flex",
          alignItems: "flex-start",
          gap: 1.5,
          bgcolor: "#f8fbfa",
          borderBottom: `1px solid ${colors.cardBorder}`,
        }}
      >
        <Box
          sx={{
            width: 38,
            height: 38,
            flexShrink: 0,
            borderRadius: "11px",
            display: "grid",
            placeItems: "center",
            color: isDanger ? colors.danger : colors.primary,
            bgcolor: isDanger ? colors.dangerSoft : colors.primarySoft,
            border: `1px solid ${isDanger ? colors.dangerBorder : colors.primaryBorder}`,
          }}
        >
          {icon ?? <FaExclamationTriangle />}
        </Box>

        <Box sx={{ minWidth: 0, flex: 1, pt: 0.2 }}>
          <Typography
            sx={{
              color: colors.text,
              fontSize: 14.5,
              fontWeight: 900,
              lineHeight: 1.3,
            }}
          >
            {title}
          </Typography>
        </Box>

        <IconButton
          type="button"
          aria-label="Cerrar"
          size="small"
          disabled={isPending}
          onClick={handleClose}
          sx={{
            width: 28,
            height: 28,
            flexShrink: 0,
            color: colors.muted,

            "&:hover": {
              bgcolor: colors.tableHead,
              color: colors.text,
            },
          }}
        >
          <FaTimes size={12} />
        </IconButton>
      </Box>

      <DialogContent
        sx={{
          px: {
            xs: 2,
            sm: 3,
          },
          py: {
            xs: 2,
            sm: 2.5,
          },
        }}
      >
        <Typography
          sx={{
            color: colors.muted,
            fontSize: 13,
            fontWeight: 600,
            lineHeight: 1.55,
          }}
        >
          {description}
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          flexShrink: 0,
          px: {
            xs: 2,
            sm: 3,
          },
          py: {
            xs: 1.75,
            sm: 2,
          },
          gap: 1.25,
          bgcolor: "#f8fbfa",
          borderTop: `1px solid ${colors.cardBorder}`,

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
          disabled={isPending}
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
          type="button"
          variant="contained"
          onClick={onConfirm}
          disabled={isPending}
          fullWidth
          startIcon={
            isPending ? <CircularProgress size={15} thickness={5} color="inherit" /> : undefined
          }
          sx={{
            width: {
              xs: "100%",
              sm: "auto",
            },
            minHeight: 42,
            px: 2.75,
            borderRadius: "9px",
            bgcolor: isDanger ? colors.danger : colors.primary,
            color: "#ffffff",
            fontSize: 12,
            fontWeight: 900,
            textTransform: "none",
            boxShadow: isDanger
              ? "0 8px 18px rgba(220, 38, 38, 0.2)"
              : "0 8px 18px rgba(37, 99, 235, 0.22)",

            "&:hover": {
              bgcolor: isDanger ? "#b91c1c" : colors.primaryLight,
            },
          }}
        >
          {isPending ? "Eliminando..." : confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
