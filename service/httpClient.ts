import axios from "axios";

import { getToken, removeToken } from "@/utils/auth";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

httpClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();

      if (typeof window !== "undefined") {
        window.location.replace("/login");
      }
    }

    return Promise.reject(error);
  },
);
