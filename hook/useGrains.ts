import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createGrainProduct,
  getGrainProducts,
  getGrainSales,
  registerGrainSale,
  updateGrainProduct,
} from "@/service/api";

import type {
  CreateGrainProductRequest,
  CreateGrainProductResponse,
  GrainProduct,
  GrainSale,
  GrainSalesFilters,
  RegisterGrainSaleRequest,
  RegisterGrainSaleResponse,
  UpdateGrainProductRequest,
  UpdateGrainProductResponse,
} from "@/shared/types/api.types";

const GRAIN_PRODUCTS_QUERY_KEY = ["grain-products"];

const GRAIN_SALES_QUERY_KEY = ["grain-sales"];

export const useGrainProducts = () => {
  return useQuery<GrainProduct[], Error>({
    queryKey: GRAIN_PRODUCTS_QUERY_KEY,
    queryFn: getGrainProducts,
  });
};

export const useGrainSales = (filters?: GrainSalesFilters) => {
  return useQuery<GrainSale[], Error>({
    queryKey: [...GRAIN_SALES_QUERY_KEY, filters],
    queryFn: () => getGrainSales(filters),
  });
};

export const useCreateGrainProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateGrainProductResponse, Error, CreateGrainProductRequest>({
    mutationFn: createGrainProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: GRAIN_PRODUCTS_QUERY_KEY,
      });
    },
  });
};

export const useUpdateGrainProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateGrainProductResponse,
    Error,
    { id: string; request: UpdateGrainProductRequest }
  >({
    mutationFn: ({ id, request }) => updateGrainProduct(id, request),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: GRAIN_PRODUCTS_QUERY_KEY,
      });
    },
  });
};

export const useRegisterGrainSale = () => {
  const queryClient = useQueryClient();

  return useMutation<RegisterGrainSaleResponse, Error, RegisterGrainSaleRequest>({
    mutationFn: registerGrainSale,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: GRAIN_PRODUCTS_QUERY_KEY,
        }),
        queryClient.invalidateQueries({
          queryKey: GRAIN_SALES_QUERY_KEY,
        }),
      ]);
    },
  });
};
