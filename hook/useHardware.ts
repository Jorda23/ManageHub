import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createHardwareProduct, getHardwareProducts, registerHardwareSale } from "@/service/api";

import type {
  CreateHardwareProductRequest,
  CreateHardwareProductResponse,
  HardwareProduct,
  RegisterHardwareSaleRequest,
  RegisterHardwareSaleResponse,
} from "@/types/api.types";

const HARDWARE_PRODUCTS_QUERY_KEY = ["hardware-products"];

export const useHardwareProducts = () => {
  return useQuery<HardwareProduct[], Error>({
    queryKey: HARDWARE_PRODUCTS_QUERY_KEY,
    queryFn: getHardwareProducts,
  });
};

export const useCreateHardwareProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateHardwareProductResponse, Error, CreateHardwareProductRequest>({
    mutationFn: createHardwareProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: HARDWARE_PRODUCTS_QUERY_KEY,
      });
    },
  });
};

export const useRegisterHardwareSale = () => {
  const queryClient = useQueryClient();

  return useMutation<RegisterHardwareSaleResponse, Error, RegisterHardwareSaleRequest>({
    mutationFn: registerHardwareSale,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: HARDWARE_PRODUCTS_QUERY_KEY,
      });
    },
  });
};
