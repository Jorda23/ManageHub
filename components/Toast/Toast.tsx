"use client";

import { Box, IconButton, Typography } from "@mui/material";

import { FaCheckCircle, FaExclamationCircle, FaTimes } from "react-icons/fa";

import { colors } from "@/theme/sharedColors";

export type ToastType = "success" | "error";

export type ToastItem = {
  id: number;
  type: ToastType;
  message: string;
};

type ToastProps = {
  toast: ToastItem;
  onDismiss: (id: number) => void;
};

export function Toast({ toast, onDismiss }: Readonly<ToastProps>) {
  const isSuccess = toast.type === "success";

  const accentColor = isSuccess ? colors.green : colors.danger;

  const softColor = isSuccess ? colors.greenSoft : colors.dangerSoft;

  const borderColor = isSuccess ? colors.greenBorder : colors.dangerBorder;

  return (
    <Box
      role="alert"
      aria-live="assertive"
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "flex-start",
        gap: 1.5,
        width: "100%",
        maxWidth: {
          xs: "100%",
          sm: 380,
        },
        px: 1.75,
        py: 1.4,
        borderRadius: "12px",
        bgcolor: "#ffffff",
        border: `1px solid ${borderColor}`,
        boxShadow: "0 18px 44px rgba(15, 23, 42, 0.16)",
        overflow: "hidden",
        pointerEvents: "auto",
        animation: "toastIn 0.28s ease",

        "@keyframes toastIn": {
          from: {
            opacity: 0,
            transform: "translateY(-10px) scale(0.98)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0) scale(1)",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 5,
          height: "100%",
          bgcolor: accentColor,
        }}
      />

      <Box
        sx={{
          width: 30,
          height: 30,
          mt: 0.1,
          borderRadius: "9px",
          display: "grid",
          placeItems: "center",
          color: accentColor,
          bgcolor: softColor,
          flexShrink: 0,
        }}
      >
        {isSuccess ? <FaCheckCircle size={15} /> : <FaExclamationCircle size={15} />}
      </Box>

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          pt: 0.15,
        }}
      >
        <Typography
          sx={{
            color: colors.text,
            fontSize: 12,
            fontWeight: 800,
            lineHeight: 1.4,
          }}
        >
          {isSuccess ? "Operación exitosa" : "Ocurrió un error"}
        </Typography>

        <Typography
          sx={{
            mt: 0.25,
            color: colors.muted,
            fontSize: 11.5,
            fontWeight: 600,
            lineHeight: 1.45,
          }}
        >
          {toast.message}
        </Typography>
      </Box>

      <IconButton
        aria-label="Cerrar notificación"
        size="small"
        onClick={() => onDismiss(toast.id)}
        sx={{
          width: 26,
          height: 26,
          mt: -0.2,
          mr: -0.5,
          color: colors.muted,

          "&:hover": {
            bgcolor: colors.tableHead,
            color: colors.text,
          },
        }}
      >
        <FaTimes size={11} />
      </IconButton>
    </Box>
  );
}
