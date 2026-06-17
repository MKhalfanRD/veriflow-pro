import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import {
  CURRENT_BALAI,
  DPP_LABEL,
  formatTanggal,
  STATUS_LABEL,
  type DppType,
} from "@/lib/mock-data";
import { DppPageLayout } from "@/components/dpp-page-layout";
import { Activity, CheckCircle2, ShieldCheck, FileText } from "lucide-react";

export const Route = createFileRoute("/perencanaan/$dppType/riwayat")({
  component: Page,
});

type Event = {
  t: string;
  label: string;
  by: string;
  kind: "submit" | "verify1" | "verify2";
  balai: string;
};

function Page() {
  const { dppType } = Route.useParams() as { dppType: DppType };
  const { usulan, role } = useAppStore();

  const scoped = usulan.filter((u) => u.tahap === dppType);

  const allEvents: Event[] = scoped.flatMap((u) => {
    const items: Event[] = [
      {
        t: u.tanggalPengajuan,
        label: `Usulan "${u.namaKegiatan}" diajukan`,
        by: u.balai,
        kind: "submit",
        balai: u.balai,
      },
    ];
    if (u.tanggalVerifV1) {
      items.push({
        t: u.tanggalVerifV1,
        label: `V1 · ${u.namaKegiatan}: ${STATUS_LABEL[u.status]}`,
        by: u.verifikatorV1 ?? "Pembina Teknis",
        kind: "verify1",
        balai: u.balai,
      });
    }
    if (u.verifikatorV2 && (u.status === "disetujui_v2" || u.status === "tidak_dilanjutkan")) {
      items.push({
        t: u.tanggalVerifV1 ?? u.tanggalPengajuan,
        label: `V2 · ${u.namaKegiatan}: ${STATUS_LABEL[u.status]}`,
        by: u.verifikatorV2,
        kind: "verify2",
        balai: u.balai,
      });
    }
    return items;
  });

  const events = allEvents
    .filter((e) => {
      if (role === "balai") return e.balai === CURRENT_BALAI;
      if (role === "verif1") return e.kind === "submit" || e.kind === "verify1";
      return true;
    })
    .sort((a, b) => b.t.localeCompare(a.t));

  return (
    <DppPageLayout dppType={dppType}>
      <div className="p-8 max-w-4xl mx-auto space-y-4">
        <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center gap-2">
            <Activity className="size-4 text-brand" />
            <div>
              <h2 className="text-base font-semibold">Riwayat · {DPP_LABEL[dppType]}</h2>
              <p className="text-[11px] text-muted-foreground">
                {role === "balai"
                  ? `Audit trail untuk ${CURRENT_BALAI}`
                  : role === "verif1"
                  ? "Aktivitas pengajuan & verifikasi teknis"
                  : "Seluruh aktivitas lintas role"}
              </p>
            </div>
          </div>
          <ul className="divide-y divide-border">
            {events.map((e, i) => {
              const Icon = e.kind === "submit" ? FileText : e.kind === "verify1" ? CheckCircle2 : ShieldCheck;
              const tone =
                e.kind === "submit"
                  ? "bg-brand/10 text-brand"
                  : e.kind === "verify1"
                  ? "bg-status-pending-bg text-status-pending"
                  : "bg-status-approved-bg text-status-approved";
              return (
                <li key={i} className="px-6 py-4 flex gap-4">
                  <div className={`size-9 rounded-full flex items-center justify-center shrink-0 ${tone}`}>
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{e.label}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{e.by} · {e.balai}</div>
                  </div>
                  <div className="text-[11px] text-muted-foreground font-mono">{formatTanggal(e.t)}</div>
                </li>
              );
            })}
            {events.length === 0 && (
              <li className="px-6 py-12 text-center text-sm text-muted-foreground">
                Belum ada aktivitas pada {DPP_LABEL[dppType]}.
              </li>
            )}
          </ul>
        </div>
      </div>
    </DppPageLayout>
  );
}
