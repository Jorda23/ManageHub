import type { SaleCategory } from "@/shared/data/saleWorkspace.data";

export type AppRole = "admin" | SaleCategory;
export type CashierModule = Extract<SaleCategory, "hardware" | "grains">;

const roleAliases: Record<string, AppRole> = {
  admin: "admin",
  administrator: "admin",
  administrador: "admin",
  hardware: "hardware",
  ferreteria: "hardware",
  ferretería: "hardware",
  grains: "grains",
  grain: "grains",
  granos: "grains",
  "granos básicos": "grains",
  "granos basicos": "grains",
  property: "property",
  properties: "property",
  terrain: "property",
  terrains: "property",
  terrenos: "property",
};

function decodeTokenPayload(token: string): Record<string, unknown> | null {
  try {
    const encoded = token.split(".")[1];
    if (!encoded) return null;
    const normalized = encoded.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(normalized)) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function normalizeRoles(input: unknown): AppRole[] {
  const values = Array.isArray(input)
    ? input
    : typeof input === "string"
      ? input.split(/[;,]/)
      : [];

  return [
    ...new Set(
      values.flatMap((candidate) => {
        const value =
          typeof candidate === "string"
            ? candidate
            : candidate && typeof candidate === "object"
              ? String(
                  (candidate as Record<string, unknown>).name ??
                    (candidate as Record<string, unknown>).role ??
                    "",
                )
              : "";
        const normalized = value.trim().toLocaleLowerCase();
        const parts = normalized.split(/[.:/]/);
        const role = roleAliases[normalized] ?? roleAliases[parts[parts.length - 1] ?? ""];
        return role ? [role] : [];
      }),
    ),
  ];
}

function readTokenRoles(): AppRole[] {
  if (typeof window === "undefined") return [];
  const token =
    window.localStorage.getItem("access_token") ?? window.sessionStorage.getItem("access_token");
  const payload = token ? decodeTokenPayload(token) : null;
  return payload ? normalizeRoles(payload.roles ?? payload.role ?? payload.app_roles) : [];
}

export function getUserRoles(): AppRole[] {
  if (typeof window === "undefined") return [];
  const stored =
    window.localStorage.getItem("user_roles") ?? window.sessionStorage.getItem("user_roles");
  if (stored) {
    try {
      const roles = normalizeRoles(JSON.parse(stored));
      if (roles.length) return roles;
    } catch {
      // Use the role claims from the access token.
    }
  }
  return readTokenRoles();
}

export function getEffectiveRoles(): AppRole[] {
  return getUserRoles();
}

export function isAdministrator(): boolean {
  return getEffectiveRoles().includes("admin");
}

export function canAccessWorkspace(module: SaleCategory): boolean {
  const roles = getEffectiveRoles();
  return roles.includes("admin") || roles.includes(module);
}

export function canUseCashier(module: CashierModule): boolean {
  return getEffectiveRoles().includes(module);
}

export function canAccessNavItem(key: string): boolean {
  const roles = getEffectiveRoles();
  if (roles.includes("admin")) return true;
  return key === "property" && roles.includes("property");
}

export function getCashierModules(): CashierModule[] {
  return (["hardware", "grains"] as const).filter(canUseCashier);
}

export function getLoginDestination(): string {
  const roles = getEffectiveRoles();
  if (roles.includes("admin")) return "/dashboard";
  const destinations = [
    ...(roles.includes("hardware") ? ["/pos/hardware"] : []),
    ...(roles.includes("grains") ? ["/pos/grains"] : []),
    ...(roles.includes("property") ? ["/sell/property"] : []),
  ];
  if (destinations.length > 1) return "/access";
  if (destinations.length === 1) return destinations[0];
  return "/access";
}

export function canAccessProtectedRoute(pathname: string): boolean {
  const roles = getEffectiveRoles();
  const isAdmin = roles.includes("admin");

  if (pathname === "/access") return roles.length === 0 || roles.some((role) => role !== "admin");
  if (pathname === "/pos") return getCashierModules().length > 0;
  if (pathname === "/pos/hardware") return roles.includes("hardware");
  if (pathname === "/pos/grains") return roles.includes("grains");
  if (pathname.startsWith("/pos/")) return false;

  if (pathname.startsWith("/sell/property")) return isAdmin || roles.includes("property");
  if (pathname.startsWith("/sell/hardware") || pathname.startsWith("/sell/grains")) return isAdmin;

  return isAdmin;
}

export function getUnauthorizedDestination(): string {
  return getLoginDestination();
}

export function getRolesFromLogin(response: {
  roles?: unknown;
  role?: unknown;
  token: string;
}): AppRole[] {
  const responseRoles = normalizeRoles(response.roles ?? response.role);
  if (responseRoles.length) return responseRoles;
  const payload = decodeTokenPayload(response.token);
  return payload ? normalizeRoles(payload.roles ?? payload.role ?? payload.app_roles) : [];
}
