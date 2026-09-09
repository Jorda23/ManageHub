import { NextResponse } from "next/server";

import { APP_DISPLAY_NAME, enabledModules } from "@/shared/data/settings.data";
import { APP_VERSION } from "@/shared/server/appInfo";

import type { SystemInfo } from "@/shared/types/api.types";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: Request) {
  const token = request.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");

  if (!token) {
    return NextResponse.json({ message: "No autorizado." }, { status: 401 });
  }

  let databaseConnected = false;

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/dashboard`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    databaseConnected = response.ok;
  } catch (error) {
    console.error("Database connectivity check error:", error);
  }

  const info: SystemInfo = {
    application: APP_DISPLAY_NAME,
    version: APP_VERSION,
    databaseConnected,
    modules: [...enabledModules],
  };

  return NextResponse.json(info);
}