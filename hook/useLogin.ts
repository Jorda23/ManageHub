import { login } from "@/service/api";

import { useMutation } from "@tanstack/react-query";

import type { LoginRequest, LoginResponse } from "@/shared/types/api.types";

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,

    onSuccess: (response) => {
      localStorage.setItem("access_token", response.token);
    },
  });
};
