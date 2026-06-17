import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import {
  CURRENT_BALAI,
  DPP_LABEL,
  formatRupiah,
  formatTanggal,
  type DppType,
} from "@/lib/mock-data";
import { PrioritasBadge } from "@/components/status-badge";
import { DppPageLayout } from "@/components/dpp-page-layout";
import { Printer, FileSignature } from "lucide-react";

export const Route = createFileRoute("/perencanaan/$dppType/laporan")({
  component: Page,
});

function Page() {
  const { dppType } = Route.useParams() as { dppType: DppType };
  const { usulan, role } = useAppStore();

  let rows = usulan.filter((u) => u.tahap === dppType && u.status === "disetujui_v2");
  if (role === "balai") rows = rows.filter((u) => u.balai === CURRENT_BALAI);

  const total = rows.reduce((s, u) => s + u.anggaran, 0);

  return (
    <DppPageLayout dppType={dppType}>
      <div className="p-8 max-w-7xl mx-auto space-y-4">
        {role === "verif2" && (
          <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card p-6 grid grid-cols-3 gap-6">
            <Kpi label="Total Disetujui" value={rows.length.toString()} />
            <Kpi label="Total Anggaran" value={formatRupiah(total)} mono />
            <Kpi label="Cakupan" value={`${new Set(rows.map((r) => r.balai)).size} Balai`} />
          </div>
        )}

        <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-base font-semibold">
              Laporan / Cetak Surat Usulan · {DPP_LABEL[dppType]}
            </h2>
            <p className="text-[11px] text-muted-foreground">
              {role === "balai"
                ? `${CURRENT_BALAI} · `
                : ""}
              {rows.length} surat usulan yang telah disetujui SSPSDA
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/60 text-[10px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-3 font-semibold w-10">No</th>
                  <th className="px-6 py-3 font-semibold">Nomor</th>
                  <th className="px-6 py-3 font-semibold">Nama Kegiatan</th>
                  {role !== "balai" && <th className="px-6 py-3 font-semibold">Balai</th>}
                  <th className="px-6 py-3 font-semibold">Anggaran</th>
                  <th className="px-6 py-3 font-semibold">Prioritas</th>
                  <th className="px-6 py-3 font-semibold">Tgl. Verif</th>
                  <th className="px-6 py-3 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((u, i) => (
                  <tr key={u.id} className="hover:bg-muted/30">
                    <td className="px-6 py-3 font-mono text-[11px] text-muted-foreground">{i + 1}</td>
                    <td className="px-6 py-3 font-mono text-[11px] text-muted-foreground">{u.nomor}</td>
                    <td className="px-6 py-3 font-medium">{u.namaKegiatan}</td>
                    {role !== "balai" && (
                      <td className="px-6 py-3 text-xs text-muted-foreground">{u.balai}</td>
                    )}
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
                    <td colSpan={role !== "balai" ? 8 : 7} className="px-6 py-12 text-center text-sm text-muted-foreground">
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
    </DppPageLayout>
  );
}

function Kpi({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</div>
      <div className={`text-2xl font-bold mt-1 ${mono ? "font-mono text-brand" : ""}`}>{value}</div>
    </div>
  );
}
