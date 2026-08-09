import { AxiosRequestConfig } from "axios";

import { httpClient } from "./httpClient";

export const apiClient = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await httpClient.get<T>(url, config);

    return response.data;
  },

  post: async <TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> => {
    const response = await httpClient.post<TResponse>(url, body, config);

    return response.data;
  },

  put: async <TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> => {
    const response = await httpClient.put<TResponse>(url, body, config);

    return response.data;
  },

  patch: async <TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> => {
    const response = await httpClient.patch<TResponse>(url, body, config);

    return response.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await httpClient.delete<T>(url, config);

    return response.data;
  },
};
