export type HistoryOperationType = "Hardware" | "Grains" | "Property";

export type HistoryItem = {
  type: HistoryOperationType;
  id: string;
  name: string;
  detail: string | null;
  amount: number;
  paymentMethod: string;
  createdAt: string;
};

export type HistoryFiltersValue = {
  search: string;
  type: "hardware" | "grains" | "property" | "all";
  from: string;
  to: string;
};
