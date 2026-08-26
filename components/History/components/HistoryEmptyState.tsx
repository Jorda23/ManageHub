import { FaHistory } from "react-icons/fa";

import { EmptyState } from "@/components/EmptyState";

export function HistoryEmptyState() {
  return (
    <EmptyState
      title="Sin resultados"
      description="No se encontraron operaciones con los filtros aplicados."
      icon={<FaHistory size={34} />}
    />
  );
}
