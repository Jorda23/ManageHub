import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createGrainProduct, getGrainProducts, registerGrainSale } from "@/service/api";

import type {
  CreateGrainProductRequest,
  CreateGrainProductResponse,
  GrainProduct,
  RegisterGrainSaleRequest,
  RegisterGrainSaleResponse,
} from "@/types/api.types";

const GRAIN_PRODUCTS_QUERY_KEY = ["grain-products"];

export const useGrainProducts = () => {
  return useQuery<GrainProduct[], Error>({
    queryKey: GRAIN_PRODUCTS_QUERY_KEY,
    queryFn: getGrainProducts,
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

export const useRegisterGrainSale = () => {
  const queryClient = useQueryClient();

  return useMutation<RegisterGrainSaleResponse, Error, RegisterGrainSaleRequest>({
    mutationFn: registerGrainSale,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: GRAIN_PRODUCTS_QUERY_KEY,
      });
    },
  });
};
