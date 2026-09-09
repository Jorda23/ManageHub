import { AppShell } from "@/components";
import { SettingsWorkspace } from "@/layouts/Settings";

export default function SettingsPage() {
  return (
    <AppShell active="settings">
      <SettingsWorkspace />
    </AppShell>
  );
}