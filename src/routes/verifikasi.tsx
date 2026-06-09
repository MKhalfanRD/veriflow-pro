import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import { UsulanTable } from "@/components/usulan-table";

export const Route = createFileRoute("/verifikasi")({
  component: Page,
});

function Page() {
  const { usulan } = useAppStore();
  const rows = usulan.filter((u) => ["menunggu_v1", "revisi", "disetujui_v1", "ditolak_v1"].includes(u.status));
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <UsulanTable rows={rows} title="Verifikasi Pembina Teknis" description="Usulan yang menunggu pemeriksaan & validasi awal" />
    </div>
  );
}
