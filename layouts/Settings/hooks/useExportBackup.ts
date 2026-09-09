"use client";

import { useMutation } from "@tanstack/react-query";

import { useToast } from "@/components/Toast";

import { downloadBackupFile } from "../services/downloadBackup.util";
import { getBackupExport } from "../services/settings.service";

import type { BackupExportPayload } from "@/shared/types/api.types";

export type ExportBackupStatus = "idle" | "loading" | "success" | "error";

export function useExportBackup() {
  const { showSuccess, showError } = useToast();

  const mutation = useMutation<BackupExportPayload, Error>({
    mutationFn: getBackupExport,
    onSuccess: (payload) => {
      downloadBackupFile(payload);
      showSuccess("Respaldo generado correctamente.");
    },
    onError: (error) => {
      showError(error.message || "No se pudo exportar los datos.");
    },
  });

  const status: ExportBackupStatus = mutation.isIdle
    ? "idle"
    : mutation.isPending
      ? "loading"
      : mutation.isError
        ? "error"
        : "success";

  return {
    exportBackup: mutation.mutate,
    status,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}