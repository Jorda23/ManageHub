import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createProperty, getProperties, registerPropertyPayment } from "@/service/api";

import type {
  CreatePropertyRequest,
  CreatePropertyResponse,
  Property,
  RegisterPropertyPaymentRequest,
  RegisterPropertyPaymentResponse,
} from "@/types/api.types";

const PROPERTIES_QUERY_KEY = ["properties"];

export const useProperties = () => {
  return useQuery<Property[], Error>({
    queryKey: PROPERTIES_QUERY_KEY,
    queryFn: getProperties,
  });
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation<CreatePropertyResponse, Error, CreatePropertyRequest>({
    mutationFn: createProperty,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROPERTIES_QUERY_KEY,
      });
    },
  });
};

export const useRegisterPropertyPayment = () => {
  const queryClient = useQueryClient();

  return useMutation<RegisterPropertyPaymentResponse, Error, RegisterPropertyPaymentRequest>({
    mutationFn: registerPropertyPayment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROPERTIES_QUERY_KEY,
      });
    },
  });
};
