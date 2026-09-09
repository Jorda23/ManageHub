import { getToken } from "@/utils/auth";

import type { BackupExportPayload, SystemInfo } from "@/shared/types/api.types";

const SETTINGS_API_BASE = "/api/settings";
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

async function fetchJson<T>(baseUrl: string, path: string): Promise<T> {
  const token = getToken();

  const response = await fetch(`${baseUrl}${path}`, {
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = (body as { message?: string } | null)?.message;

    throw new Error(message ?? "Algo salió mal. Inténtalo de nuevo.");
  }

  return response.json() as Promise<T>;
}

export const getSystemInfo = () => fetchJson<SystemInfo>(SETTINGS_API_BASE, "/info");

export const getBackupExport = () =>
  fetchJson<BackupExportPayload>(BACKEND_BASE_URL, "/api/data/all");