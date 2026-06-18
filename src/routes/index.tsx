import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { useAppStore } from "@/lib/app-store";
import {
  BALAI_LIST,
  PRIORITAS_LABEL,
  TAHUN_PERENCANAAN,
  type StatusUsulan,
} from "@/lib/mock-data";
import { StatusBadge, PrioritasBadge } from "@/components/status-badge";
import {
  ArrowUpRight,
  FileText,
  Clock,
  RefreshCcw,
  CheckCircle2,
  ShieldCheck,
  XCircle,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const { usulan: _allUsulan, usulanTahun: usulan, role } = useAppStore();

  const stats = useMemo(() => {
    const by = (s: StatusUsulan) => usulan.filter((u) => u.status === s).length;
    return {
      total: usulan.length,
      menunggu: by("menunggu_v1") + by("menunggu_v2"),
      revisi: by("revisi"),
      disetujui_v1: by("disetujui_v1"),
      disetujui_v2: by("disetujui_v2"),
      tidak: by("tidak_dilanjutkan") + by("ditolak_v1"),
    };
  }, [usulan]);

  const perBalai = useMemo(
    () =>
      BALAI_LIST.map((b) => ({
        balai: b,
        total: usulan.filter((u) => u.balai === b).length,
      })).sort((a, b) => b.total - a.total),
    [usulan],
  );

  const perPrio = useMemo(() => {
    const total = usulan.length || 1;
    return (["nasional", "menteri", "dirjen"] as const).map((p) => ({
      key: p,
      label: PRIORITAS_LABEL[p],
      count: usulan.filter((u) => u.prioritas === p).length,
      pct: Math.round((usulan.filter((u) => u.prioritas === p).length / total) * 100),
    }));
  }, [usulan]);

  const recent = usulan.slice(0, 6);
  const maxBalai = Math.max(...perBalai.map((x) => x.total), 1);

  const kpis = [
    { label: "Total Usulan", value: stats.total, icon: FileText, trend: "+12%", trendColor: "text-status-approved" },
    { label: "Menunggu", value: stats.menunggu, icon: Clock, trend: "Aktif", trendColor: "text-status-pending" },
    { label: "Revisi", value: stats.revisi, icon: RefreshCcw, trend: "Perlu tindak", trendColor: "text-status-revisi" },
    { label: "Disetujui V1", value: stats.disetujui_v1, icon: CheckCircle2, trend: "Pembina Teknis", trendColor: "text-muted-foreground" },
    { label: "Disetujui V2", value: stats.disetujui_v2, icon: ShieldCheck, trend: "Final", trendColor: "text-status-approved" },
    { label: "Tidak Lanjut", value: stats.tidak, icon: XCircle, trend: "Ditolak/Stop", trendColor: "text-status-rejected" },
  ];

  const seeAllLink = role === "verif1" || role === "verif2"
    ? "/perencanaan/awal/verifikasi"
    : "/perencanaan/awal/rekap";

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="bg-surface p-4 rounded-xl ring-1 ring-black/5 shadow-card">
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {k.label}
                </span>
                <Icon className="size-3.5 text-muted-foreground" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-semibold tracking-tight">{k.value}</span>
                <span className={`text-[10px] font-medium ${k.trendColor}`}>{k.trend}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface p-6 rounded-xl ring-1 ring-black/5 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold">Usulan per Balai/Satker</h3>
              <p className="text-[11px] text-muted-foreground">
                Distribusi pengusul tahun anggaran {tahunAnggaran}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {perBalai.map((b) => (
              <div key={b.balai} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">{b.balai}</span>
                  <span className="font-mono text-muted-foreground">{b.total} usulan</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand rounded-full transition-all"
                    style={{ width: `${(b.total / maxBalai) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl ring-1 ring-black/5 shadow-card">
          <h3 className="text-sm font-semibold mb-6">Distribusi Prioritas</h3>
          <div className="space-y-4">
            {perPrio.map((p) => (
              <div key={p.key}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`size-2.5 rounded-sm bg-prio-${p.key}`} />
                    <span className="font-medium">{p.label}</span>
                  </div>
                  <span className="font-mono font-semibold">{p.count}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-prio-${p.key}`}
                    style={{ width: `${p.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-border text-[11px] text-muted-foreground">
            Bobot prioritas otomatis: Nasional{" "}
            <span className="font-mono font-semibold text-foreground">3</span>, Menteri{" "}
            <span className="font-mono font-semibold text-foreground">2</span>, Dirjen{" "}
            <span className="font-mono font-semibold text-foreground">1</span>
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold">Usulan Terbaru</h2>
            <p className="text-[11px] text-muted-foreground">
              6 usulan terakhir berdasarkan tanggal pengajuan
            </p>
          </div>
          <Link
            to={seeAllLink}
            className="text-xs font-medium text-brand hover:underline inline-flex items-center gap-1"
          >
            Lihat semua <ArrowUpRight className="size-3" />
          </Link>
        </div>
        <div className="overflow-x-auto max-h-[420px] overflow-y-auto">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-muted/60 backdrop-blur">
              <tr className="text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-3 font-semibold">Nomor</th>
                <th className="px-6 py-3 font-semibold">Nama Kegiatan</th>
                <th className="px-6 py-3 font-semibold">Balai</th>
                <th className="px-6 py-3 font-semibold">Prioritas</th>
                <th className="px-6 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recent.map((u) => (
                <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-3 font-mono text-[11px] text-muted-foreground">{u.nomor}</td>
                  <td className="px-6 py-3 font-medium">{u.namaKegiatan}</td>
                  <td className="px-6 py-3 text-muted-foreground text-xs">{u.balai}</td>
                  <td className="px-6 py-3">
                    <PrioritasBadge prioritas={u.prioritas} />
                  </td>
                  <td className="px-6 py-3">
                    <StatusBadge status={u.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
