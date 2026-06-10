import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import { CURRENT_BALAI, TAHUN_PERENCANAAN } from "@/lib/mock-data";
import { UsulanTable } from "@/components/usulan-table";

export const Route = createFileRoute("/balai/rekap")({
  component: Page,
});

function Page() {
  const { usulan } = useAppStore();
  const rows = usulan.filter(
    (u) => u.balai === CURRENT_BALAI && u.tahun === TAHUN_PERENCANAAN,
  );
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <UsulanTable
        rows={rows}
        title={`Rekap Usulan TA ${TAHUN_PERENCANAAN}`}
        description={`Seluruh usulan kegiatan ${CURRENT_BALAI} untuk tahun anggaran ${TAHUN_PERENCANAAN}`}
        showBalai={false}
      />
    </div>
  );
}
