import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createProperty,
  getProperties,
  getPropertyPayments,
  registerPropertyPayment,
  updateProperty,
} from "@/service/api";

import type {
  CreatePropertyRequest,
  CreatePropertyResponse,
  Property,
  PropertyPayment,
  PropertyPaymentsFilters,
  RegisterPropertyPaymentRequest,
  RegisterPropertyPaymentResponse,
  UpdatePropertyRequest,
  UpdatePropertyResponse,
} from "@/shared/types/api.types";

const PROPERTIES_QUERY_KEY = ["properties"];

const PROPERTY_PAYMENTS_QUERY_KEY = ["property-payments"];

export const useProperties = () => {
  return useQuery<Property[], Error>({
    queryKey: PROPERTIES_QUERY_KEY,
    queryFn: getProperties,
  });
};

export const usePropertyPayments = (filters?: PropertyPaymentsFilters) => {
  return useQuery<PropertyPayment[], Error>({
    queryKey: [...PROPERTY_PAYMENTS_QUERY_KEY, filters],
    queryFn: () => getPropertyPayments(filters),
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

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdatePropertyResponse, Error, { id: string; request: UpdatePropertyRequest }>(
    {
      mutationFn: ({ id, request }) => updateProperty(id, request),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: PROPERTIES_QUERY_KEY,
        });
      },
    },
  );
};

export const useRegisterPropertyPayment = () => {
  const queryClient = useQueryClient();

  return useMutation<RegisterPropertyPaymentResponse, Error, RegisterPropertyPaymentRequest>({
    mutationFn: registerPropertyPayment,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: PROPERTIES_QUERY_KEY,
        }),
        queryClient.invalidateQueries({
          queryKey: PROPERTY_PAYMENTS_QUERY_KEY,
        }),
      ]);
    },
  });
};
