import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { AxiosError } from "axios";

const handleApiError = (error: unknown) => {
  if (!(error instanceof AxiosError)) {
    return;
  }

  const status = error.response?.status;

  switch (status) {
    case 401:
      console.error("Unauthorized");
      break;

    case 403:
      console.error("Forbidden");
      break;

    case 404:
      console.error("Resource not found");
      break;

    case 500:
      console.error("Server error");
      break;
  }
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleApiError,
  }),

  mutationCache: new MutationCache({
    onError: handleApiError,
  }),

  defaultOptions: {
    queries: {
      staleTime: 30_000,

      retry: (failureCount, error) => {
        if (error instanceof AxiosError) {
          const status = error.response?.status;

          if (status === 400 || status === 401 || status === 403 || status === 404) {
            return false;
          }
        }

        return failureCount < 2;
      },

      refetchOnWindowFocus: false,
    },

    mutations: {
      retry: false,
    },
  },
});
