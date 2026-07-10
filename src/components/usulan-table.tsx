import { useMemo, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import type { Usulan, Prioritas, StatusUsulan, DppType } from "@/lib/mock-data";
import { formatTanggal, formatRupiah, kodeKegiatanRo } from "@/lib/mock-data";
import { StatusBadge, PrioritasBadge } from "@/components/status-badge";
import { DetailDrawer } from "@/components/detail-drawer";
import { Search, Download, ClipboardCheck } from "lucide-react";

interface Props {
  rows: Usulan[];
  title: string;
  description?: string;
  showBalai?: boolean;
}

export function UsulanTable({ rows, title, description, showBalai = true }: Props) {
  const { role } = useAppStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const dppType: DppType = pathname.includes("/perubahan/") ? "perubahan" : "awal";
  const isPublik = false;
  const [selected, setSelected] = useState<Usulan | null>(null);
  const [q, setQ] = useState("");
  const [prio, setPrio] = useState<Prioritas | "all">("all");
  const [status, setStatus] = useState<StatusUsulan | "all">("all");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filtered = useMemo(() => {
    return rows.filter((u) => {
      if (q && !`${u.namaKegiatan} ${u.nomor} ${u.balai} ${u.lokasi}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (prio !== "all" && u.prioritas !== prio) return false;
      if (status !== "all" && u.status !== status) return false;
      return true;
    });
  }, [rows, q, prio, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card overflow-hidden flex flex-col max-h-[calc(100vh-8rem)]">
        <div className="px-6 py-4 border-b border-border flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold">{title}</h2>
            {description && <p className="text-[11px] text-muted-foreground">{description}</p>}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); setPage(1); }}
                placeholder="Cari..."
                className="pl-8 pr-3 py-1.5 text-xs bg-muted rounded-md border border-transparent focus:outline-none focus:ring-1 focus:ring-brand w-44"
              />
            </div>
            <select value={prio} onChange={(e) => { setPrio(e.target.value as Prioritas | "all"); setPage(1); }}
              className="text-xs bg-muted rounded-md px-2 py-1.5 border border-transparent focus:outline-none focus:ring-1 focus:ring-brand">
              <option value="all">Semua Prioritas</option>
              <option value="nasional">Nasional</option>
              <option value="menteri">Menteri</option>
              <option value="dirjen">Dirjen</option>
            </select>
            <select value={status} onChange={(e) => { setStatus(e.target.value as StatusUsulan | "all"); setPage(1); }}
              className="text-xs bg-muted rounded-md px-2 py-1.5 border border-transparent focus:outline-none focus:ring-1 focus:ring-brand">
              <option value="all">Semua Status</option>
              <option value="draft">Draf</option>
              <option value="menunggu_v1">Menunggu V1</option>
              <option value="revisi">Revisi</option>
              <option value="disetujui_v1">Disetujui V1</option>
              <option value="menunggu_v2">Menunggu V2</option>
              <option value="disetujui_v2">Disetujui V2</option>
              <option value="tidak_dilanjutkan">Tidak Dilanjutkan</option>
            </select>
            <button className="text-xs flex items-center gap-1.5 px-2.5 py-1.5 border border-border rounded-md hover:bg-muted">
              <Download className="size-3.5" /> Export
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-muted/70 backdrop-blur z-10">
              <tr className="text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-3 font-semibold w-10">No</th>
                <th className="px-6 py-3 font-semibold">Nama Kegiatan</th>
                {showBalai && <th className="px-6 py-3 font-semibold">Balai</th>}
                <th className="px-6 py-3 font-semibold">Lokasi</th>
                <th className="px-6 py-3 font-semibold">Prioritas</th>
                <th className="px-6 py-3 font-semibold">Tanggal</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paged.map((u, i) => (
                <tr key={u.id} className="hover:bg-muted/30">
                  <td className="px-6 py-3 text-muted-foreground font-mono text-[11px]">{(page - 1) * pageSize + i + 1}</td>
                  <td className="px-6 py-3">
                    <div className="font-medium">{u.namaKegiatan}</div>
                    <div className="text-[10px] text-muted-foreground font-mono">
                      {kodeKegiatanRo(u)}{!isPublik && ` · ${formatRupiah(u.anggaran)}`}
                    </div>
                  </td>
                  {showBalai && <td className="px-6 py-3 text-xs text-muted-foreground">{u.balai}</td>}
                  <td className="px-6 py-3 text-xs">{u.lokasi}</td>
                  <td className="px-6 py-3"><PrioritasBadge prioritas={u.prioritas} /></td>
                  <td className="px-6 py-3 text-xs text-muted-foreground">{formatTanggal(u.tanggalPengajuan)}</td>
                  <td className="px-6 py-3"><StatusBadge status={u.status} /></td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex items-center gap-3 justify-end">
                      {(role === "verif1" || role === "verif2" || role === "balai") && (
                        <Link
                          to="/perencanaan/$dppType/kesiapan/$usulanId"
                          params={{ dppType, usulanId: u.id }}
                          className="text-brand font-medium text-xs hover:underline inline-flex items-center gap-1"
                          title={role === "balai" ? "Lihat Penilaian" : "Verifikasi Kesiapan"}
                        >
                          <ClipboardCheck className="size-3.5" />
                          {role === "balai" ? "Penilaian" : "Kesiapan"}
                        </Link>
                      )}
                      <button onClick={() => setSelected(u)} className="text-brand font-medium text-xs hover:underline">Detail</button>
                    </div>
                  </td>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr><td colSpan={showBalai ? 8 : 7} className="px-6 py-16 text-center text-sm text-muted-foreground">Tidak ada usulan yang cocok.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 border-t border-border bg-muted/30 flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">
            Menampilkan {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} dari {filtered.length}
          </span>
          <div className="flex gap-1">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}
              className="px-2.5 py-1 text-xs rounded border border-border bg-surface disabled:opacity-40 hover:bg-muted">←</button>
            {Array.from({ length: totalPages }).slice(0, 5).map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)}
                className={`px-2.5 py-1 text-xs rounded ${page === i + 1 ? "bg-brand text-brand-foreground" : "border border-border bg-surface hover:bg-muted"}`}>
                {i + 1}
              </button>
            ))}
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}
              className="px-2.5 py-1 text-xs rounded border border-border bg-surface disabled:opacity-40 hover:bg-muted">→</button>
          </div>
        </div>
      </div>

      {selected && <DetailDrawer usulan={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
