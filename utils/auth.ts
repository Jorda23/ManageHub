const TOKEN_KEY = "access_token";

export const getToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(TOKEN_KEY);
};

export const saveToken = (token: string) => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(TOKEN_KEY);
};

export const isTokenExpired = (token: string) => {
  try {
    const payloadBase64 = token.split(".")[1];

    if (!payloadBase64) {
      return true;
    }

    const normalizedPayload = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");

    const payload = JSON.parse(atob(normalizedPayload));

    if (!payload.exp) {
      return true;
    }

    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
};
