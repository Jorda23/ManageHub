import { AppShell } from "@/components";
import { ReportsWorkspace } from "@/layouts/Reports";

export default function ReportsPage() {
  return (
    <AppShell active="reportes">
      <ReportsWorkspace />
    </AppShell>
  );
}