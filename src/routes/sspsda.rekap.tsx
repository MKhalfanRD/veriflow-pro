import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import { TAHUN_PERENCANAAN } from "@/lib/mock-data";
import { UsulanTable } from "@/components/usulan-table";

export const Route = createFileRoute("/sspsda/rekap")({
  component: Page,
});

function Page() {
  const { usulan } = useAppStore();
  const rows = usulan.filter((u) => u.tahun === TAHUN_PERENCANAAN);
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <UsulanTable
        rows={rows}
        title={`Rekap Usulan SSPSDA TA ${TAHUN_PERENCANAAN}`}
        description="Seluruh usulan dari semua Balai/Satker pada lingkup Direktorat Jenderal SDA"
      />
    </div>
  );
}
