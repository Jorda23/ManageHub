import { AppShell } from "@/components";
import { HistoryWorkspace } from "@/layouts/History";

export default function HistoryPage() {
  return (
    <AppShell active="history">
      <HistoryWorkspace />
    </AppShell>
  );
}
