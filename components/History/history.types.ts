export type HistoryOperationType = "hardware" | "grains" | "property";

export type HistoryOperationStatus = "completed";

export type HistoryItem = {
  id: string;
  sourceId: string;

  type: HistoryOperationType;
  status: HistoryOperationStatus;

  clientName: string;
  description: string;

  quantity?: number;
  unit?: string;
  unitPrice?: number;

  amount: number;
  paymentMethod: string;
  createdAt: string;
};

export type HistoryFiltersValue = {
  search: string;
  type: HistoryOperationType | "all";
  status: HistoryOperationStatus | "all";
  from: string;
  to: string;
};
