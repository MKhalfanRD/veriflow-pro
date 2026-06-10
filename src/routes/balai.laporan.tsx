import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import { CURRENT_BALAI, formatRupiah, formatTanggal } from "@/lib/mock-data";
import { PrioritasBadge } from "@/components/status-badge";
import { Printer, FileSignature } from "lucide-react";

export const Route = createFileRoute("/balai/laporan")({
  component: Page,
});

function Page() {
  const { usulan } = useAppStore();
  const rows = usulan.filter(
    (u) => u.balai === CURRENT_BALAI && u.status === "disetujui_v2",
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-4">
      <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold">Laporan / Cetak Surat Usulan</h2>
            <p className="text-[11px] text-muted-foreground">
              {CURRENT_BALAI} · {rows.length} surat usulan yang telah disetujui SSPSDA
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/60 text-[10px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-semibold w-10">No</th>
                <th className="px-6 py-3 font-semibold">Nomor Usulan</th>
                <th className="px-6 py-3 font-semibold">Nama Kegiatan</th>
                <th className="px-6 py-3 font-semibold">Anggaran</th>
                <th className="px-6 py-3 font-semibold">Prioritas</th>
                <th className="px-6 py-3 font-semibold">Tgl. Disetujui</th>
                <th className="px-6 py-3 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((u, i) => (
                <tr key={u.id} className="hover:bg-muted/30">
                  <td className="px-6 py-3 font-mono text-[11px] text-muted-foreground">{i + 1}</td>
                  <td className="px-6 py-3 font-mono text-[11px] text-muted-foreground">{u.nomor}</td>
                  <td className="px-6 py-3 font-medium">{u.namaKegiatan}</td>
                  <td className="px-6 py-3 text-xs font-mono">{formatRupiah(u.anggaran)}</td>
                  <td className="px-6 py-3"><PrioritasBadge prioritas={u.prioritas} /></td>
                  <td className="px-6 py-3 text-xs text-muted-foreground font-mono">
                    {u.tanggalVerifV1 ? formatTanggal(u.tanggalVerifV1) : "—"}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <Link
                      to="/berita-acara"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-brand hover:underline"
                    >
                      <Printer className="size-3.5" /> Cetak
                    </Link>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-muted-foreground">
                    <FileSignature className="size-6 mx-auto mb-2 opacity-40" />
                    Belum ada surat usulan yang disetujui SSPSDA.
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
