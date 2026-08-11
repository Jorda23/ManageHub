import { apiClient } from "./apiClient";

import type {
  LoginRequest,
  LoginResponse,
  CreateHardwareProductRequest,
  CreateHardwareProductResponse,
  HardwareProduct,
  RegisterHardwareSaleRequest,
  RegisterHardwareSaleResponse,
  HardwareSale,
  HardwareSalesFilters,
  CreateGrainProductRequest,
  CreateGrainProductResponse,
  GrainProduct,
  RegisterGrainSaleRequest,
  RegisterGrainSaleResponse,
  GrainSale,
  GrainSalesFilters,
  CreatePropertyRequest,
  CreatePropertyResponse,
  Property,
  RegisterPropertyPaymentRequest,
  RegisterPropertyPaymentResponse,
  PropertyPayment,
  PropertyPaymentsFilters,
  DashboardResponse,
} from "../types/api.types";

export const login = async (request: LoginRequest): Promise<LoginResponse> => {
  return apiClient.post<LoginResponse, LoginRequest>("/api/auth/login", request);
};

export const getHardwareProducts = async (): Promise<HardwareProduct[]> => {
  return apiClient.get<HardwareProduct[]>("/api/hardware/products");
};

export const createHardwareProduct = async (
  request: CreateHardwareProductRequest,
): Promise<CreateHardwareProductResponse> => {
  return apiClient.post<CreateHardwareProductResponse, CreateHardwareProductRequest>(
    "/api/hardware/products",
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

export const getGrainProducts = async (): Promise<GrainProduct[]> => {
  return apiClient.get<GrainProduct[]>("/api/grains/products");
};

export const createGrainProduct = async (
  request: CreateGrainProductRequest,
): Promise<CreateGrainProductResponse> => {
  return apiClient.post<CreateGrainProductResponse, CreateGrainProductRequest>(
    "/api/grains/products",
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

export const getProperties = async (): Promise<Property[]> => {
  return apiClient.get<Property[]>("/api/properties");
};

export const createProperty = async (
  request: CreatePropertyRequest,
): Promise<CreatePropertyResponse> => {
  return apiClient.post<CreatePropertyResponse, CreatePropertyRequest>("/api/properties", request);
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

export const getDashboard = async (): Promise<DashboardResponse> => {
  return apiClient.get<DashboardResponse>("/api/dashboard");
};
