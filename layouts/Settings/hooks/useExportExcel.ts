"use client";

import { useMutation } from "@tanstack/react-query";

import { useToast } from "@/components/Toast";

import { downloadExcelFile } from "../services/downloadExcel.util";
import { getBackupExport } from "../services/settings.service";

import type { BackupExportPayload } from "@/shared/types/api.types";

export type ExportExcelStatus = "idle" | "loading" | "success" | "error";

export function useExportExcel() {
  const { showSuccess, showError } = useToast();

  const mutation = useMutation<BackupExportPayload, Error>({
    mutationFn: getBackupExport,
    onSuccess: (payload) => {
      downloadExcelFile(payload);
      showSuccess("Exportación a Excel completada.");
    },
    onError: (error) => {
      showError(error.message || "No se pudo exportar a Excel.");
    },
  });

  const status: ExportExcelStatus = mutation.isIdle
    ? "idle"
    : mutation.isPending
      ? "loading"
      : mutation.isError
        ? "error"
        : "success";

  return {
    exportExcel: mutation.mutate,
    status,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}