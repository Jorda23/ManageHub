"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { Box, Collapse } from "@mui/material";

import type { SxProps, Theme } from "@mui/material/styles";

import { Toast, type ToastItem, type ToastType } from "./Toast";

type ActiveToast = ToastItem & {
  leaving?: boolean;
};

type ToastContextValue = {
  showSuccess: (message: string) => void;

  showError: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const REMOVE_DELAY_MS = 240;

const AUTO_CLOSE_MS: Record<ToastType, number> = {
  success: 4200,

  error: 5600,
};

export function ToastProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [toasts, setToasts] = useState<ActiveToast[]>([]);

  const nextIdRef = useRef(0);

  const dismiss = useCallback((id: number): void => {
    setToasts((current) =>
      current.map((toast) => (toast.id === id ? { ...toast, leaving: true } : toast)),
    );

    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, REMOVE_DELAY_MS);
  }, []);

  const push = useCallback(
    (type: ToastType, message: string): void => {
      const id = nextIdRef.current;

      nextIdRef.current += 1;

      setToasts((current) => [...current, { id, type, message }]);

      window.setTimeout(() => {
        dismiss(id);
      }, AUTO_CLOSE_MS[type]);
    },
    [dismiss],
  );

  const showSuccess = useCallback((message: string): void => push("success", message), [push]);

  const showError = useCallback((message: string): void => push("error", message), [push]);

  const value = useMemo<ToastContextValue>(
    () => ({ showSuccess, showError }),
    [showSuccess, showError],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <Box aria-live="polite" sx={containerStyles}>
        {toasts.map((toast) => (
          <Collapse
            key={toast.id}
            in={!toast.leaving}
            timeout={240}
            sx={{
              pointerEvents: "none",
            }}
          >
            <Toast toast={toast} onDismiss={dismiss} />
          </Collapse>
        ))}
      </Box>
    </ToastContext.Provider>
  );
}

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast debe usarse dentro de <ToastProvider>.");
  }

  return context;
};

const containerStyles: SxProps<Theme> = {
  position: "fixed",
  zIndex: 1500,
  top: {
    xs: 76,
    sm: 84,
    lg: 24,
  },
  right: {
    xs: 12,
    sm: 20,
    md: 24,
  },
  left: {
    xs: 12,
    sm: "auto",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: 1.25,
  pointerEvents: "none",
};
