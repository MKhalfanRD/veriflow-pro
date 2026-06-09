import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import { UsulanTable } from "@/components/usulan-table";

export const Route = createFileRoute("/usulan/")({
  component: Page,
});

function Page() {
  const { usulan } = useAppStore();
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <UsulanTable rows={usulan} title="Daftar Usulan Saya" description="Usulan kegiatan yang Anda ajukan ke pembina teknis" />
    </div>
  );
}
