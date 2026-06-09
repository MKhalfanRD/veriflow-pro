import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import { formatTanggal, STATUS_LABEL } from "@/lib/mock-data";
import { Activity } from "lucide-react";

export const Route = createFileRoute("/riwayat")({
  component: Page,
});

function Page() {
  const { usulan } = useAppStore();
  const events = usulan.flatMap((u) => {
    const items = [
      { t: u.tanggalPengajuan, label: `Usulan "${u.namaKegiatan}" diajukan`, by: u.balai, kind: "submit" as const },
    ];
    if (u.tanggalVerifV1) items.push({ t: u.tanggalVerifV1, label: `Diverifikasi V1: ${STATUS_LABEL[u.status]}`, by: u.verifikatorV1 ?? "Verifikator 1", kind: "verify" as const });
    return items;
  }).sort((a, b) => b.t.localeCompare(a.t));

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-base font-semibold">Riwayat Aktivitas</h2>
          <p className="text-[11px] text-muted-foreground">Audit trail seluruh aksi pengusulan dan verifikasi</p>
        </div>
        <ul className="divide-y divide-border">
          {events.map((e, i) => (
            <li key={i} className="px-6 py-4 flex gap-4">
              <div className="size-9 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                <Activity className="size-4 text-brand" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{e.label}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{e.by}</div>
              </div>
              <div className="text-[11px] text-muted-foreground font-mono">{formatTanggal(e.t)}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
