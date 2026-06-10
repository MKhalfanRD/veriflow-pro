import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import {
  PRIORITAS_LABEL,
  PRIORITAS_NILAI,
  TAHUN_PERENCANAAN,
  type Prioritas,
} from "@/lib/mock-data";
import { PrioritasBadge } from "@/components/status-badge";

export const Route = createFileRoute("/perencanaan/rincian-dpp")({
  component: Page,
});

function Page() {
  const { usulan } = useAppStore();
  const groups = (["nasional", "menteri", "dirjen"] as Prioritas[]).map((p) => ({
    key: p,
    label: PRIORITAS_LABEL[p],
    bobot: PRIORITAS_NILAI[p],
    rows: usulan.filter((u) => u.prioritas === p),
  }));

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card p-6">
        <h2 className="text-base font-semibold">Rincian DPP Awal · TA {TAHUN_PERENCANAAN}</h2>
        <p className="text-[11px] text-muted-foreground mt-1">
          Rekapitulasi seluruh usulan kegiatan yang telah diinput dari Balai/Satker, dikelompokkan
          berdasarkan tingkat prioritas. Anggaran detail tidak ditampilkan pada portal publik.
        </p>
      </div>

      {groups.map((g) => (
        <div key={g.key} className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PrioritasBadge prioritas={g.key} />
              <div>
                <div className="text-sm font-semibold">{g.label}</div>
                <div className="text-[11px] text-muted-foreground">
                  Bobot prioritas <span className="font-mono">{g.bobot}</span> · {g.rows.length} usulan
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/60 text-[10px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-3 font-semibold w-10">No</th>
                  <th className="px-6 py-3 font-semibold">Nomor</th>
                  <th className="px-6 py-3 font-semibold">Nama Kegiatan</th>
                  <th className="px-6 py-3 font-semibold">Lokasi</th>
                  <th className="px-6 py-3 font-semibold">Balai Pengusul</th>
                  <th className="px-6 py-3 font-semibold">TA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {g.rows.map((u, i) => (
                  <tr key={u.id} className="hover:bg-muted/30">
                    <td className="px-6 py-3 font-mono text-[11px] text-muted-foreground">{i + 1}</td>
                    <td className="px-6 py-3 font-mono text-[11px] text-muted-foreground">{u.nomor}</td>
                    <td className="px-6 py-3 font-medium">{u.namaKegiatan}</td>
                    <td className="px-6 py-3 text-xs">{u.lokasi}</td>
                    <td className="px-6 py-3 text-xs text-muted-foreground">{u.balai}</td>
                    <td className="px-6 py-3 font-mono text-xs">{u.tahun}</td>
                  </tr>
                ))}
                {g.rows.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-sm text-muted-foreground">
                      Belum ada usulan pada prioritas ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
