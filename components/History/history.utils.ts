import { HardwareSale, GrainSale, PropertyPayment } from "@/shared";
import type { HistoryItem } from "./history.types";

export function mapHardwareSaleToHistory(sale: HardwareSale): HistoryItem {
  return {
    id: `hardware-${sale.id}`,
    sourceId: sale.id,
    type: "hardware",
    status: "completed",
    clientName: sale.productName,
    description: sale.productName,
    quantity: sale.quantity,
    unitPrice: sale.unitPrice,
    amount: sale.total,
    paymentMethod: sale.paymentMethod,
    createdAt: sale.createdAt,
  };
}

export function mapGrainSaleToHistory(sale: GrainSale): HistoryItem {
  return {
    id: `grains-${sale.id}`,
    sourceId: sale.id,
    type: "grains",
    status: "completed",
    clientName: sale.productName,
    description: sale.productName,
    quantity: sale.quantity,
    unit: sale.unit,
    unitPrice: sale.unitPrice,
    amount: sale.total,
    paymentMethod: sale.paymentMethod,
    createdAt: sale.createdAt,
  };
}

export function mapPropertyPaymentToHistory(payment: PropertyPayment): HistoryItem {
  return {
    id: `property-${payment.id}`,
    sourceId: payment.id,
    type: "property",
    status: "completed",
    clientName: payment.ownerName,
    description: payment.propertyName,
    amount: payment.amount,
    paymentMethod: payment.paymentMethod,
    createdAt: payment.createdAt,
  };
}
