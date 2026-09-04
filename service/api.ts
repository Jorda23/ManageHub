import { apiClient } from "./apiClient";

import type {
  LoginRequest,
  LoginResponse,
  CreateHardwareProductRequest,
  CreateHardwareProductResponse,
  UpdateHardwareProductRequest,
  UpdateHardwareProductResponse,
  HardwareProduct,
  RegisterHardwareSaleRequest,
  RegisterHardwareSaleResponse,
  HardwareSale,
  HardwareSalesFilters,
  CreateGrainProductRequest,
  CreateGrainProductResponse,
  UpdateGrainProductRequest,
  UpdateGrainProductResponse,
  GrainProduct,
  RegisterGrainSaleRequest,
  RegisterGrainSaleResponse,
  GrainSale,
  GrainSalesFilters,
  CreatePropertyRequest,
  CreatePropertyResponse,
  UpdatePropertyRequest,
  UpdatePropertyResponse,
  Property,
  RegisterPropertyPaymentRequest,
  RegisterPropertyPaymentResponse,
  PropertyPayment,
  PropertyPaymentsFilters,
  PaymentHistoryItem,
  PaymentHistoryFilters,
  DashboardResponse,
  HardwareProductFilters,
  GrainProductFilters,
  PropertyFilters,
} from "../shared/types/api.types";

export const login = async (request: LoginRequest): Promise<LoginResponse> => {
  return apiClient.post<LoginResponse, LoginRequest>("/api/auth/login", request);
};

export const getHardwareProducts = async (
  filters?: HardwareProductFilters,
): Promise<HardwareProduct[]> => {
  return apiClient.get<HardwareProduct[]>("/api/hardware/products", {
    params: filters,
  });
};

export const createHardwareProduct = async (
  request: CreateHardwareProductRequest,
): Promise<CreateHardwareProductResponse> => {
  return apiClient.post<CreateHardwareProductResponse, CreateHardwareProductRequest>(
    "/api/hardware/products",
    request,
  );
};

export const updateHardwareProduct = async (
  id: string,
  request: UpdateHardwareProductRequest,
): Promise<UpdateHardwareProductResponse> => {
  return apiClient.put<UpdateHardwareProductResponse, UpdateHardwareProductRequest>(
    `/api/hardware/products/${id}`,
    request,
  );
};

export const registerHardwareSale = async (
  request: RegisterHardwareSaleRequest,
): Promise<RegisterHardwareSaleResponse> => {
  return apiClient.post<RegisterHardwareSaleResponse, RegisterHardwareSaleRequest>(
    "/api/hardware/sales",
    request,
  );
};

export const getHardwareSales = async (filters?: HardwareSalesFilters): Promise<HardwareSale[]> => {
  return apiClient.get<HardwareSale[]>("/api/hardware/sales", {
    params: filters,
  });
};

export const getGrainProducts = async (filters?: GrainProductFilters): Promise<GrainProduct[]> => {
  return apiClient.get<GrainProduct[]>("/api/grains/products", {
    params: filters,
  });
};

export const createGrainProduct = async (
  request: CreateGrainProductRequest,
): Promise<CreateGrainProductResponse> => {
  return apiClient.post<CreateGrainProductResponse, CreateGrainProductRequest>(
    "/api/grains/products",
    request,
  );
};

export const updateGrainProduct = async (
  id: string,
  request: UpdateGrainProductRequest,
): Promise<UpdateGrainProductResponse> => {
  return apiClient.put<UpdateGrainProductResponse, UpdateGrainProductRequest>(
    `/api/grains/products/${id}`,
    request,
  );
};

export const registerGrainSale = async (
  request: RegisterGrainSaleRequest,
): Promise<RegisterGrainSaleResponse> => {
  return apiClient.post<RegisterGrainSaleResponse, RegisterGrainSaleRequest>(
    "/api/grains/sales",
    request,
  );
};

export const getGrainSales = async (filters?: GrainSalesFilters): Promise<GrainSale[]> => {
  return apiClient.get<GrainSale[]>("/api/grains/sales", {
    params: filters,
  });
};

export const getProperties = async (filters?: PropertyFilters): Promise<Property[]> => {
  return apiClient.get<Property[]>("/api/properties", {
    params: filters,
  });
};

export const createProperty = async (
  request: CreatePropertyRequest,
): Promise<CreatePropertyResponse> => {
  return apiClient.post<CreatePropertyResponse, CreatePropertyRequest>("/api/properties", request);
};

export const updateProperty = async (
  id: string,
  request: UpdatePropertyRequest,
): Promise<UpdatePropertyResponse> => {
  return apiClient.put<UpdatePropertyResponse, UpdatePropertyRequest>(
    `/api/properties/${id}`,
    request,
  );
};

export const registerPropertyPayment = async (
  request: RegisterPropertyPaymentRequest,
): Promise<RegisterPropertyPaymentResponse> => {
  return apiClient.post<RegisterPropertyPaymentResponse, RegisterPropertyPaymentRequest>(
    "/api/properties/payments",
    request,
  );
};

export const getPropertyPayments = async (
  filters?: PropertyPaymentsFilters,
): Promise<PropertyPayment[]> => {
  return apiClient.get<PropertyPayment[]>("/api/properties/payments", {
    params: filters,
  });
};

export const getPaymentHistory = async (
  filters?: PaymentHistoryFilters,
): Promise<PaymentHistoryItem[]> => {
  return apiClient.get<PaymentHistoryItem[]>("/api/history/payments", {
    params: filters,
  });
};

export const getDashboard = async (): Promise<DashboardResponse> => {
  return apiClient.get<DashboardResponse>("/api/dashboard");
};
