import type { PaymentHistoryItem } from "@/shared";
import type { HistoryItem } from "./history.types";

export function mapPaymentHistoryItem(item: PaymentHistoryItem): HistoryItem {
  return {
    type: item.type,
    id: item.id,
    name: item.name,
    detail: item.detail,
    amount: item.amount,
    paymentMethod: item.paymentMethod,
    createdAt: item.createdAt,
  };
}
