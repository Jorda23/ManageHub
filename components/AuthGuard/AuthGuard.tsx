"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { getToken, isTokenExpired, removeToken } from "@/utils/auth";

type AuthGuardProps = {
  children: React.ReactNode;
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();

    if (!token || isTokenExpired(token)) {
      removeToken();

      if (pathname !== "/login") {
        router.replace("/login");
      }

      return;
    }

    setIsAuthenticated(true);
  }, [pathname, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
