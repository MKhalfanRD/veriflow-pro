import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import { formatTanggal, TAHUN_PERENCANAAN } from "@/lib/mock-data";
import { PrioritasBadge, StatusBadge } from "@/components/status-badge";
import { RefreshCcw } from "lucide-react";

export const Route = createFileRoute("/perencanaan/perubahan-dpp")({
  component: Page,
});

function Page() {
  const { usulan } = useAppStore();
  const rows = usulan.filter((u) => u.diubah || u.status === "revisi");

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card p-6">
        <div className="flex items-center gap-2">
          <RefreshCcw className="size-4 text-brand" />
          <h2 className="text-base font-semibold">Perubahan Rincian DPP · TA {TAHUN_PERENCANAAN}</h2>
        </div>
        <p className="text-[11px] text-muted-foreground mt-1">
          Daftar usulan kegiatan yang mengalami perubahan data setelah pengajuan awal, baik karena
          permintaan revisi maupun penyuntingan oleh Balai/Satker pengusul.
        </p>
      </div>

      <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/60 text-[10px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-semibold w-10">No</th>
                <th className="px-6 py-3 font-semibold">Nomor</th>
                <th className="px-6 py-3 font-semibold">Nama Kegiatan</th>
                <th className="px-6 py-3 font-semibold">Balai</th>
                <th className="px-6 py-3 font-semibold">Prioritas</th>
                <th className="px-6 py-3 font-semibold">Status Terkini</th>
                <th className="px-6 py-3 font-semibold">Tgl. Perubahan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((u, i) => (
                <tr key={u.id} className="hover:bg-muted/30">
                  <td className="px-6 py-3 font-mono text-[11px] text-muted-foreground">{i + 1}</td>
                  <td className="px-6 py-3 font-mono text-[11px] text-muted-foreground">{u.nomor}</td>
                  <td className="px-6 py-3 font-medium">{u.namaKegiatan}</td>
                  <td className="px-6 py-3 text-xs text-muted-foreground">{u.balai}</td>
                  <td className="px-6 py-3"><PrioritasBadge prioritas={u.prioritas} /></td>
                  <td className="px-6 py-3"><StatusBadge status={u.status} /></td>
                  <td className="px-6 py-3 text-xs text-muted-foreground font-mono">
                    {u.tanggalEdit ? formatTanggal(u.tanggalEdit) : "—"}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-muted-foreground">
                    Belum ada perubahan rincian DPP.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
