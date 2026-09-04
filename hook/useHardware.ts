import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createHardwareProduct,
  getHardwareProducts,
  getHardwareSales,
  registerHardwareSale,
  updateHardwareProduct,
} from "@/service/api";

import type {
  CreateHardwareProductRequest,
  CreateHardwareProductResponse,
  HardwareProduct,
  HardwareProductFilters,
  HardwareSale,
  HardwareSalesFilters,
  RegisterHardwareSaleRequest,
  RegisterHardwareSaleResponse,
  UpdateHardwareProductRequest,
  UpdateHardwareProductResponse,
} from "@/shared/types/api.types";

const HARDWARE_PRODUCTS_QUERY_KEY = ["hardware-products"];

const HARDWARE_SALES_QUERY_KEY = ["hardware-sales"];

export const useHardwareProducts = (filters?: HardwareProductFilters) => {
  return useQuery<HardwareProduct[], Error>({
    queryKey: filters ? [...HARDWARE_PRODUCTS_QUERY_KEY, filters] : HARDWARE_PRODUCTS_QUERY_KEY,
    queryFn: () => getHardwareProducts(filters),
    placeholderData: keepPreviousData,
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

export const useUpdateHardwareProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateHardwareProductResponse,
    Error,
    { id: string; request: UpdateHardwareProductRequest }
  >({
    mutationFn: ({ id, request }) => updateHardwareProduct(id, request),
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
