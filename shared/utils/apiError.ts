import { AxiosError } from "axios";

type ApiErrorPayload = {
  message?: string;
};

export type DeleteErrorMessages = {
  conflict: string;
  notFound: string;
  fallback: string;
};

export const getApiErrorStatus = (error: unknown): number | undefined => {
  if (!(error instanceof AxiosError)) {
    return undefined;
  }

  return error.response?.status;
};

export const getApiErrorMessage = (error: unknown): string | undefined => {
  if (!(error instanceof AxiosError)) {
    return undefined;
  }

  const payload = error.response?.data as ApiErrorPayload | string | undefined;

  if (typeof payload === "string") {
    return payload.trim() || undefined;
  }

  return payload?.message?.trim() || undefined;
};

export const resolveDeleteErrorMessage = (
  error: unknown,
  messages: DeleteErrorMessages,
): string => {
  const status = getApiErrorStatus(error);

  if (status === 409) {
    return messages.conflict;
  }

  if (status === 404) {
    return messages.notFound;
  }

  return messages.fallback;
};
