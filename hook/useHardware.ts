import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createHardwareProduct,
  getHardwareProducts,
  getHardwareSales,
  registerHardwareSale,
} from "@/service/api";

import type {
  CreateHardwareProductRequest,
  CreateHardwareProductResponse,
  HardwareProduct,
  HardwareSale,
  HardwareSalesFilters,
  RegisterHardwareSaleRequest,
  RegisterHardwareSaleResponse,
} from "@/shared/types/api.types";

const HARDWARE_PRODUCTS_QUERY_KEY = ["hardware-products"];

const HARDWARE_SALES_QUERY_KEY = ["hardware-sales"];

export const useHardwareProducts = () => {
  return useQuery<HardwareProduct[], Error>({
    queryKey: HARDWARE_PRODUCTS_QUERY_KEY,
    queryFn: getHardwareProducts,
  });
};

export const useHardwareSales = (filters?: HardwareSalesFilters) => {
  return useQuery<HardwareSale[], Error>({
    queryKey: [...HARDWARE_SALES_QUERY_KEY, filters],
    queryFn: () => getHardwareSales(filters),
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
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: HARDWARE_PRODUCTS_QUERY_KEY,
        }),
        queryClient.invalidateQueries({
          queryKey: HARDWARE_SALES_QUERY_KEY,
        }),
      ]);
    },
  });
};
