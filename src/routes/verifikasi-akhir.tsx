import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import { UsulanTable } from "@/components/usulan-table";

export const Route = createFileRoute("/verifikasi-akhir")({
  component: Page,
});

function Page() {
  const { usulan } = useAppStore();
  const rows = usulan.filter((u) =>
    ["menunggu_v2", "disetujui_v2", "tidak_dilanjutkan"].includes(u.status),
  );
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <UsulanTable
        rows={rows}
        title="Verifikasi Akhir SSPSDA"
        description="Hanya usulan yang telah disetujui Verifikator 1 yang muncul di sini"
      />
    </div>
  );
}
