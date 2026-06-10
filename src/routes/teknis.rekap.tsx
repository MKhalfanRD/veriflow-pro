import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import { TAHUN_PERENCANAAN } from "@/lib/mock-data";
import { UsulanTable } from "@/components/usulan-table";

export const Route = createFileRoute("/teknis/rekap")({
  component: Page,
});

function Page() {
  const { usulan } = useAppStore();
  const rows = usulan.filter((u) => u.tahun === TAHUN_PERENCANAAN && u.status !== "draft");
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <UsulanTable
        rows={rows}
        title={`Rekap Usulan Teknis TA ${TAHUN_PERENCANAAN}`}
        description="Seluruh usulan dalam lingkup verifikasi teknis (Pembina Teknis)"
      />
    </div>
  );
}
