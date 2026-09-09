import dayjs from "dayjs";

import type { BackupExportPayload } from "@/shared/types/api.types";

export function downloadBackupFile(payload: BackupExportPayload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `respaldo-negocio-${dayjs().format("YYYY-MM-DD_HH-mm")}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}